const commentsRouter = require('express').Router();
const {
  patchCommentVotes,
  removeComment
} = require('../controllers/comments.controllers');
const { handle405Errors } = require('../errors/index.errors');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(removeComment)
  .all(handle405Errors);

module.exports = commentsRouter;
