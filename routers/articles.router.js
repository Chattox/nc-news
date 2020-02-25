const articlesRouter = require('express').Router();
const { getArticleByID } = require('../controllers/articles.controllers');

articlesRouter.get('/:article_id', getArticleByID);

module.exports = articlesRouter;
