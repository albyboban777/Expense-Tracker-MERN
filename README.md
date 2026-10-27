# Personal Expense Tracker

A full-stack MERN application to manage personal expenses securely.
Users can register, log in, and manage their expenses through a dashboard.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- JWT Authentication
- bcryptjs
- React Router
- CSS

## Features

- User Registration and Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected APIs
- User-specific expense records
- Add, View, Edit, and Delete expenses
- Expense listing table
- Dashboard with total expense calculation
- Expense count
- Loading indicators and error messages
- Responsive user interface

## Project Structure

```text
ExpenseTracker/
├── server/
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── README.md