const { MongoClient, ServerApiVersion } = require('mongodb'); //몽고디비 패키지 임포트

// 1. MongoDB 연결 정보 cluster0
const uri = 'mongodb+srv://root:qwer1234!@test.0bobrbt.mongodb.net/?retryWrites=true&w=majority';
//2. MongoDB 클라이언트 객체 생성
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function main() {
  try {
    //커넥션 생성하고 연결 시도
    await client.connect();

    console.log('MongoDB 접속 성공');
    //test데이터베이스의 person 컬렉션 가져오기 -> db가 생성되어 있지 않으면 새로 생성함
    const collection = client.db('test').collection('person');

    await collection.insertOne({ name: 'Andy', age: 30 });
    console.log('문서 추가 완료');

    //문서 찾기
    const documents = await collection.find({ name: 'Andy' }).toArray();
    console.log('찾은 문서: ', documents);

    //문서 갱신하기
    await collection.updateOne({ name: 'Andy' }, { $set: { age: 31 } });
    console.log('문서 업데이트');
    //갱신된 문서 확인하기
    const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
    console.log('갱신된 문서: ', updatedDocuments);

    //문서 삭제하기
    await collection.deleteOne({ name: 'Andy' });
    console.log('문서 삭제');

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

main();
