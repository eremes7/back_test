const kappaleRouter = require('express').Router()
const Kappale = require('../models/kappale')

kappaleRouter.get('/', async (request, response) => {
	Kappale
		.find({})
		.then(kappaleet => {
			response.json(kappaleet)
		})
})



kappaleRouter.post('/', async (request, response) => {
  const body = request.body
  const kappale = new Kappale({
    nimi: body.title,
		id: body.id,
		sanat: body.sanat,
		kategoria: body.kategoria,
		alkuperäinen: body.alkuperäinen
  })
	const savedKappale = await kappale.save()
	response.status(201).json(savedKappale)
  })

module.exports = kappaleRouter


