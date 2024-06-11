const { StatusCodes } = require("http-status-codes")
const User = require("../models/userModels")
const { unAuthError } = require("../errors")

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ name: user.name, token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || password) {
        throw new unAuthError("Invalid Email or Password")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new unAuthError(`No user with email: ${email} found`)
    }
    const correctPassword = await user.comparePassword(password)
    if (!correctPassword) {
        throw new unAuthError("Incorrect Password")
    }
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ name: user.name, token })
}
module.exports = { login, register }
