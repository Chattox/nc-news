const { selectAllTopics, insertTopic } = require('../models/topics.models');

const getAllTopics = (req, res, next) => {
  selectAllTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(err => {
      next(err);
    });
};

const postTopic = (req, res, next) => {
  insertTopic(req.body)
    .then(topic => {
      res.status(201).send({ topic });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getAllTopics, postTopic };
