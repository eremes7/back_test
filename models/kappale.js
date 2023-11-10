const mongoose = require('mongoose')

const kappaleSchema = mongoose.Schema({
	nimi: String,
	alkuperäinen: String,
	id: Number,
	kategoria: String,
	sanat: String
})

kappaleSchema.set('toJson', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})



module.exports = mongoose.model('Kappale', kappaleSchema)
