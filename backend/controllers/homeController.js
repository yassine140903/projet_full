const sendEmail = require('../utils/email');
exports.sendContactMessage = async (req, res) => {
  try {
    const { name, number, email, message } = req.body;

    const emailOptions = {
      email: 'admin@gmail.com', // Admin email address
      subject: 'New Contact Message',
      message: `You have received a new message from ${name} (${email}, ${number}):\n\n${message}`,
    };
    await sendEmail(emailOptions);
    res.status(200).json({
      status: 'success',
      message: 'Contact message sent successfully!',
    });
  } catch (err) {
    console.error('Error sending contact message:', err);
    res.status(500).json({
      status: 'fail',
      message:
        'There was an error sending the contact message. Try again later!',
    });
  }
};
