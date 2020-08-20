const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./api_test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User({
    username: 'oboy',
    name: 'Oboy Twutwum',
    password: 'twubizzy'
  })
  await user.save()
})

describe('creating invalid user', () => {
  test('user with no username', async () => {
    const invalidUser = {
      name: 'Koo Bodei',
      password: 'koobi2cedis'
    }

    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const users = usersAtEnd.map(user => user.name)
    expect(users).not.toContain(invalidUser.name)
  })

  test('user with no password', async () => {
    const invalidUser = {
      username: 'kbold',
      name: 'Koo Bodei',
    }

    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const users = usersAtEnd.map(user => user.username)
    expect(users).not.toContain(invalidUser.username)
  })

  test('username must be at least 3 characters long', async () => {
    const invalidUser = {
      username: 'kb',
      name: 'Koo Bodei',
      password: 'koobi2cedis',
    }

    const usersAtStart = await helper.usersInDb()    

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const users = usersAtEnd.map(user => user.username)
    expect(users).not.toContain(invalidUser.username)
  })

  test('password must be at least 3 characters long', async () => {
    const invalidUser = {
      username: 'kbold',
      name: 'Koo Bodei',
      password: 'ko',
    }

    const usersAtStart = await helper.usersInDb()    

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const users = usersAtEnd.map(user => user.username)
    expect(users).not.toContain(invalidUser.username)
  })

  test('username should be unique', async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      username: usersAtStart[0].username,
      name: 'Koo Bodei',
      password: 'koobi2cedis'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  
      const users = usersAtEnd.map(user => user.name)
      expect(users).not.toContain(invalidUser.name)
  })
})

afterAll(() => {
  mongoose.connection.close()
})