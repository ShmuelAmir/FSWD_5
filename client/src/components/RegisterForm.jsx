import { useState } from "react";
import { useNavigate } from "react-router";

export default function RegisterForm({
  users,
  username,
  setUsername,
  password,
  setPassword,
  onSuccess,
}) {
  const navigate = useNavigate();

  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== verify) {
      setError("Passwords do not match.");
      return;
    }

    if (users.find((u) => u.username === username)) {
      setError("Username already exists.");
      return;
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          name="verify"
          placeholder="Confirm password"
          type="password"
          value={verify}
          onChange={(e) => setVerify(e.target.value)}
          required
        />
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
