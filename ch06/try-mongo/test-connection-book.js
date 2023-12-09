const { MongoClient } = require('mongodb'); //몽고디비 패키지 임포트

// 1. MongoDB 연결 정보
const uri = 'mongodb+srv://root:qwer1234!@cluster0.0bobrbt.mongodb.net/?retryWrites=true&w=majority';
//2. MongoDB 클라이언트 객체 생성
const client = new MongoClient(uri);

async function run() {
  //비동기 처리 함수
  await client.connect();
  const adminDB = client.db('test').admin(); //admin DB 인스턴스
  const listDatabases = await adminDB.listDatabases(); //데이터베이스 정보 가져오기
  console.log(listDatabases);
  return 'OK';
}

run()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
// run().catch(console.dir);
