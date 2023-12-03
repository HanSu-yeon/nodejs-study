async function myName() {
  return 'Andy';
}

//await은 Promise 객체인 myName() 함수의 실행이 끝나길 기다린다
//Promise { <pending> } 은 console.log(showName())의 결괏값이다

async function showName() {
  const name = await myName();
  console.log('name :', name); //Andy
}

console.log(showName()); //Promise { <pending> }

//async-await, setTimeout()으로 1부터 10까지 세기
function waitOneSecond(msg) {
  //1. 1초 대기하고 메시지 출력
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(`${msg}`), 1000);
  });
}

async function countOneToTen() {
  //2. 10초 동안 1초마다 메시지 출력
  for (let x of [...Array(10).keys()]) {
    //3. 0부터 9까지 루프를 순회
    //4. 1초 대기 후 result에 결괏값 저장
    let result = await waitOneSecond(`${x + 1}초 대기중...`);
    console.log(result);
  }
  console.log('완료');
}

countOneToTen();
