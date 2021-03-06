const apiRouter = require('express').Router();
const { getEndpoints } = require('../controllers/api.controllers');
const { handle405Errors } = require('../errors/index.errors');
const topicsRouter = require('./topics.router');
const usersRouter = require('./users.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');

apiRouter
  .route('/')
  .get(getEndpoints)
  .all(handle405Errors);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
