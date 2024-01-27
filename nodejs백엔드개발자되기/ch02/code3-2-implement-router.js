//user와 feed 요청을 처리하는 서버
const http = require('http');
const url = require('url'); //1. url 모듈 로딩

http
  .createServer((req, res) => {
    //url모듈을 사용해 요청(req)으로 받은 url의 pathname을 얻어냄
    //url.parse(요청으로 받은 url, 쿼리 스트링도 함께 파싱할지 여부 설정하는 변수)
    const path = url.parse(req.url, true).pathname; //2. path명 할당
    //한글 사용할 경우 charset 설정 필요
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (path === '/user') {
      res.end('[user] name: 앤디, age: 30'); // 3. /user 결과값 설정
    } else if (path === '/feed') {
      res.end(`<meta charset="UTF-8"><ul> 
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`); //4. /feed에 대한 결괏값 설정
    } else {
      res.statusCode = 404; //응답코드
      res.end('404 page not found'); //5. 결괏값으로 에러 메시지 설정
    }
  })
  .listen('3000', () => console.log('라우터를 만들어보자!'));
