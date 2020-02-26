const {
  updateCommentVotes,
  deleteComment
} = require('../models/comments.models');

const patchCommentVotes = (req, res, next) => {
  updateCommentVotes(req.params.comment_id, req.body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

const removeComment = (req, res, next) => {
  deleteComment(req.params.comment_id)
    .then(comment => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { patchCommentVotes, removeComment };
