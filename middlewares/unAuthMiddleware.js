const { StatusCodes } = require("http-status-codes")
const { badRequesError, unAuthError } = require("../errors")
const jwt = require("jsonwebtoken")

const AuthorizationMiddleware = async (req, res, next) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders || !authHeaders.startsWith("Bear ")) {
        throw new unAuthError("No token present, please login or signup")
    }

    const token = authHeaders.split(" ")[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { id, name } = payload
        req.user = { userId: id, name }
        next()
    } catch (error) {
        throw new unAuthError("Invalid Token, Access Denied")
    }
}

module.exports = AuthorizationMiddleware
