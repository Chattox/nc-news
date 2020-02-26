const commentsRouter = require('express').Router();
const { patchCommentVotes } = require('../controllers/comments.controllers');

commentsRouter.route('/:comment_id').patch(patchCommentVotes);

module.exports = commentsRouter;
