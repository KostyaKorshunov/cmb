const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String
});

userSchema.statics.toResponse = user => {
  const { id, name, email } = user;
  return { id, name, email };
};

userSchema.statics.fromRequest = ({ id, name, email }) => {
  return new User({ id, name, email });
};

const User = mongoose.model('User', userSchema);

module.exports = User;