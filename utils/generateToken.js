const jwt = require('jsonwebtoken');
const { Response } = require('express');
const { JWT_SECRET, APP_ENV } = require('../config/app');
/**
 * @param {Response} res
 */
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '3d',
  });
  res.cookie('token', token, {
    maxAge: 3 * 24 * 69 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: APP_ENV !== 'development',
  });
};

module.exports = generateTokenAndSetCookie;
