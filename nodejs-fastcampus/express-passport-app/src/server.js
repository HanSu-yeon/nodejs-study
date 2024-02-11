const cookieSession = require('cookie-session');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const passport = require('passport');
const User = require('./models/users.model');

const config = require('config');
const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router');
const serverConfig = config.get('server');

const port = serverConfig.port;

app.use(
  cookieSession({
    name: 'cookie-session-name',
    keys: [`${process.env.COOKIE_ENCRYPTION_KEY}`],
  })
);

require('dotenv').config();
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
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.log(err);
  });

//정적파일 제공
// /static경로로 오면  public폴더 안에 있는 것들을 제공
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/auth', usersRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
