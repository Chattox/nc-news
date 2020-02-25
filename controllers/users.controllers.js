const { selectUserByUsername } = require('../models/users.models');

const getUserByUsername = (req, res, next) => {
  selectUserByUsername(req.params.username).then(user => {
    res.status(200).send({ user });
  });
};

module.exports = { getUserByUsername };
