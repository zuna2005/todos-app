# 📝 React TODOs App

A simple and responsive TODOs application built with React, featuring authentication, role-based access (User/Admin), and CRUD operations for todos. 

## Features

- **User Authentication**: Login required to access the app.
- **Todos Management**:
  - View todos or only the current user's todos via tabs.
  - Add new todos.
  - Edit existing todos.
  - Delete todos.
- **Role-based Permissions**:
  - Regular users can update and delete *only* their own todos.
  - Admin users can update and delete *all* todos.
- **Admin Privileges**:
  - Access a dedicated page to view the list of all users.

## Technology Stack

- **Frontend**:
  - React with React Router for client-side routing.
  - React Hook Form for form management.
  - Bootstrap for responsive UI styling.
  - Redux Toolkit for state management.
  - Axios for API communication.
- **Backend**:
  - API provided (not included in this repository).

## Application Structure

- **Login Page**: Secure login form for user authentication.
- **Main Page**: Displays todos with two tabs:
  - **All Todos**: Shows all todos (admin only for edit/delete).
  - **My Todos**: Shows todos created by the logged-in user.
- **Users Page**: Visible only to admin users; lists all registered users.

## 🔧 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/zuna2005/todos-app.git
cd todos-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

