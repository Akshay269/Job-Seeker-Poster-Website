const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Generate an access token
 */
function signAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m", // short-lived
  });
}

/**
 * Generate a refresh token string
 */
function createRefreshTokenString(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d", // longer-lived
  });
}

/**
 * Save refresh token in DB (hashed if you want extra security)
 */
async function saveRefreshToken(userId, refreshToken) {
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
    },
  });
}

/**
 * Verify a token (access or refresh)
 */
function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
  signAccessToken,
  createRefreshTokenString,
  saveRefreshToken,
  verifyToken,
};
