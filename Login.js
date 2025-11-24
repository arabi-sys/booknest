import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// IMPORT CSS
import "./otm.css";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // REGISTER STATE
  const [registerMode, setRegisterMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [registerError, setRegisterError] = useState("");

  // Toggle Forms
  const toggleMode = () => {
    setRegisterMode((prev) => !prev);
    setLoginError("");
    setRegisterError("");
    setLoginEmail("");
    setLoginPassword("");
    setFirstName("");
    setLastName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRepeatPassword("");
    setPhone("");
  };

  // LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault();
    const ok = login(loginEmail, loginPassword);

    if (ok) {
      navigate("/");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  // REGISTER HANDLER
  const handleRegister = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !registerEmail || !registerPassword || !repeatPassword) {
      setRegisterError("All fields except phone are required.");
      return;
    }

    if (registerPassword !== repeatPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    const ok = register({
      firstName,
      lastName,
      email: registerEmail,
      password: registerPassword,
      phone
    });

    if (ok) {
      navigate("/");
      setRegisterMode(false);
    } else {
      setRegisterError("Email already exists.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {registerMode ? "Create an Account" : "Login to Your Account"}
      </h2>

      {/* REGISTER MODE */}
      {registerMode ? (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone (optional)</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {registerError && <div className="form-error">{registerError}</div>}

          <button type="submit" className="form-btn">Register</button>

          <p className="form-link" onClick={toggleMode}>
            Already have an account? Login
          </p>
        </form>
      ) : (
        /* LOGIN MODE */
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          {loginError && <div className="form-error">{loginError}</div>}

          <button type="submit" className="form-btn">Login</button>

          <p className="form-link" onClick={toggleMode}>
            Don't have an account? Register
          </p>

          <p className="form-link">Forgot password?</p>
        </form>
      )}
    </div>
  );
}