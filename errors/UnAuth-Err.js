const { StatusCodes } = require("http-status-codes")
const CustomError = require("./Custom-Err")

class UnAuthError extends CustomError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthError
