const connection = require('../db/connection');

const selectAllTopics = () => {
  return connection('topics')
    .select('*')
    .then(result => {
      return result;
    });
};

module.exports = { selectAllTopics };
