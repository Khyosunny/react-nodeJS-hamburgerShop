const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const { auth } = require('../middleware/auth')

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
  })
})

router.post('/register', (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch(err => console.log(err))
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: '등록된 회원정보가 없습니다',
      })
    user
      .comparePassword(req.body.password)
      .then(isMatch => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 틀렸습니다',
          })
        user
          .generateToken()
          .then(user => {
            res
              .cookie('x_auth', user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id })
          })
          .catch(err => res.status(400).send(err))
      })
      .catch(err => res.json({ loginSuccess: false, err }))
  })
})

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err })
    res.clearCookie('x_auth')
    return res.status(200).send({
      success: true,
    })
  })
})

router.post('/addToAddress', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        cart: req.body,
      },
    },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err })
      res.status(200).json(user.cart)
    },
  )
})

router.get('/userAddress', auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) return res.status(400).send(err)
    return res.status(200).json(user.cart)
  })
})

router.get('/removeUserAddress', auth, (req, res) => {
  console.log(req)
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pullAll: { cart: req.user.cart },
    },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err })
      res.status(200).json(user.cart)
    },
  )
})

module.exports = router
