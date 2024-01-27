const { MongoClient, ServerApiVersion } = require('mongodb'); //몽고디비 패키지 임포트

// 1. MongoDB 연결 정보
const uri = 'mongodb+srv://root:qwer1234!@cluster0.0bobrbt.mongodb.net/?retryWrites=true&w=majority';
//2. MongoDB 클라이언트 객체 생성
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //3. MongoDB에 접속
    await client.connect();
    // Send a ping to confirm a successful connection
    //4. DB 및 컬렉션에 접속'
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); //연결 끊기
  }
}
run().catch(console.dir);
