const connection = require('../db/connection');

const selectUserByUsername = username => {
  return connection('users')
    .where({ username })
    .select('*')
    .then(result => {
      return result[0];
    });
};

module.exports = { selectUserByUsername };
