const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/users.controllers');
const { handle405Errors } = require('../errors/index.errors');

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all(handle405Errors);

module.exports = usersRouter;
