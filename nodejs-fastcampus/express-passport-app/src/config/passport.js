const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;

//req.login(user) -> 세션 데이터 생성
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//client => session data => request
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user); //req.user=user;
  });
});

//어떠한 전략을  사용하겠다
passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    //done을 호출하면 /login의 passport.authenticate('local', ()=>{})여기서 콜백함수 부분을 호출하는 것
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLocaleLowerCase() });

        if (!user) {
          return done(null, false, { message: `Email ${email} not found` });
        }

        user.comparePassword(password, (err, isMatch) => {
          //err나면
          if (err) return done(err);

          //pw이 맞으면
          if (isMatch) {
            return done(null, user);
          }
          //pw 틀리면
          return done(null, false, { msg: 'Invalid email or password' });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
