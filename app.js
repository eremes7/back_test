const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const kappaleRouter = require('./controllers/kappaleet')

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



console.log('prööt')


app.use('/api/kappaleet', kappaleRouter)

const Kappale = require('./models/kappale')

const newKappale = new Kappale({
	nimi: "pröötbiisi",
	id: 101,
	alkuperäinen: "pröörprööt",
	sanat: "pröötsis, pröötsis, pröööööt",
	kategoria: "Isänmaa"
})
const axios = require('axios')
axios.post('http://localhost:3003/api/kappaleet', newKappale)
  .then(response => {
    console.log('Vastaus palvelimelta:', response.data);
  })
  .catch(error => {
    console.error('Virhe POST-pyynnössä:', error);
  });

app.listen(config.PORT, () => {
		console.log(`Serveri pyörii portissa: ${config.PORT}`)
  })

module.exports = app
