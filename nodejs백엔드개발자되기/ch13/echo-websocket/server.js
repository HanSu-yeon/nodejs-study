const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', ws => {
  ws.send('[서버 접속 완료!]'); //클라이언트 접속 시 클라이언트로 메시지를 보냄

  //클라이언트에서 메시지가 수신된 경우의 이벤트 핸들러
  ws.on('message', message => {
    ws.send(`서버로부터 응답: ${message}`);
  });

  ws.on('close', () => {
    console.log('클라이언트 접속 해제');
  });
});
