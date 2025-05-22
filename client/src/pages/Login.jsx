import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  { username: "hanna", website: "test123", fullname: "Hanna Levi" },
  { username: "george", website: "azerty", fullname: "George Smith" }
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Mot de passe
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Récupère tous les users créés
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 1. Cherche dans USERS codés en dur
    const userOk =
      USERS.find(
        (u) => u.username === username && u.website === password
      )
      // 2. OU dans users du localStorage (mot de passe = password)
      || users.find(
        (u) => u.username === username && u.password === password
      );

    if (!userOk) {
      setError("Nom d'utilisateur ou mot de passe invalide.");
      return;
    }

    // Stocke l'utilisateur connecté
    localStorage.setItem("user", JSON.stringify(userOk));
    navigate("/home");
  };

  return (
    <div>
      <h2>Connexion</h2>
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
        <button type="submit">Se connecter</button>
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
