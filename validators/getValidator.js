const CustomError = require('../utils/CustomError')

function idValidator(id) {
	if (id.length < 12) throw new CustomError("Expense doesn't exist", 404)
}

module.exports = { idValidator }
