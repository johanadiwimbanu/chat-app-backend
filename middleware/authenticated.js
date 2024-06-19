const jwt = require('jsonwebtoken');
const { Request, Response } = require('express');
const { JWT_SECRET } = require('../config/app');
const User = require('../models/user.model');

/**
 * @param {Response} res
 * @param {Request} req
 */

const authenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Unauthorized - missing token');
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) {
    return res.status(401).send('Unauthorized - unverified token');
  }

  const { userId } = decoded;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).send('Unauthorized - empty user');
  }

  req.user = user;

  next();
};

module.exports = authenticated;
