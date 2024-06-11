const CustomError = require("./Custom-Err")
const { StatusCodes } = require("http-status-codes")

class Bad_Request_error extends CustomError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = Bad_Request_error
