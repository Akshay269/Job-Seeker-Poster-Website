const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const {
  signAccessToken,
  createRefreshTokenString,
  saveRefreshToken,
  hashToken,
  COOKIE_NAME,
} = require("../utils/tokens");
const generateOTP = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const VerifyEmailTemplate = require("../utils/emailTemplates/VerifyEmailTemplate");

const prisma = new PrismaClient();

//Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username)
      return res.status(400).json({ message: "Missing required fields" });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        isVerified: false,
        otp,
        otpExpires,
      },
    });

    await sendEmail({
      to: email,
      subject: "Your OTP for Anvaya",
      html: VerifyEmailTemplate({ name: user.username, otp }),
    });

    return res
      .status(201)
      .json({ message: "Registered. OTP sent for verification." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // If not verified, send OTP
    if (!user.isVerified) {
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await prisma.user.update({ where: { email }, data: { otp, otpExpires } });

      await sendEmail({
        to: email,
        subject: "Your OTP for Anvaya",
        html: VerifyEmailTemplate({ name: user.username, otp }),
      });

      return res.status(202).json({
        message: "Account not verified. OTP sent.",
        user: { email: user.email, username: user.username, isVerified: false },
      });
    }

    // ✅ Verified: issue tokens
    const accessToken = signAccessToken(user);
    const refreshPlain = createRefreshTokenString();
    await saveRefreshToken({
      userId: user.id,
      tokenPlain: refreshPlain,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.cookie(COOKIE_NAME, refreshPlain, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const { password: _, otp, otpExpires, ...userData } = user;
    return res.json({ user: userData, accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//Verify
exports.verifyAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpires && new Date() > user.otpExpires)
      return res.status(400).json({ message: "OTP expired" });

    // mark verified
    await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpires: null },
    });

    return res.json({ message: "Account verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.user.update({ where: { email }, data: { otp, otpExpires } });

    await sendEmail({
      to: email,
      subject: "Your Resend OTP for Anvaya",
      html: VerifyEmailTemplate({ name: user.username, otp }),
    });

    return res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const tokenHash = hashToken(token);
    const dbToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });

    if (!dbToken || dbToken.revoked || dbToken.expiresAt < new Date()) {
      if (dbToken) {
        await prisma.refreshToken.updateMany({
          where: { userId: dbToken.userId },
          data: { revoked: true },
        });
      }
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    // rotate refresh token
    const newPlain = createRefreshTokenString();
    const newDb = await saveRefreshToken({
      userId: dbToken.userId,
      tokenPlain: newPlain,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    await prisma.refreshToken.update({
      where: { id: dbToken.id },
      data: { revoked: true, replacedById: newDb.id },
    });

    const user = await prisma.user.findUnique({
      where: { id: dbToken.userId },
    });
    const accessToken = signAccessToken(user);

    res.cookie(COOKIE_NAME, newPlain, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const { password: _, otp, otpExpires, ...userData } = user;
    return res.json({ user: userData, accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
      const tokenHash = hashToken(token);
      await prisma.refreshToken.updateMany({
        where: { tokenHash },
        data: { revoked: true },
      });
    }
    res.clearCookie(COOKIE_NAME, { path: "/" });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

    // Save in DB (delete old if exists)
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
    await prisma.passwordResetToken.create({
      data: { token: resetToken, userId: user.id, expiresAt },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Hello,</p>
             <p>You requested a password reset. Click the link below to reset:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link will expire in 15 minutes.</p>`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Reset password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const resetEntry = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!resetEntry) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    if (resetEntry.expiresAt < new Date()) {
      return res.status(400).json({ message: "Reset token expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { id: resetEntry.userId },
      data: { password: hashedPassword },
    });

    // Delete reset token after use
    await prisma.passwordResetToken.delete({ where: { id: resetEntry.id } });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
