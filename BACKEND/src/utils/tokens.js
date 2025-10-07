const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const REFRESH_COOKIE_NAME = "refresh_token";
const ACCESS_COOKIE_NAME = "access_token";
const crypto = require("crypto");
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
function createRefreshTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Save refresh token in DB (hashed if you want extra security)
 */
async function saveRefreshToken({ userId, tokenHash, ip, userAgent }) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const refreshToken=await prisma.refreshToken.create({
    data: {
      tokenHash,
      userId,
      expiresAt,
    },
  });
  return refreshToken;
}

/**
 * Verify a token (access or refresh)
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  signAccessToken,
  createRefreshTokenString,
  saveRefreshToken,
  verifyToken,
  hashToken,
  REFRESH_COOKIE_NAME,
  ACCESS_COOKIE_NAME
};
