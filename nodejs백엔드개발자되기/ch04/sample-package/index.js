//1. 모듈을 require함수로 포함시킬 때 실행된다
console.log('require로 부르면 실행됨');

//module.exports: require를 사용해 불러왔을 때 반환하는 객체를 저장하는변수
//module: 현재 모듈을 의미
//exports: 외부에 노출할 객체를 저장하는 변수
module.exports = {
  //2. 외부로 노출할 객체를 저장한다
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  multi: (a, b) => a * b,
  div: (a, b) => a / b,
};

//sample-package를 설치한 프로젝트에서는 require('sample-package')로 module.exports안에 있는 값을 가져올 수 있음
