const Food = require("../models/foodModels")
const foods = require("../foods.json")
const { StatusCodes } = require("http-status-codes")
const { badRequesError } = require("../errors")

const getAllJobs = async (req, res) => {
    // const { userId, name } = req.user
    // const { id: jobId } = req.params

    const {
        user: { userId },
        params: { id: jobId },
    } = req
    const food = await Food.find({})
    if (food.length < 1) {
        throw new badRequesError("No Foods available")
    }
    res.status(StatusCodes.OK).json({ food })
}

const getJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: foodId },
    } = req
    const food = await Food.findById({ createdBy: userId, _id: foodId })
    if (food.length < 0) {
        throw new badRequesError(`No job available for id: ${foodId}`)
    }
    res.status(StatusCodes.OK).json({ food })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId

    const food = await Food.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ food })
}

const updateJob = async (req, res) => {
    const {
        user: { userId },
        body: body,
        params: { id: jobId },
    } = req
    const food = await Food.findByIdAndUpdate(
        { createdBy: userId, _id: jobId },
        req.body,
        { new: true, runValidators: true }
    )
    if (food.length < 1) {
        throw new badRequesError("Failed to Update job")
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req
    const job = await Food.findByIdAndDelete({ createdBy: userId, _id: jobId })
    res.status(StatusCodes.OK).json({ msg: "Food deleted Successful" })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}
