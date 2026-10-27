const express = require("express");
const mongoose = require("mongoose");
const ExpenseRoutes = require("./app/routes/ExpenseRoutes");
const UserRoutes = require("./app/routes/UserRoutes");
const cors = require("cors");


const app = express();

const PORT = 5789;

// Middleware to read JSON data
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Expense Tracker API is running!");
});

app.use("/api/expenses", ExpenseRoutes);


//userroute
app.use("/api/users", UserRoutes); 

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/expenseTrackerDB")
    .then(() => {
        console.log("MongoDB connected successfully!");

        // Start server only after database connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });