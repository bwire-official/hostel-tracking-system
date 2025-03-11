const Log = require('../models/Log');
const Student = require('../models/Student');

exports.handleScan = async (req, res) => {
  const { studentId, reason } = req.body;

  try {
    console.log(`Received scan request for student ID: ${studentId}`);

    // ✅ Find student using studentId (which is a string, not an ObjectId)
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // ✅ Find latest log for this student
    const latestLog = await Log.findOne({ studentId: student.studentId }).sort({ timestamp: -1 });

    let type = 'check-in';
    if (latestLog && latestLog.type === 'check-in') {
      type = 'check-out';
      if (!reason) {
        return res.status(400).json({ message: 'Reason is required for check-out' });
      }
    }

    // ✅ Save log with correct studentId (string, NOT ObjectId)
    const log = new Log({
      studentId: student.studentId, // Ensure studentId is stored as a string
      type,
      reason: type === 'check-out' ? reason : undefined,
    });

    await log.save();
    console.log('Scan event saved successfully:', log);

    res.status(201).json({ 
      message: `Scanned: ${student.name} (${student.studentId}) - ${type}`,
      log: {
        _id: log._id,
        studentId: student.studentId,
        studentName: student.name,
        type: log.type,
        reason: log.reason,
        timestamp: log.timestamp,
      },
      student: {
        name: student.name,
        id: student.studentId
      }
    });
    
  } catch (error) {
    console.error('Error handling scan:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
