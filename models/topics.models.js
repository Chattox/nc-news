const connection = require('../db/connection');

const selectAllTopics = () => {
  return connection('topics')
    .select('*')
    .then(result => {
      if (result.length > 0) {
        return result;
      } else {
        return Promise.reject({ status: 404, msg: '404 not found' });
      }
    });
};

module.exports = { selectAllTopics };
