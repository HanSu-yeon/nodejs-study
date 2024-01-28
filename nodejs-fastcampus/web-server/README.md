### createServer 메소드

- http.createServer() 메소드는 **객체를 생성**함
- server 객체는 EventEmitter를 기반으로 만들어졌다. server.on('request', 콜백함수);

### server 객체

- server 객체는 컴퓨터의 **포트를 수신**하고 요청이 만들어질 때마다 requestListener라는 함수를 실행할 수 있음
  \*server.listen() => 서버 실행, server.close() => 서버 종료
- server 객체는 EventEmitter를 기반으로 만들어졌다
  \*server.on('request', 콜백 함수), server.on('connection', 콜백 함수) ...(close, upgrade...)
- HTTP 서버 객체는 컴퓨터의 포트를 수신하고 요청이 만들어질 때마다 requestListener라는 함수를 실행할 수 있다

### RequestListener 함수

- requestListener는 서버가 요청을 받을 때마다 호출되는 함수
- requestListener 함수는 사용자의 요청과 사용자에 대한 응답을 처리한다

**req**

- req(request), res(reseponse) 객체는 노드가 전달해줌
- request 객체는 IncomingMessage의 인스턴스이다
- IncomingMessage 객체는 서버에 대한 요청을 나타낸다

**res**

- ServerResponse 객체는 requestListener함수의 두 번째 매개변수로 전달됨
- 클라이언트 웹 페이지를 제공하기 위해 response 객체를 사용함
