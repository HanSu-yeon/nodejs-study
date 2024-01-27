const express = require('express'); //1.express 모듈 불러오기
const app = express(); //2.express를 초기화 후 app에 할당
const port = 3000;

// 3./로 요청이 오는 경우 실행됨
app.get('/', (req, res) => {
  //4.헤더값 설정 - 반환할 콘텐츠 정보 설정
  //결과의 콘텐츠 타입은 html이며 결과에 한글이 있으므로 캐릭터셋을 utf-8로 변경
  res.set({ 'Content-Type': 'text/html; charset=utf-8' });
  res.send('헬로 express');
});

app.listen(port, () => {
  //5.서버를 기동하고 listen() 사용해 클라이언트 요청을 기다림
  console.log(`START SERVER: use ${port}`);
});
