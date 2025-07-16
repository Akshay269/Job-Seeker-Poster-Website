const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOtp");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { firstName, lastName, companyName, email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      name: role === "APPLICANT" ? `${firstName} ${lastName}` : companyName,
      companyName: role === "ADMIN" ? companyName : null,
      isVerified: false,
      otp,
      otpExpires,
    },
  });

  console.log(`🔐 OTP for ${email}: ${otp}`); // Replace with email/SMS later

  return res.status(201).json({
    message: "Registered. OTP sent for verification.",
    user: {
      email: user.email,
      role: user.role,
      isVerified: false,
    },
  });
};

exports.verifyAccount = async (req, res) => {
  const { email, otp } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpires && new Date() > user.otpExpires) {
    return res.status(400).json({ message: "OTP expired" });
  }

  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      otp: null,
      otpExpires: null,
    },
  });

  return res.json({ message: "Account verified successfully" });
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.role !== role) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ userId: user.id, role: user.role });
  const { password: _, ...userData } = user;

  return res.json({
    user: userData, 
    token,
  });
};

exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: { otp, otpExpires },
  });

  console.log(`🔁 Resent OTP for ${email}: ${otp}`);
  return res.json({ message: "OTP resent successfully" });
};
