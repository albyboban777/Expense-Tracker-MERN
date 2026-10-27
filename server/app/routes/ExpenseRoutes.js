const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,
    getExpenseById
} = require("../controllers/ExpenseController");

// Apply authentication to ALL routes below
router.use(authMiddleware);

// Create an expense
router.post("/", createExpense);

// Get all expenses
router.get("/", getAllExpenses);

// Get one expense
router.get("/:id", getExpenseById);

// Update an expense
router.put("/:id", updateExpense);

// Delete an expense
router.delete("/:id", deleteExpense);

module.exports = router;