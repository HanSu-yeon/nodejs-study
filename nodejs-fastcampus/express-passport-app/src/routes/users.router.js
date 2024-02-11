const express = require('express');
const usersRouter = express.Router();
const passport = require('passport');
const User = require('../models/users.model');
const sendMail = require('../mail/mail');

usersRouter.post('/login', (req, res, next) => {
  //local 전략
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); //익스프레스 err처리기로 보낸다
    }
    //user가 없으면
    if (!user) {
      return res.json({ msg: info });
    }
    //user, pw가 일치하면 로그인 세션 생성
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      //로그인 페이지로 리다이렉트
      res.redirect('/');
    });
  })(req, res, next);
});

usersRouter.post('/logout', (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

usersRouter.post('/signup', async (req, res) => {
  console.log(req.body); //email, password
  // user객체를 생성함
  const user = new User(req.body);
  try {
    //user 컬렉션(테이블)에 유저를 저장함
    await user.save();

    //이메일 보내기
    sendMail('받는 사람 메일', '받는 사람 이름', 'welcome');
    // return res.status(200).json({ success: true });
    res, redirect('/login');
  } catch (error) {
    console.error(error);
  }
});

usersRouter.get('/google', passport.authenticate('google'));
usersRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
);

usersRouter.get('/kakao', passport.authenticate('kakao'));
usersRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
);
module.exports = usersRouter;
