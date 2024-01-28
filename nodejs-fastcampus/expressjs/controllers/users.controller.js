const userModel = require('../models/users.model');

function getUsers(req, res) {
  res.send(userModel);
}

function getUser(req, res) {
  const userId = Number(req.params.userId);
  const user = userModel[userId];
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
}

function postUser(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Missing user name',
    });
  }

  const newUser = {
    name: req.body.name,
    id: userModel.length,
  };
  userModel.push(newUser);
  res.json(Users);
}

module.exports = {
  getUsers,
  getUser,
  postUser,
};
