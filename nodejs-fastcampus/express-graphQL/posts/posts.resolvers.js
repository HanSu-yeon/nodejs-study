const postsModel = require('./posts.model');

module.exports = {
  Query: {
    posts: async () => {
      return postsModel.getAllPosts();
    },
  },
};
