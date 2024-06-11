require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

// databases
const connectDB = require("./db/db")

// routers
const router = require("./routes/foodRoute")
const userRouter = require("./routes/userRoute")
// import external middleware
const cors = require("cors")
// importing middlewares
const notFound = require("./middlewares/notFound-middleware")
const errorHandler = require("./middlewares/errorHandlerMiddleware")
const authMiddleware = require("./middlewares/unAuthMiddleware")

// external middleware
app.use(express.json())
app.use(cors)

// routing
app.use("/api/v1/foods", router)
app.use("/api/v1/auth", userRouter)

const port = process.env.PORT || 5000
// middlewares
app.use(errorHandler)
app.use(notFound)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
