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

const User = mongoose.model('User', userSchema)

module.exports = { User }
