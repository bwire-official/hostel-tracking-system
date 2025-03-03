const Student = require('../models/Student');
const Log = require('../models/Log');

exports.handleScan = async (req, res) => {
  const { studentId, reason } = req.body;

  try {
    console.log(`Received scan request for student ID: ${studentId}`);

    // Find the student by studentId
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the latest log for the student
    const latestLog = await Log.findOne({ studentId }).sort({ timestamp: -1 });

    let type = 'check-in'; // Default to check-in
    if (latestLog && latestLog.type === 'check-in') {
      type = 'check-out'; // If the latest log is a check-in, this is a check-out
      if (!reason) {
        return res.status(400).json({ message: 'Reason is required for check-out' });
      }
    }

    // Save the scan event to the database
    const log = new Log({
      studentId,
      type,
      reason: type === 'check-out' ? reason : undefined, // Only save reason for check-out
    });

    await log.save();
    console.log('Scan event saved successfully:', log);

    // Return success message
    res.status(201).json({ 
      message: `Scanned: ${student.name} (${student.studentId}) - ${type}`,
      log, // Return the saved log for debugging
    });
  } catch (error) {
    console.error('Error handling scan:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};