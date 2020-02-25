const articlesRouter = require('express').Router();
const {
  getArticleByID,
  patchArticleVotes,
  postComment,
  getAllComments,
  getAllArticles
} = require('../controllers/articles.controllers');

articlesRouter.route('/').get(getAllArticles);
articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleVotes);
articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getAllComments);

module.exports = articlesRouter;
