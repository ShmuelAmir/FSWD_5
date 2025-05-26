import { useState } from "react";
import { useNavigate } from "react-router";

import { useQuery } from "../hooks/useQuery";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Login() {
  const navigate = useNavigate();
  const { setUserId } = useAuth();

  // TODO: maybe change to useRef
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: users, error: usersError } = useQuery("users");

  if (usersError) {
    return <ErrorMessage error={usersError} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const currentUesr = users.find((u) => u.username === username);

    if (!currentUesr) {
      setError("User not found");
    } else if (currentUesr.website !== password) {
      setError("Wrong Password. Try again.");
    } else {
      setUserId(currentUesr.id);
      navigate("/home");
    }
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
        /><br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <br />
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
