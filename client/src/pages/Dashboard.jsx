import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchExpenses = async () => {
      try {
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

    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>💰 Expense Tracker</h2>

        <nav>
          <Link to="/dashboard" className="active">
            📊 Dashboard
          </Link>

          <Link to="/expenses">
            📋 Expenses
          </Link>

          <Link to="/expenses/add">
            ➕ Add Expense
          </Link>

          <a
            href="/login"
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
            }}
          >
            🚪 Logout
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your expense overview.</p>
          </div>

          <Link to="/expenses/add">
            <button>+ Add Expense</button>
          </Link>
        </header>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* SUMMARY CARDS */}
        <section className="summary-grid">
          <div className="summary-card">
            <p>💰 Total Expenses</p>
            <h2>₹{totalExpense.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}</h2>
          </div>

          <div className="summary-card">
            <p>🧾 Total Records</p>
            <h2>{expenses.length}</h2>
          </div>
        </section>

        {/* RECENT EXPENSES */}
        <section className="content-card">
          <div className="page-header">
            <div>
              <h2>Recent Expenses</h2>
              <p>Your latest recorded transactions.</p>
            </div>

            <Link to="/expenses">View All →</Link>
          </div>

          {loading ? (
            <p>Loading expenses...</p>
          ) : expenses.length === 0 ? (
            <div>
              <p>No expenses recorded yet.</p>
              <Link to="/expenses/add">
                <button>Add Your First Expense</button>
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentExpenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>{expense.title}</td>
                      <td>{expense.category}</td>
                      <td>
                        ₹{Number(expense.amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        {expense.date
                          ? new Date(expense.date).toLocaleDateString("en-IN")
                          : "N/A"}
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

export default Dashboard;