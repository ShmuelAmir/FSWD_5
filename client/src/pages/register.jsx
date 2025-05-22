import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Default users (hardcoded, like "server" users)
const USERS = [
  { username: "hanna", website: "test123", fullname: "Hanna Levi" },
  { username: "george", website: "azerty", fullname: "George Smith" }
];

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (password !== verify) {
      setError("Passwords do not match.");
      return;
    }

    // Check if username already exists in USERS (hardcoded)
    if (USERS.find(u => u.username === username)) {
      setError("Username already exists.");
      return;
    }

    // Check if username already exists in localStorage users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username)) {
      setError("Username already exists.");
      return;
    }

    // If all OK, save user temporarily for details step
    const tempUser = { username, password };
    localStorage.setItem("registerUser", JSON.stringify(tempUser));
    navigate("/register/details");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="on">
        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoComplete="username"
        /><br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        /><br />
        <input
          name="verify"
          placeholder="Confirm password"
          type="password"
          value={verify}
          onChange={e => setVerify(e.target.value)}
          required
          autoComplete="new-password"
        /><br />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
