import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock orders just for stats demo; in a real app, fetch from backend or context
const mockOrders = [
  { userId: 2, amount: 26.98 },
  { userId: 1, amount: 49.9 },
  { userId: 3, amount: 7.99 },
  { userId: 2, amount: 12.99 },
];

export default function AdminDashboard() {
  const { users, currentUser } = useAuth();
  const navigate = useNavigate();

  // Protect the page so only admins can view it
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Stats Computation
  const ordersCount = mockOrders.length;
  const salesTotal = mockOrders.reduce((acc, order) => acc + order.amount, 0);
  const userCount = users.length;
  const adminCount = users.filter(u => u.role === "admin").length;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h5>Orders</h5>
              <p className="display-6 mb-0">{ordersCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h5>Total Sales</h5>
              <p className="display-6 mb-0">${salesTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h5>Registered Users</h5>
              <p className="display-6 mb-0">{userCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h5>Admins</h5>
              <p className="display-6 mb-0">{adminCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-10 mx-auto mt-5">
        <h4>Recent Orders (mock)</h4>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{order.userId}</td>
                <td>${order.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}