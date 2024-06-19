const express = require('express');
const { PORT } = require('../config/app.js');
const routes = require('../routes/routes.js');
const DBonnection = require('../config/database.js');
const cookieParser = require('cookie-parser');

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use('/api', routes);

server.listen(PORT, () => {
  DBonnection();
  console.log(`Server running on ${PORT}`);
});
