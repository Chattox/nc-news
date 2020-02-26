const commentsRouter = require('express').Router();
const {
  patchCommentVotes,
  removeComment
} = require('../controllers/comments.controllers');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(removeComment);

module.exports = commentsRouter;
