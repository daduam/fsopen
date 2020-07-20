const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const result = await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    // TODO: Need to check against undefined likes
    likes: body.likes
  }

  const opts = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, opts)
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
