const topicsRouter = require('express').Router();
const {
  getAllTopics,
  postTopic
} = require('../controllers/topics.controllers');
const { handle405Errors } = require('../errors/index.errors');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .post(postTopic)
  .all(handle405Errors);

module.exports = topicsRouter;
