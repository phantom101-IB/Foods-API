const { StatusCodes } = require("http-status-codes")

const notFoundMiddleware = async (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Route not found" })
}

module.exports = notFoundMiddleware
