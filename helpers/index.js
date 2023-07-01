'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function generateSalesId(userId, number) {
  const userIdFormatted = String(userId).padStart(2, '0');
  const numberFormatted = String(number).padStart(3, '0');
  const salesId = `S${userIdFormatted}-${numberFormatted}`;
  return salesId;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  generateSalesId,
};
