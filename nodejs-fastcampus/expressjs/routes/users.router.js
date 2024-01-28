const express = require('express');
const userController = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:userId', userController.getUser);
usersRouter.post('/', userController.postUser);

module.exports = usersRouter;
