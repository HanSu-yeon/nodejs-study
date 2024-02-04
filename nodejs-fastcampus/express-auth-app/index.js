const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

//middleware등록
//body => parsing => req.body
app.use(express.json()); //json 형태의 요청(req) body를 파싱하기 위해 사용
//cookies => parsing => req.cookies
app.use(cookieParser());

const SECRETKEY = 'superSecretkey';
const REFRESHSECRETKEY = 'refreshSecretkey';
const posts = [
  {
    username: 'john',
    title: 'post1',
  },
  {
    username: 'han',
    title: 'post2',
  },
];

let refreshTokens = [];
app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  //jwt 이용해 토큰 생성: payload + secretText
  //expiresIn: 만료시간
  const accessToken = jwt.sign(user, SECRETKEY, { expiresIn: '30s' });
  //jwt를 이;용해서 refreshToken도 생성
  const refreshToken = jwt.sign(user, REFRESHSECRETKEY, { expiresIn: '1d' });
  refreshTokens.push(refreshToken);

  //refresh token을 쿠키에 담아서 보냄
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken: accessToken });
});
//인증된 사람만
app.get('/posts', authMiddleware, (req, res) => {
  res.json(posts);
});

//refreshToken으로 accessToken 새로 생성하기
app.get('/refresh', (req, res) => {
  //cookies 가져오기
  const cookies = req.cookies;
  //?. : optional chaining 연산자
  //cookies 객체가 존재하고 jwt 속성이 존재하는지 체크
  if (!cookies?.jwt) return res.sendStatus(403);

  //jwt있으면
  const refreshToken = cookies.jwt;
  //refreshtoken이 데이터베이스에 있는 토큰인지 확인
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  //token이 유효한 토큰인지 확인
  jwt.verify(refreshToken, REFRESHSECRETKEY, (err, payload) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ name: payload.name }, SECRETKEY, { expiresIn: '30s' });

    res.json({ accessToken: accessToken });
  });
});

//authMiddleware
function authMiddleware(req, res, next) {
  //1. 토큰을 request headers에서 가져오기
  const authHeader = req.headers['authorization'];
  //Bearer sdfsdfsdf.sdfsdfsdfwerwe.weygwetgwe
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  //토큰이 있은이 유효한 토큰인지 확인 (만료시간이 끝나도 여기에 해당)
  jwt.verify(token, SECRETKEY, (err, user) => {
    if (err) return res.sendStatus(403);
    // 다른 미들웨어에서 user정보를 사용할 수도 있기 때문에 req에 넣어줌
    req.user = user;
    next();
  });
}
const port = 4000;
//express앱 실행
app.listen(port, () => {
  console.log('listening on port ' + port);
});
