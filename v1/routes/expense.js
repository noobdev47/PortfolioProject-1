const express = require('express')
const mongoose = require('mongoose')
const Expense = require('../../models/Expense')
const CustomError = require('../../utils/CustomError')
const catchAsyncError = require('../../utils/catchAsyncError')
// const { getValidator } = require('../validators/get')
const { errorFormatter } = require('../../utils/errorFormatter')

const router = express.Router()

router.get('/', async function (req, res) {
	const expenses = await Expense.find({})

	res.status(200).send(expenses)
})

router.post(
	'/',
	catchAsyncError(async function (req, res) {
		const { title, description, price, paid } = req.body

		const tempExpense = new Expense({
			paid: paid,
			price: price,
			title: title,
			description: description,
		})

		await tempExpense.save()

		res.status(200).send({ message: 'Expense Added!!!' })
	})
)

router.get(
	'/:id',
	catchAsyncError(async function (req, res) {
		const { id } = req.params

		if (!mongoose.isObjectIdOrHexString(id))
			throw new CustomError("Expense doesn't exist", 400)

		const tempExpense = await Expense.findById(id)

		if (tempExpense === null)
			throw new CustomError("Expense doesn't exist", 404)

		res.status(200).send(tempExpense)
	})
)

router.delete(
	'/:id',
	catchAsyncError(async function (req, res) {
		const { id } = req.params

		if (!mongoose.isObjectIdOrHexString(id))
			throw new CustomError("Expense doesn't exist", 400)

		await Expense.findByIdAndDelete(id)

		res.status(204).send()
	})
)

router.put(
	'/:id',
	catchAsyncError(async function (req, res) {
		const { id } = req.params

		if (!mongoose.isObjectIdOrHexString(id))
			throw new CustomError("Expense doesn't exist", 400)

		const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
			new: true,
		})

		res.status(200).send(updatedExpense)
	})
)

router.all('*', (req, res, next) => {
	next(new CustomError('Endpoint Not Found...', 404))
})

router.use((err, req, res, next) => {
	if (err.name === 'ValidationError') errorFormatter(err)

	next(err)
})

router.use((err, req, res, next) => {
	const { statusCode = 500, message = 'Something went wrong' } = err
	res.status(statusCode).send(message)
})

module.exports = router
