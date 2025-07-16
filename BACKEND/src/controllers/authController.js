
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
   const { firstName,lastName, companyName, email, password, role } = req.body;

  if (!email || !password || !role) {
     return res.status(400).json({ message: "Missing required fields" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      name: role === "APPLICANT" ? firstName+" "+lastName : companyName,
      companyName: role === "ADMIN" ? companyName : null,
    },
  });

  return res.status(201).json({ message: "Registered successfully" });
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

  res.json({ user: userData, token });
};
