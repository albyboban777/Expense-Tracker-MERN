import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-brand">💰 Expense Tracker</h2>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/expenses">
          📋 Expenses
        </NavLink>

        <NavLink to="/expenses/add">
          ➕ Add Expense
        </NavLink>

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;