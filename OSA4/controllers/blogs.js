const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// getin parametrina voi olla pelkkä "/" eikä "/api/blogs" koska app.js:ssa
// tulee määrittely app.use('/api/notes', blogsRouter)

// GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('blogs')

    response.json(blogs)

})
  
// POST
// async ja awaitista enemmän blog_api.test.js
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //const newBlog = new Blog(request.body)
    console.log('BODY:', body);

    const user = await User.findById(body.userId)
    console.log('USER:', user);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
  })
  
    const savedBlogs = await blog.save()
    user.blogs = user.blogs.concat(savedBlogs._id)
    
    response.status(201).json(result)
    
})

// DELETE
blogsRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    //.catch(error => next(error))
})

// PUT
blogsRouter.put('/:id', async (request, response) => {

  const upDated = {
    "title": "Putin",
    "author": "Trump",
    "url": "www.updated.com",
    "likes": 1111111
  }

  await Blog.findByIdAndUpdate(request.params.id, upDated)

    response.json(await Blog.find({}))

    //.catch(error => next(error))
})

module.exports = blogsRouter