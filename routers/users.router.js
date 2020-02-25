const userRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/users.controllers');

userRouter.get('/:username', getUserByUsername);

module.exports = userRouter;
