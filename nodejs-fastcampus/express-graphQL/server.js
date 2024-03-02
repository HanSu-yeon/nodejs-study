const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const { ApolloServer } = require('@apollo/server');
const cors = require('cors');
const { json } = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');
const app = express();

//모든 폴더안에서 graphql인 것을 가져와라
const loadFiles = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const loadedResolvers = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: loadFiles,
    resolvers: loadedResolvers,
  });

  //스키마를 아폴로 서버에 넣어줌
  //이 아폴로 서버 객체에는 들어오는 graphql 요청을 처리하는 모든 미들웨어와 로직이 포함되어 있습니다.
  const server = new ApolloServer({
    schema,
  });
  //아폴로 서버가 시작될 때까지 기다립니다.
  await server.start();

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.header.token }),
    })
  );
  const port = 4000;

  app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
  });
}

startApolloServer();
