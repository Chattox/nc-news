const { updateCommentVotes } = require('../models/comments.models');

const patchCommentVotes = (req, res, next) => {
  updateCommentVotes(req.params.comment_id, req.body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { patchCommentVotes };
