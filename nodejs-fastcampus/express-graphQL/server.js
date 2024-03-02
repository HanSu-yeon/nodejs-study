const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { loadFilesSync } = require('@graphql-tools/load-files');

const app = express();

//모든 폴더안에서 graphql인 것을 가져와라
const loadFiles = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const schema = makeExecutableSchema({
  typeDefs: loadFiles,
});

//rootValue 생성
const root = {
  posts: require('./posts/posts.model'),
  comments: require('./comments/comments.model'),
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //graphiql 설정
  })
);

const port = 4000;
app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});
