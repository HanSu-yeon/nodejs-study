const express = require('express');
const path = require('path');
const PORT = 4000;
require('dotenv').config();
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const productsRouter = require('./routes/products.router');
const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('public'));
//bodyParser가 없으면 req.body에서 데이터 읽어올 때 undefined가 출력됨
app.use(express.json()); //express 내장 미들웨어 사용(bodyParser 대체)

const { default: mongoose } = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGODB_ADMIN}:${process.env.MONGODB_PW}@node-test-app.nysiwk7.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose
  .connect(uri)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.log(err);
  });
//미들웨어
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start: ${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

app.get('/', (req, res, next) => {
  setImmediate(() => {
    next(new Error('it is an error'));
  });
  // res.render('index', {
  //   imageTitle: 'It is a sea',
  // });
});

app.use((error, req, res, next) => {
  res.json({ message: error.message });
});
//3. server.js 파일에 경로에 따른 라우터 등록하기
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
