const {
  selectArticleByID,
  updateArticleVotes,
  insertComment,
  selectAllComments,
  selectAllArticles,
  insertArticle,
  deleteArticle
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

const getAllComments = (req, res, next) => {
  selectAllComments(req.params.article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

const getAllArticles = (req, res, next) => {
  selectAllArticles(req.query)
    .then(articles => {
      res.status(200).send({
        articles: articles.articles,
        total_count: articles.total_count
      });
    })
    .catch(err => {
      next(err);
    });
};

const postArticle = (req, res, next) => {
  insertArticle(req.body)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const removeArticle = (req, res, next) => {
  deleteArticle(req.params.article_id)
    .then(article => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getArticleByID,
  patchArticleVotes,
  postComment,
  getAllComments,
  getAllArticles,
  postArticle,
  removeArticle
};
