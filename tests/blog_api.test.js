const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./api_test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get route tests', () => {
  test('blogs are returned as json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of blogs is named id', async () => {
    const res = await api.get('/api/blogs')

    for (let blog of res.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('post route tests', () => {
  test('blog with valid data is created successfully', async () => {
    const newBlog = {
      title: 'Collaborating On Git Projects - Cloning The Repo',
      author: 'Joseph Ampadu',
      url: 'https://lucid.blog/daduam/post/collaborating-on-git-projects-cloning-the-repo-bd7',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).toContain(
      'https://lucid.blog/daduam/post/collaborating-on-git-projects-cloning-the-repo-bd7'
    )
  })

  test('undefined likes property defaults to 0', async () => {
    const newBlog = {
      title: 'Collaborating On Git Projects - Cloning The Repo',
      author: 'Joseph Ampadu',
      url: 'https://lucid.blog/daduam/post/collaborating-on-git-projects-cloning-the-repo-bd7',
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(savedBlog.body.likes).toBeDefined()
    expect(savedBlog.body.likes).toBe(0)
  })

  test('post with no title and url returns status code 400', async () => {
    const newBlog = {
      author: 'Joseph Ampadu',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('delete route tests', () => {
  test('deletion of a blog succeds with 204', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})

// TODO: tests for put route

afterAll(() => {
  mongoose.connection.close()
})
