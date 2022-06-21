const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Title of expense is required.'],
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
	},
})

const User = mongoose.model('User', userSchema)

module.exports = User
