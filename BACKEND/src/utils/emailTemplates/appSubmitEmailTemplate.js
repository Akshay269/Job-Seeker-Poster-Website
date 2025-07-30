const appSubmitEmailTemplate = ({ fullName, jobTitle }) => `
    <div style="font-family: sans-serif; padding: 20px; color: #333;">
      <h2>Hi ${fullName},</h2>
      <p>Thank you for applying for <strong>${jobTitle}</strong>.</p>
      <p>We’ve received your application and our team will review it shortly.</p>
      <br/>
      <p>Best regards,<br/>Anvaya Jobs Team</p>
    </div>
  `;

module.exports=appSubmitEmailTemplate;