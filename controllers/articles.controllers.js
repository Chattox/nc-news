const {
  selectArticleByID,
  updateArticleVotes,
  insertComment
} = require('../models/articles.models');

const getArticleByID = (req, res, next) => {
  selectArticleByID(req.params.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const patchArticleVotes = (req, res, next) => {
  updateArticleVotes(req.params.article_id, req.body)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const postComment = (req, res, next) => {
  insertComment(req.params.article_id, req.body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getArticleByID, patchArticleVotes, postComment };
