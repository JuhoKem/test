const blogsRouter = require('express').Router()
const Blog = require('./models/blog')

// getin parametrina voi olla pelkkä "/" eikä "/api/blogs" koska app.js:ssa
// tulee määrittely app.use('/api/notes', blogsRouter)
blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = blogsRouter