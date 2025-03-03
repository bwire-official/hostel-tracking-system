const QRCode = require('qrcode');

const generateQR = async (data) => {
  try {
    const qrCode = await QRCode.toDataURL(data); // Generate QR code as a data URL
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

module.exports = generateQR;