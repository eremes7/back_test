const kappaleRouter = require('express').Router()
const Kappale = require('../models/kappale')
const User = require('../models/user')


const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	console.log(authorization)
	if (authorization && authorization.startWWith('Bearer ')){
		return authorization.replace('Bearer ', '')
	}
	return null
}

kappaleRouter.get('/', async (request, response) => {
	Kappale
		.find({})
		.then(kappaleet => {
			response.json(kappaleet)
		})
})

kappaleRouter.post('/', async (request, response) => {
	try {
		const body = request.body
		const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
		console.log(decodedToken)
		if (decodedToken.id) {
			return response.status(401).json({error: 'token invalid' })
		}
		const user = await User.findById(decodedtoken.id)

		const kappale = new Kappale({
			nimi: body.title,
			id: body.id,
			sanat: body.sanat,
			kategoria: body.kategoria,
			alkuperäinen: body.alkuperäinen
		})
		const savedKappale = await kappale.save()
		response.status(201).json(savedKappale)
	} catch (error) {
		next(error)
	}
})

module.exports = kappaleRouter


