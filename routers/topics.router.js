const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topics.controllers');
const { handle405Errors } = require('../errors/index.errors');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .all(handle405Errors);

module.exports = topicsRouter;
