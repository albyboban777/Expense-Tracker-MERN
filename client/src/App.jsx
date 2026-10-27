import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/expenses/add" element={<AddExpense />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />

        <Route path="*" element={<Navigate to="/expenses" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;