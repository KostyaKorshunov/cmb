const mongoose = require('mongoose');
// const userService = require('../resources/users/user.service');

const connect = runServer => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));

  db.once('open', () => {
    console.log('we are connected');
    runServer();
  });
};

// userService.save({
//   name: 'admin',
//   login: 'admin',
//   password: 'admin'
// });

module.exports = { connect };