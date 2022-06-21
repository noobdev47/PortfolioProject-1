const CustomError = require('../utils/CustomError')

function errorFormatter(err) {
	let tempArr = []

	Object.entries(err.errors).forEach(error => {
		tempArr.push({ name: error[0], message: error[1].message })
	})

	throw new CustomError(tempArr, 400)
}

module.exports = { errorFormatter }
