const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://root:qwer1234!@cluster0.0bobrbt.mongodb.net/?retryWrites=true&w=majority';
const uri = 'mongodb+srv://root:qwer1234!@cluster0.0bobrbt.mongodb.net/board';

module.exports = function (callback) {
  //몽고디비 커넥션 연결 함수 반환
  return MongoClient.connect(uri, callback);
};
