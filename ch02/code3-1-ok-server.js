const http = require('http');

//createServer로 서버 인스턴스 생성
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html'); //1. 응답의 헤더 설정
  res.end('OK'); //2. 'ok'를 응답하고 종료
});
//list(port, 서버가 시작될 때 실행하는 콜백 함수)
server.listen('3000', () => console.log('OK 서버 시작')); //3. 접속 대기
