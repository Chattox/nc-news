const articlesRouter = require('express').Router();
const {
  getArticleByID,
  patchArticleVotes,
  postComment,
  getComments
} = require('../controllers/articles.controllers');

articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleVotes);
articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getComments);

module.exports = articlesRouter;
