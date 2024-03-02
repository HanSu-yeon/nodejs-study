module.exports = {
  Query: {
    comments: async parent => {
      return parent.comments;
    },
  },
};
