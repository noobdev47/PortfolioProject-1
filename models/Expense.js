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
})

const Todo = mongoose.model('Expense', expenseSchema)

module.exports = Todo
