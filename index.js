require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const v1Routes = require('./v1/routes/index')

const app = express()

mongoose
	.connect(process.env.MONGO_CONN_URL)
	.then(() => {
		console.log('Portfolio Project-1 Database Connected...')
	})
	.catch(err => {
		console.log('Portfolio Project-1 Database Connection Failed...')
		console.log(err)
	})

app.use(express.json())

app.listen(process.env.PORT, () => {
	console.log(`Server Listening on port ${process.env.PORT}...`)
})

app.use('/v1/users', v1Routes.userRouter)
app.use('/v1/expenses', v1Routes.expenseRouter)
