const commentsModel = require('./comments.model');
module.exports = {
  Query: {
    comments: () => {
      return commentsModel.getAllComments();
    },
  },
};
