const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let receiveEmail = async (req, res, next) => {
  let { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({
      success: false,
      message: "email and messsage is required",
    });
  }
  try {
    await transport.sendMail({
      from: process.env.email_user,
      to: email,
      subject: "Welcome to Magizhan's email service",
      html: `
        <h2>New Message Received</h2>
        <p><b>From:</b> ${process.env.email_user}</p>
        <p><b>Message:</b> ${message}</p>
        `,
    });

    res.json({
      success: true,
      message: `Email sent Successfully to ${email}`,
    });
  } catch (error) {
    console.error("Mail Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

let sendandreceiveMail = async (req, res, next) => {
  let { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      success: false,
      message: "Email and Message is required",
    });
  }

  try {
    await transport.sendMail({
      from: email,
      to: process.env.email_user,
      subject: "New Contact Message",
      html: `
        <h2>New Message Received</h2>
        <p><b>From:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
        `,
    });

    await transport.sendMail({
      from: process.env.email_user,
      to: email,
      subject: "We received your message",
      html: `
        <h3>Hello 👋</h3>
        <p>Thank you for contacting us.</p>
        <p>We have received your message and will contact you soon.</p>
        <br/>
        <p>Regards,<br/>Magizhan G</p>
        `,
    });

    res.json({
      success: true,
      message: "Message received. Confirmation email sent.",
    });
  } catch (err) {
    console.error("Email error: ", err);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

module.exports = {
  receiveEmail,
  sendandreceiveMail,
};
