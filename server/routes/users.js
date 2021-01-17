const express = require('express')
const router = express.Router()
const { User } = require('../models/User')

router.post('/register', (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then(() => {
      return res.status(200).json({ success: true })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
