const cookieSession = require('cookie-session');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const passport = require('passport');
const User = require('./models/users.model');

const cookieEncryptionKey = ['key1', 'key2'];
app.use(
  cookieSession({
    name: 'cookie-session-name',
    keys: cookieEncryptionKey,
  })
);

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = cb => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = cb => {
      cb();
    };
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
// view engine setup
//EJS 파일들이 들어갈 폴더가 어딘지
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
mongoose
  .connect(`mongodb+srv://root:qwer1234@cluster0.0bobrbt.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.log(err);
  });

//정적파일 제공
// /static경로로 오면  public폴더 안에 있는 것들을 제공
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login', (req, res) => {
  res.render('login');
});

//로그인 버튼 누를 때 passport를 이용한 인증 처리
app.post('/login', (req, res, next) => {
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

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  console.log(req.body); //email, password
  // user객체를 생성함
  const user = new User(req.body);
  try {
    //user 컬렉션(테이블)에 유저를 저장함
    await user.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
