const { Request, Response } = require('express');
const User = require('../models/user.model');
const {
  model,
  Error: { ValidationError, ValidatorError },
} = require('mongoose');
const ConflictError = require('../errors/ConflictError');
const generateTokenAndSetCookie = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

/**
 * @param {Response} res
 * @param {Request} req
 */

const handleSignUp = async (req, res) => {
  try {
    const { name, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      var errorValidation = new ValidationError();

      errorValidation.addError(
        'password',
        new ValidatorError({
          message: 'Confirmation password must be the same as the password',
        })
      );
      throw errorValidation;
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const maleUserPic = `https://avatar.iran.liara.run/boy?username=${username}`;
    const femaleUserPic = `https://avatar.iran.liara.run/girl?username=${username}`;

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      gender,
      profilePhoto: gender === 'male' ? maleUserPic : femaleUserPic,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    return res.status(201).json({
      message: 'Success create user',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json(errors);
    } else if (error instanceof ConflictError) {
      return res.status(409).json(error);
    }
    res.status(500).send('Woops something went wrong');
  }
};

const handleSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Woops something went wrong');
  }
};

const handleSignOut = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    res.status(200).json({ message: 'Logout' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Woops something went wrong');
  }
};

module.exports = {
  handleSignUp,
  handleSignIn,
  handleSignOut,
};
