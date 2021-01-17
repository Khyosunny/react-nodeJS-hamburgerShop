const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
const config = require('./config/key')

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', require('./routes/users'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
})
