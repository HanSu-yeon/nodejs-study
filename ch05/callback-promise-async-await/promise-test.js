//callback-test 예제를 프로미스로 변경
const DB = [];

function saveDB(user) {
  const oldDBSize = DB.length + 1;
  DB.push(user);

  console.log(`save ${user.name} to DB`);
  //콜백 대신 Promise 객체 반환
  return new Promise((resolve, reject) => {
    if (DB.length > oldDBSize) {
      //성공시 유저 정보 반환
      resolve(user);
    } else {
      //1. 실패시 에러 발생
      //Promise 객체 실행 결과로 실패를 주어야 하는 경우 reject() 사용
      reject(new Error('Save DB Error!'));
    }
  });
}

function sendEmail(user) {
  console.log(`email to ${user.email}`);
  //Promise 객체를 반환. 실패 처리 없음
  return new Promise(resolve => {
    resolve(user);
  });
}

function getResult(user) {
  //Promise 객체 반환
  return new Promise((resolve, reject) => {
    resolve(`success register ${user.name}`); //성공 시 성공 메시지와 유저명 반환
  });
}

function registerByPromise(user) {
  //2. 비동기 호출이지만, 순서를 지켜서 실행
  //*then() 문법: then(함수 이행시 실행할 함수, 함수 거절시 실행할 함수)
  //*Promise에서 작업이 성공적으로 처리된 경우만 다루고 싶으면 .then에 인수를 하나만 전달하면 된다
  //* 또 Promise 객체에만 then을 사용할 수 있다. 아래는 각 함수들의 결과가 Promise객체라 사용할 수 있는 거임
  const result = saveDB(user)
    .then(sendEmail)
    .then(getResult)
    .catch(error => new Error(error))
    .finally(() => console.log('완료!')); //성공, 실패 여부에 관계없이 실행

  //3. 아직 완료되지 않았으므로 지연(pending) 상태
  console.log(result); //Promise { <pending> } 출력 => 즉, Promise가 실행 중임을 알 수 있음
  return result;
}

const myUser = { email: 'andy@test.com', password: '1234', name: 'andy' };
const result = registerByPromise(myUser);

//결괏값이 Promise이므로 then() 메서드에 함수를 넣어서 결괏값을 볼 수 있음
result.then(console.log);

/**
//동시에 여러 Promise 객체 호출하기: Promise.all(Promise1, Promise2, ...PromiseN)
//=> 나열된 순서와 상관없이 동시에 실행되고 결과는 배열로 반환된다

const myUser = { email: 'andy@test.com', password: '1234', name: 'andy' };
allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);
 */
