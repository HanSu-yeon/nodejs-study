const express = require('express');
const postController = require('../controllers/posts.controller');
//1. express.Router 클래스를 이용해서 router 객체 생성
const postsRouter = express.Router();

//2. router객체에 미들웨어 함수로 등록
postsRouter.get('/', postController.getPost);

module.exports = postsRouter;
