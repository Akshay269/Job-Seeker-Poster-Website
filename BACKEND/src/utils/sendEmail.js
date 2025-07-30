const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email using SendGrid
 * @param {Object} param0
 * @param {string} param0.to - Recipient email
 * @param {string} param0.subject - Email subject
 * @param {string} param0.text - Plain text version
 * @param {string} param0.html - HTML version
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.EMAIL_SENDER, // Must be verified in SendGrid
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`📨 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
