const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
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

const localStrategyConfig = new LocalStrategy(
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
);

passport.use('local', localStrategyConfig);

const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('profile', profile);

      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = new User();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;
        await user.save();
        done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
);
passport.use('google', googleStrategyConfig);

const kakaoStrategyConfig = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: '/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ kakakoId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = new User();
        user.kakakoId = profile.id;
        user.email = profile._json.kakao_account.email;
        console.log(profile);
        await user.save();
        done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
);

passport.use('kakao', kakaoStrategyConfig);
