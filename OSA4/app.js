const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
//const middleware = require('./utils/middleware')
//const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

//logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')})
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
//app.use(middleware.requestLogger)

app.use('/api/notes', blogsRouter)

//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)

module.exports = app