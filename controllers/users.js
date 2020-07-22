const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    })
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const { body } = req
  const blog = (await Blog.find({}))[0]

  if (!(body.password && body.password.length >= 3)) {
    return res.status(400).json({ error: 'password should be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    blogs: [blog._id],
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
