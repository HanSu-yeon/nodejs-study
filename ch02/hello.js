const http = require('http'); //1. http 객체 생성
let cnt = 0;

//2. 노드 서버 객체 생성
const server = http.createServer((req, res) => {
  log(cnt); //3.카운트 1 증가
  res.statusCode = 200; //4. 결괏값 200
  res.setHeader('Content-Type', 'text/plain'); //헤더 설정
  res.write('hello\n'); //응답값 설정

  setTimeout(() => {
    //2초 후 Node.js 출력
    res.end('Node.js');
  }, 2000);
});

function log(cnt) {
  console.log((cnt += 1));
}

server.listen(8000, () => console.log('Hello Node.js')); //8000번 포트로 서버 실행
