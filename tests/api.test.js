const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'remes',
      name: 'remes',
      password: 'eremes',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('Liian lyhyet salasanat hylätään', async () => {
    
    const newUser = {
      username: 'remes',
      name: 'remes',
      password: 'remes',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
  })
})

describe('Kappaleita käsiteltäessä', () => {
 
  test('Kappaleiden hakeminen onnistuu', async () => {
    const kappaleet = await helper.kappaleetInDb()

    await api
      .get('/api/kappaleet')
      .expect(200)

    
    expect(kappaleet).toBeDefined()
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})
