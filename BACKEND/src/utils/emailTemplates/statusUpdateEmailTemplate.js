module.exports = function statusUpdateEmailTemplate({ fullName, jobTitle, status }) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Application Status Update</h2>
      <p>Dear ${fullName},</p>
      <p>Your application for <strong>${jobTitle}</strong> has been updated to:</p>
      <p style="font-size: 1.2em; font-weight: bold; color: #4CAF50;">${status}</p>
      <p>We’ll keep you informed about the next steps.</p>
      <p>Best regards,<br>HR Team</p>
    </div>
  `;
};
