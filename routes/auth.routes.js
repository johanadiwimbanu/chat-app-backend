const { Router } = require('express');
const {
  handleSignOut,
  handleSignIn,
  handleSignUp,
} = require('../controllers/auth.controller');

const authRoutes = Router();

authRoutes.post('/sign-in', handleSignIn);

authRoutes.post('/sign-up', handleSignUp);

authRoutes.delete('/sign-out', handleSignOut);

module.exports = authRoutes;
