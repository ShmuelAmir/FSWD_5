import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  { username: "admin", password: "admin", fullname: "Administrator" }
  // You can add more default users here if needed
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Get all users created and saved in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 1. Check if the user is in the default USERS array
    const userOk =
      USERS.find(
        (u) => u.username === username && u.password === password
      )
      // 2. Or in users from localStorage (password field)
      || users.find(
        (u) => u.username === username && u.password === password
      );

    if (!userOk) {
      setError("Invalid username or password.");
      return;
    }

    // Store the logged-in user
    localStorage.setItem("user", JSON.stringify(userOk));
    navigate("/home");
  };

  return (
    <div>
      <h2>Login</h2>
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
          autoComplete="current-password"
        /><br />
        <button type="submit">Sign in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
}
