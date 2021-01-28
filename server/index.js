const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const cors = require('cors')

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

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', require('./routes/users'))
app.use('/api/product', require('./routes/product'))

app.use('/uploads', express.static('uploads'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
})
