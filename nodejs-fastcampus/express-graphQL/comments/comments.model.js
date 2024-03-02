const comments = [
  {
    id: 'comment1',
    text: 'It is a first comment',
    likes: 1,
  },
  {
    id: 'comment2',
    text: 'It is a first comment',
    likes: 5,
  },
];

function getAllComments() {
  return comments;
}

function getCommentsByLikes(minLikes) {
  return comments.filter(commnet => {
    return commnet.likes >= minLikes;
  });
}
module.exports = {
  getAllComments,
  getCommentsByLikes,
};
