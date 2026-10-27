import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      setError("");

      const response = await fetch(
        "http://localhost:5789/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch expenses");
      }

      setExpenses(data.expenses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `http://localhost:5789/api/expenses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete expense");
      }

      setMessage("Expense deleted successfully!");

      await fetchExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  if (loading) {
    return <h2>Loading expenses...</h2>;
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {/* Page heading */}
        <div className="page-header">
          <div>
            <h1>All Expenses 📋</h1>
            <p>Manage, review and track all your transactions.</p>
          </div>

          <Link to="/expenses/add" className="add-expense-link">
            + Add Expense
          </Link>
        </div>

        {/* Summary cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <p>💰 Total Expenses</p>
            <h2>₹{total.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}</h2>
          </div>

          <div className="summary-card">
            <p>🧾 Total Records</p>
            <h2>{expenses.length}</h2>
          </div>
        </div>

        {/* Status messages */}
        {message && (
          <div className="success-banner">
            {message}
          </div>
        )}

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {/* Expense table */}
        <section className="content-card expense-list-card">
          <div className="section-heading">
            <div>
              <h2>Expense Records</h2>
              <p>Your complete transaction history.</p>
            </div>

            <span className="record-count">
              {expenses.length} records
            </span>
          </div>

          {expenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💸</div>
              <h3>No expenses yet</h3>
              <p>Start tracking your spending by adding your first expense.</p>

              <Link to="/expenses/add" className="add-expense-link">
                + Add Your First Expense
              </Link>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td className="expense-title">
                        {expense.title}
                      </td>

                      <td>
                        <span className="category-badge">
                          {expense.category}
                        </span>
                      </td>

                      <td className="expense-amount">
                        ₹{Number(expense.amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      <td>{expense.paymentMethod}</td>

                      <td>
                        {expense.date
                          ? new Date(expense.date).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>

                      <td>{expense.description || "—"}</td>

                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              navigate(`/expenses/${expense._id}/edit`)
                            }
                          >
                            ✏️ Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() => handleDelete(expense._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ExpenseList;