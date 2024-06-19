const { Router } = require('express');
const authRoutes = require('./auth.routes.js');
const messageRoutes = require('./message.routes.js');

const routes = Router();
routes.get('/', (req, res) => {
  res.send('Welcome');
});
routes.use('/auth', authRoutes);
routes.use('/message', messageRoutes);

module.exports = routes;
