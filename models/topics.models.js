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

const insertTopic = topic => {
  return connection('topics')
    .insert(topic)
    .returning('*')
    .then(topic => {
      return topic[0];
    });
};

module.exports = { selectAllTopics, insertTopic };
