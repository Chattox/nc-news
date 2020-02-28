const articlesRouter = require('express').Router();
const {
  getArticleByID,
  patchArticleVotes,
  postComment,
  getAllComments,
  getAllArticles,
  postArticle,
  removeArticle
} = require('../controllers/articles.controllers');
const { handle405Errors } = require('../errors/index.errors');

articlesRouter
  .route('/')
  .get(getAllArticles)
  .post(postArticle)
  .all(handle405Errors);
articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleVotes)
  .delete(removeArticle)
  .all(handle405Errors);
articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getAllComments)
  .all(handle405Errors);

module.exports = articlesRouter;
