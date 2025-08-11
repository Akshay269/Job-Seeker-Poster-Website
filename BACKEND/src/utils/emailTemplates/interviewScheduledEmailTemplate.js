module.exports = function interviewScheduledEmailTemplate({
  fullName,
  jobTitle,
  interviewDate,
  interviewTime,
  meetingLink
}) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Interview Scheduled</h2>
      <p>Dear ${fullName},</p>
      <p>We are pleased to inform you that your application for <strong>${jobTitle}</strong> has progressed to the interview stage.</p>
      <p><strong>Date:</strong> ${interviewDate}</p>
      <p><strong>Time:</strong> ${interviewTime}</p>
      <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
      <p>Please ensure you are prepared and available at the scheduled time.</p>
      <p>Best regards,<br>HR Team</p>
    </div>
  `;
};
