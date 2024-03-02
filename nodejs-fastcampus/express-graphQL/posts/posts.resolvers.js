module.exports = {
  Query: {
    posts: async (parent, args, context, info) => {
      // console.log('parent> ', parent);
      // console.log('args> ', args);
      // console.log('context> ', context);
      // console.log('info> ', info);
      return parent.posts;
    },
  },
};
