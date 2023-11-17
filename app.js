const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const kappaleRouter = require('./controllers/kappaleet')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

console.log('Yhdistetään, ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('Yhdistetty tietokantaan')
	})
	.catch((error) => {
		console.log('Virhe yhdistäessä tietokantaan: ', error.message)
	})

app.use(cors())
app.use(express.json())

app.use(middleware.errorHandler)

app.use('/api/kappaleet', kappaleRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.listen(config.PORT, () => {
	console.log(`Serveri pyörii portissa: ${config.PORT}`)
})

app.use(middleware.unknownEndpoint)
app.use(middleware.requestLogger)

module.exports = app
