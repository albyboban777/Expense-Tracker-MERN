const ExpenseModel = require("../models/ExpenseModel");

// CREATE an expense
const createExpense = async (req, res) => {
    try {
        const expense = await ExpenseModel.create({
            ...req.body,
            user: req.userId
        });

        res.status(201).json({
            message: "Expense created successfully!",
            expense
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create expense",
            error: error.message
        });
    }
};

// READ all expenses belonging to the logged-in user
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseModel.find({
            user: req.userId
        });

        res.status(200).json({
            message: "Expenses fetched successfully!",
            count: expenses.length,
            expenses
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message
        });
    }
};

// READ one expense belonging to the logged-in user
const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await ExpenseModel.findOne({
            _id: id,
            user: req.userId
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense fetched successfully!",
            expense
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to fetch expense",
            error: error.message
        });
    }
};

// UPDATE an expense belonging to the logged-in user
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;

        // Do not allow changing ownership through the request body
        const { user, _id, ...updateData } = req.body;

        const updatedExpense = await ExpenseModel.findOneAndUpdate(
            {
                _id: id,
                user: req.userId
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense updated successfully!",
            expense: updatedExpense
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update expense",
            error: error.message
        });
    }
};

// DELETE an expense belonging to the logged-in user
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedExpense = await ExpenseModel.findOneAndDelete({
            _id: id,
            user: req.userId
        });

        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully!",
            expense: deletedExpense
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete expense",
            error: error.message
        });
    }
};

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};