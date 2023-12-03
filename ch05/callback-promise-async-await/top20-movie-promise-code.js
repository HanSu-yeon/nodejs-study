//현재 상영 영화 순위를 20위까지 프로미스를 사용해 확인하기

const axios = require('axios'); //axios 임포트
//1. 영화 순위 정보 URL
const url = 'https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json';

axios
  .get(url) //2. GET 요청
  .then(result => {
    //결괏값 처리
    if (result.status != 200) {
      //상태가 200이 아니면 에러
      throw new Error('요청에 실패했다');
    }

    if (result.data) {
      //result.data가 있으면 결과 반환
      return result.data;
    }

    throw new Error('데이터 없다'); //data 없으면 에러
  })
  .then(data => {
    //4에서는 3에서 받은 데이터 처리
    if (!data.articleList || data.articleList.size == 0) {
      //5. 크기가 0이면 에러
      throw new Error('데이터가 없다');
    }
    return data.articleList; //6. 영화 리스트 반환
  })
  //받은 데이터를 보기 편하게 가공
  .then(articles => {
    //7. 영화 리스트를 제목과 순위 정보로 분리하여 다시 리스트로 저장
    return articles.map((article, idx) => {
      return { title: article.title, rank: idx + 1 };
    });
  })
  .then(results => {
    for (let movieInfo of results) {
      //받은 영화 리스트 정보 출력
      console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    }
  })
  .catch(err => {
    //8. 중간에 발생한 에러들을 여기서 처리
    console.log('<<에러 발생>>');
    console.error(err);
  });
