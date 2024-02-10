function checkAuthenticated(req, res, next) {
  //req.isAuthenticated(): passport에서 제공
  if (req.isAuthenticated()) {
    //로그인한 사람이면
    return next();
  }
  //그렇지 않으면
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  //로그인된 사람은 메인페이지로 리다이렉트
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  //그렇지 않으면 로그인페이지 들어갈 수 있게 해줌
  next();
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};
