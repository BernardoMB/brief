import User from '../models/user';

module.exports = {
  findUserByEmail(email) {
    return User
      .find({'email': email});
  }
};
