const connection = require('../db/connection');

const selectUserByUsername = username => {
  return connection('users')
    .where({ username })
    .select('*')
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({ status: 404, msg: '404 not found' });
      } else {
        return result[0];
      }
    });
};

module.exports = { selectUserByUsername };
