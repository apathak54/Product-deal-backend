import nodemailer from "nodemailer"

export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Adiray <process.env.MAIL_USER>", // Add a valid from email address
    to: options.to,
    subject: options.subject,
    // text: options.message,
    html: options.html,
  };
  console.log(mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
};