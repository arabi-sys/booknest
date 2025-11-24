import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserManagement() {
  const {
    users,
    removeUser,
    promoteUser,
    addUserByAdmin,
    currentUser,
  } = useAuth();

  const navigate = useNavigate();

  // Protect the page so only admins can view it
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Form State for Adding User
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  // Prevent admin from removing themselves
  const canRemove = (userId) => currentUser && userId !== currentUser.id;

  // Handle Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setAddError("All fields except role are required.");
      setAddSuccess("");
      return;
    }
    const ok = addUserByAdmin({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    if (ok) {
      setAddSuccess("User added!");
      setAddError("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("user");
    } else {
      setAddError("User with this email already exists.");
      setAddSuccess("");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">User Management</h2>
      <div className="row mb-5">
        <div className="col-md-8 mx-auto">
          <h4>Add New User</h4>
          <form onSubmit={handleAddUser} className="mb-4">
            <div className="row mb-2">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label me-2">Role:</label>
              <select
                className="form-select w-auto d-inline"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {addSuccess && (
              <div className="alert alert-success py-2">{addSuccess}</div>
            )}
            {addError && (
              <div className="alert alert-danger py-2">{addError}</div>
            )}
            <button type="submit" className="btn btn-primary mt-2">
              Add User
            </button>
          </form>
        </div>
      </div>
      <h4 className="mb-3">All Users</h4>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Promote</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={
                      u.role === "admin" ? "fw-bold text-danger" : ""
                    }
                  >
                    {u.role}
                  </span>
                </td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => promoteUser(u.id)}
                    >
                      Promote to Admin
                    </button>
                  )}
                </td>
                <td>
                  {canRemove(u.id) ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeUser(u.id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <span className="text-muted">Current User</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}