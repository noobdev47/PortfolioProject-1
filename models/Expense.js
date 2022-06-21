const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title of expense is required.'],
	},
	description: {
		type: String,
	},
	amount: {
		type: Number,
		required: [true, 'Amount of expense is required.'],
		min: [1, 'Amount is required'],
	},
	paid: {
		type: Boolean,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
