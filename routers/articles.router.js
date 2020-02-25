const articlesRouter = require('express').Router();
const {
  getArticleByID,
  patchArticleVotes
} = require('../controllers/articles.controllers');

articlesRouter.get('/:article_id', getArticleByID);
articlesRouter.patch('/:article_id', patchArticleVotes);

module.exports = articlesRouter;
