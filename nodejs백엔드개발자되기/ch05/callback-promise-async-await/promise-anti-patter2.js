//안티패턴2 - 프로미스를 중첩해서 사용하는 경우

function myWork(work) {
  return new Promise((resolve, reject) => {
    resolve(work.toUpperCase());
  });
}

function playGame(work) {
  return new Promise((resolve, reject) => {
    if (work === 'DONE') {
      resolve('GO PLAY GAME');
    } else {
      reject(new Error("DON'T"));
    }
  });
}

//1.안티- 프로미스를 중첩해서 사용
myWork('done').then(function (result) {
  playGame(result).then(function (val) {
    console.log(val);
  });
});

//2.추천- 결과를 then으로 넘김
myWork('done').then(playGame).then(console.log);
