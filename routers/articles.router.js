const articlesRouter = require('express').Router();
const {
  getArticleByID,
  patchArticleVotes,
  postComment
} = require('../controllers/articles.controllers');

articlesRouter.get('/:article_id', getArticleByID);
articlesRouter.patch('/:article_id', patchArticleVotes);
articlesRouter.post('/:article_id/comments', postComment);

module.exports = articlesRouter;
