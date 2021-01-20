const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  cart: {
    type: Array,
    default: [],
  },
})

userSchema.pre('save', function (next) {
  let user = this

  if (user.isModified('password')) {
    bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => {
        user.password = hash
        next()
      })
      .catch(err => next(err))
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function (pw) {
  return bcrypt
    .compare(pw, this.password)
    .then(isMatch => isMatch)
    .catch(err => err)
}

userSchema.methods.generateToken = function () {
  let user = this
  const token = jwt.sign(user._id.toHexString(), 'secret')
  user.token = token
  return user
    .save()
    .then(user => user)
    .catch(err => err)
}

userSchema.statics.findByToken = function (token) {
  console.log('token', token)
  let user = this
  //토큰 decode하기
  return jwt.verify(token, 'secret', function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then(user => user)
      .catch(err => err)
  })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
