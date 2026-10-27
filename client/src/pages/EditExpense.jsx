import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "Cash",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadExpense = async () => {
      try {
        const response = await fetch(
          `http://localhost:5789/api/expenses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load expense");
        }

        const expense = data.expense || data;

        setForm({
          title: expense.title || "",
          amount: String(expense.amount ?? ""),
          category: expense.category || "",
          paymentMethod: expense.paymentMethod || "Cash",
          date: expense.date
            ? new Date(expense.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          description: expense.description || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExpense();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5789/api/expenses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            amount: Number(form.amount),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update expense");
      }

      alert("Expense updated successfully!");
      navigate("/expenses");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <h2>Loading expense...</h2>;
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Edit Expense ✏️</h1>
            <p>Update the details of your transaction.</p>
          </div>

          <Link to="/expenses" className="secondary-link">
            ← Back to Expenses
          </Link>
        </div>

        <section className="content-card expense-form-card">
          <h2>Expense Details</h2>
          <p>Modify the information below and save your changes.</p>

          <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="title">Expense Title</label>
                <input
                  id="title"
                  name="title"
                  placeholder="e.g. Grocery shopping"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
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

              <div className="form-field">
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

              <div className="form-field">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Add some details about this expense..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
              <button type="submit">Save Changes</button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/expenses")}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default EditExpense;