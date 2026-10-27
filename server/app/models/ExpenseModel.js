const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0.01
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    paymentMethod: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    }

}, {
    timestamps: true
})

const ExpenseModel = mongoose.model("Expense", expenseSchema);

module.exports = ExpenseModel;