const express = require('express');
const cors = require('cors')
const userController = require('./users/user.controller');

const app = express();
app.use(cors());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

process.on('uncaughtException', error => {
  console.error('error', `captured error: ${error.message}`);
  const { exit } = process;
  exit(1);
});

process.on('unhandledRejection', reason => {
  console.error('error', `Unhandled rejection detected: ${reason.message}`);
  logger.log('error', `Unhandled rejection detected: ${reason.message}`);
  const { exit } = process;
  exit(1);
});

app.use('/user', userController);

module.exports = app;