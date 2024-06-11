const mongoose = require("mongoose")

const FoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 100,
            required: [true, "Food name is required"],
        },
        price: {
            type: String,
            maxlength: 20,
            required: [true, "price must be provided"],
        },
        category: {
            type: String,
            maxlength: 30,
            required: [true, "Category must be provided"],
        },
        image: {
            type: String,
            required: [true, "Category must be provided"],
        },
        wait: {
            type: String,
            maxlength: 20,
        },
        createdBy: {
            type: String,
            maxlength: 40,
            required: [true, "created by is required"],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Foods", FoodSchema)
