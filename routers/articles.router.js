const articlesRouter = require('express').Router();
const {
  getArticleByID,
  patchArticleVotes,
  postComment,
  getAllComments,
  getAllArticles
} = require('../controllers/articles.controllers');
const { handle405Errors } = require('../errors/index.errors');

articlesRouter
  .route('/')
  .get(getAllArticles)
  .all(handle405Errors);
articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleVotes)
  .all(handle405Errors);
articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getAllComments)
  .all(handle405Errors);

module.exports = articlesRouter;
