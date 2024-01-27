const { default: mongoose } = require('mongoose');
var mongooses = require('mongoose');
var Schema = mongooses.Schema;

//스키마 객체 생성
const personSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true },
});

module.exports = mongoose.model('Person', personSchema); //모델 객체 생성
