import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simule un "fetch" users depuis un backend
  // Remplace cette partie par un vrai fetch si besoin !
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    // Exemple avec json-server sur port 3001
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const userOk = users.find(
      (u) => u.username === username && u.website === password
    );

    if (!userOk) {
      setError("Nom d'utilisateur ou mot de passe invalide.");
      return;
    }

    // Stocke l'ID (ou tout l'user) dans localStorage
    localStorage.setItem("user", JSON.stringify(userOk));
    navigate("/home");
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Pas de compte ?{" "}
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
