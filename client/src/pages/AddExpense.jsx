import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function AddExpense() {
const navigate = useNavigate();
const token = localStorage.getItem("token");

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
title: "",
amount: "",
category: "",
paymentMethod: "Cash",
date: new Date().toISOString().split("T")[0],
description: "",
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setLoading(true);


try {
  const response = await fetch("http://localhost:5789/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...form,
      amount: Number(form.amount),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add expense");
  }

  alert("Expense added successfully!");
  navigate("/expenses");
} catch (err) {
  setError(err.message || "Something went wrong. Please try again.");
} finally {
  setLoading(false);
}


};

if (!token) {
navigate("/login");
return null;
}

return ( <main className="add-expense-page"> <section className="add-expense-card"> <header className="add-expense-header"> <div className="add-expense-icon">＋</div>


      <div>
        <h1>Add New Expense</h1>
        <p>Record and keep track of your spending.</p>
      </div>
    </header>

    <form className="add-expense-form" onSubmit={handleSubmit}>
      <div className="expense-field">
        <label htmlFor="title">Expense Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Grocery shopping"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="expense-field">
        <label htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="e.g. 500"
          value={form.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="expense-field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {[
            "Food",
            "Transport",
            "Shopping",
            "Bills",
            "Education",
            "Health",
            "Entertainment",
            "Other",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="expense-field">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          required
        >
          {["Cash", "UPI", "Card", "Bank Transfer"].map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div className="expense-field">
        <label htmlFor="date">Expense Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="expense-field expense-description">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          placeholder="Add any additional details..."
          value={form.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      {error && (
        <p className="expense-error" role="alert">
          {error}
        </p>
      )}

      <div className="expense-form-actions">
        <button
          className="save-expense-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving Expense..." : "Save Expense"}
        </button>

        <Link className="cancel-expense-btn" to="/expenses">
          Cancel
        </Link>
      </div>
    </form>

    <footer className="add-expense-footer">
      Your expenses, organized in one place.
    </footer>
  </section>
</main>


);
}

export default AddExpense;
