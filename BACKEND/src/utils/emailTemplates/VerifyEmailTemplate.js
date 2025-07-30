const VerifyEmailTemplate = ({ name, otp }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
    <h2 style="color: #5e2b97;">Welcome to Anvaya, ${name || "User"}!</h2>
    <p style="font-size: 16px;">We're excited to have you onboard. Use the following One-Time Password (OTP) to verify your account:</p>

    <div style="margin: 20px 0; text-align: center;">
      <span style="display: inline-block; background: #5e2b97; color: white; font-size: 24px; padding: 12px 24px; border-radius: 6px; letter-spacing: 4px;">
        ${otp}
      </span>
    </div>

    <p style="font-size: 14px; color: #888;">This OTP is valid for the next 10 minutes.</p>

    <hr style="margin: 30px 0;" />

    <p style="font-size: 12px; color: #aaa;">If you didn't request this, please ignore this email.</p>
    <p style="font-size: 12px; color: #aaa;">— The Anvaya Team</p>
  </div>
`;

module.exports=VerifyEmailTemplate;