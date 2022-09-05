const UserModel = require('./user.model');

class UserService {
  constructor() {
    // super(usersRepo);
  }

  async getAll() {
    return UserModel.find({});
  }
}

module.exports = new UserService();