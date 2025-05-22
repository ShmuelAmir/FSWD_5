
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Mot de passe
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");


    if (username === "admin" && password === "admin") {
      alert("Login successful!");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }

    // Stocke l'utilisateur connecté
    localStorage.setItem("user", JSON.stringify(userOk));
    navigate("/home");
  };

  return (
    <div>

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Pas de compte?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Inscris-toi
        </span>
      </p>
    </div>
  );
}
