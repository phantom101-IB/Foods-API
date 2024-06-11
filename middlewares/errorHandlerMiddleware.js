const { StatusCodes } = require("http-status-codes")
const { CustomError } = require("../errors")

const errorHandlerMiddleware = async (err, req, res, next) => {
    const customeError = {
        msg: err.message,
        statusCode: err.statusCode,
    }

    if (err.code && err.code === 11000) {
        customeError.msg = `User with Email: ${err.keyValue["email"]} already exist`
        customeError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.name === "CastError") {
        customeError.statusCode = StatusCodes.BAD_REQUEST
        customeError.msg === `Item with id: ${err.value._id} not Found`
    }

    if (err.name === "ValidatorError") {
        customeError.statusCode = StatusCodes.BAD_REQUEST
        customeError.msg ===
            Object.values(err.errors)
                .map((error) => error.message)
                .join(",")
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    // return res
    //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
    //     .json({ msg: "Something went wrong, try again later" })
    return res.status(customeError.statusCode).json({ msg: customeError.msg })

    next()
}

module.exports = errorHandlerMiddleware
