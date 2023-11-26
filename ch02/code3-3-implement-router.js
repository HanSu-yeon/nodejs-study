const http = require('http');
const url = require('url'); //1. url 모듈 로딩

//3-2 라우팅 이후의 처리를 별도의 함수를 만들어서 처리하도록 리팩터링 및 동적 라우팅

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; //2. path명 할당
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (path === '/user') {
      user(req, res); //user()함수 실행
    } else if (path === '/feed') {
      feed(req, res); //feed()함수 실행
    } else {
      notFound(req, res); //notFound()함수 실행
    }
  })
  .listen('3000', () => console.log('라우터를 만들어보자!'));

// /user요청 처리하는 user 함수
const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req, res) => {
  res.end(`<meta charset="UTF-8"><ul> 
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end('404 page not found');
};
