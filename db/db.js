const mongoose = require("mongoose")

const connectDB = (url) => {
    return mongoose.connect(url, {
        // newUrlParser: true,
        // useFinfAndModify: false,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
    })
}

module.exports = connectDB
