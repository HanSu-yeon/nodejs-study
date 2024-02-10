const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const saltRounds = 10;
userSchema.pre('save', function (next) {
  let user = this;
  //pw변경될 때만
  if (user.isModified('password')) {
    //salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hashedPassword) {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
      });
    });
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // bcrypt compare 비교
  //plain password => client, this.password => 데이터베이스에 있는 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//model 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
