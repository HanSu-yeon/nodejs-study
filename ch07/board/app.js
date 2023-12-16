const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

//req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbConnection = require('./configs/mongodb-connection');
const postService = require('./services/post-service'); //서비스 파일 로딩
const { ObjectId } = require('mongodb');
//1. 익스프레스에서 사용할 템플릿 엔진을 등록하는 코드로 'handlebars'는 파일의 확장자로 사용할 이름
app.engine(
  'handlebars',
  //handlebars.create() 함수: handlebars객체 만들 때 사용함, 옵션에서 헬퍼 함수를 추가할 수 있음
  handlebars.create({
    // 핸들바 생성 및 엔진 반환
    helpers: require('./configs/handlebars-helpers'),
  }).engine
);
app.set('view engine', 'handlebars'); //웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set('views', __dirname + '/views'); //뷰 디렉터리를 views로 설정

//리스트 페이지
app.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; //현재 페이지 데이터
  const search = req.query.search || ''; //검색어 데이터
  try {
    //postService.list에서 글 목록과 페이지네이터를 가져옴
    const [posts, paginator] = await postService.list(collection, page, search);

    //리스트 페이지 렌더링
    //객체에 값을 할당할 때 값으로 사용하는 변수명과 키의 이름이 같다면 변수만 바로 넣어도 된다
    //{{search: search, paginator: paginator, posts: posts}}
    res.render('home', { title: '테스트 게시판', search, paginator, posts });
  } catch (error) {
    console.error(error);
    res.render('home', { title: '테스트 게시판' });
    //에러가 나는 경우는 빈 값으로 렌더링
  }
});

//쓰기 페이지 이동
app.get('/write', (req, res) => {
  res.render('write', { title: '테스트 게시판',mode:"create" });
});

//상세페이지로 이동
app.get('/detail/:id', async (req, res) => {
  //1. 게시글 정보 가져오기
  const result = await postService.getDetailPost(collection, req.params.id);
  console.log(result)
  res.render('detail', {
    title: '테스트게시판',
    post: result.value,
  });
});


app.get('/modify/:id', async (req, res) => {
  const { id } = req.params.id;
  const post = await postService.getPostById(collection, req.params.id);
  console.log(post);
  res.render('write', { title: '테스트게시판', mode: 'modify', post });
})

app.post('/modify', async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title, writer, password, content, createdDt: new Date().toISOString(),
  };
  
  const result = postService.updatePost(collection, id, post);
  res.redirect(`/detail/${id}`);
});

app.delete('/delete', async (req, res) => {
  const { id, password } = req.body;
  try {
    const result = await collection.deleteOne({ _id: ObjectId(id), password: password });

    if (result.deletedCount !== 1) {
      console.log('삭제 실패');
      return res.json({ isSuccess: false });
    }
    return res.json({ isSuccess: true });
  } catch (error) {
    console.error(error);
    return res.json({ isSuccess: false });
  }
});


//댓글 추가
app.post('/write-comment', async (req, res) => {
  const { id, name, password, comment } = req.body;
  const post = await postService.getPostById(collection,id);

  if (post.comments) {
    post.comments.push({
      idx: post.comments.length + 1,
      name,
      password,
      comment,
      createdDt: new Date().toISOString(),
    });
  } else {
    post.comments = [
      {
        idx: 1,
        name,
        password,
        comment,
        createdDt:new Date().toISOString(),
      }
    ]
  }

  postService.updatePost(collection, id, post);
  return res.redirect(`/detail/${id}`);
})

//댓글 삭제
app.delete('/delete-comment', async (req, res) => {
  const { id, idx, password } = req.body;

  const post = await collection.findOne({
    _id: ObjectId(id),
    comments: { $elemMatch: {idx:parseInt(idx), password}},
  },
    postService.projectOption,
  );

  if (!post) {
    return res.json({isSuccess: false});
  }

  post.comments = post.comments.filter((comment) => comment.idx != idx);
  postService.updatePost(collection, id, post);
  return res.json({ isSuccess: true });
})
//글쓰기
app.post('/write', async (req, res) => {
  const post = req.body;
  //글쓰기 후 결과 반환
  const result = await postService.writePost(collection, post);
  //생성된 도큐먼트의 _id를 사용해 상세페이지로 이동
  console.log(result);
  res.redirect(`/detail/${result.insertedId}`);
});

app.post('/check-password', async (req, res) => {
  const { id, password } = req.body;

  const post = await postService.getPostByIdAndPassword(collection, { id, password });

  if (!post) {
    return res.status(404).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
})

let collection;
app.listen(3000, async () => {
  console.log('Server started');
  //mongodbConnection()의 결과는 mongoClient
  const mongoClient = await mongodbConnection();
  //mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
  collection = mongoClient.db().collection('post');
  console.log('/MongoDB connected');
});
