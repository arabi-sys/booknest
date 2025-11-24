import React, { createContext, useState, useContext } from "react";

// Example initial users
const initialUsers = [
  {
    id: 1,
    firstName: "Admin",
    lastName: "User",
    email: "admin@bookstore.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "user123",
    role: "user"
  }
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // All users in the system
  const [users, setUsers] = useState(initialUsers);
  // Currently logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Login function: checks credentials
  function login(email, password) {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    } else {
      return false;
    }
  }

  // Logout function
  function logout() {
    setCurrentUser(null);
  }

  // Register function: checks email uniqueness
  function register(userData) {
    const exists = users.some((u) => u.email === userData.email);
    if (exists) return false;
    const newUser = {
      ...userData,
      id: Date.now(),
      role: "user"
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  }

  // Promote user to admin
  function promoteUser(id) {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, role: "admin" } : user
      )
    );
  }

  // Remove user
  function removeUser(id) {
    // Remove from users; if logged-in user is removed, logout
    setUsers(users => users.filter(user => user.id !== id));
    if (currentUser && currentUser.id === id) setCurrentUser(null);
  }

  // Add user (by admin)
  function addUserByAdmin(newUser) {
    const exists = users.some((u) => u.email === newUser.email);
    if (exists) return false;
    const user = {
      ...newUser,
      id: Date.now(),
      role: newUser.role || "user"
    };
    setUsers([...users, user]);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        login,
        logout,
        register,
        promoteUser,
        removeUser,
        addUserByAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}