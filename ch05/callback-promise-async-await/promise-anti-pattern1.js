/**안티패턴1 - 프로미스의 then() 함수에 성공 시와 실패 시 처리할 함수를 둘 다 넘기는 경우
이렇게 둘 다 넘기면 기존의 콜백 함수에 결과와 에러를 동시에 넘기는
myWork(function(result, error)) 형태와 다를 바가 없다
*catch()함수로 예외 처리를 하는 것이 좋다
*/

function myWork(work) {
  return new Promise((resolve, reject) => {
    if (work === 'done') {
      resolve('게임 가능');
    } else {
      reject(new Error('게임 불가능'));
    }
  });
}
//1. 프로미스를 사용하긴 했지만 콜백과 다를 바가 없음
myWork('done').then(
  function (value) {
    console.log(value);
  },
  function (err) {
    console.err(err);
  }
);

//2. 좋은 방식 - catch 구문에서 에러 처리, then에서는 프로미스가 이행되는 경우만 처리
myWork('doing')
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    console.err(err);
  });
