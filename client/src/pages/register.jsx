import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Exemple fictif : tu ajoutes une vraie logique d'inscription plus tard
    if (username && password.length >= 4) {
      setSuccess("Inscription réussie ! Connecte-toi maintenant.");
      setUsername("");
      setPassword("");
    } else {
      setError("Choisis un pseudo et un mot de passe d'au moins 4 caractères.");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nom d'utilisateur :
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mot de passe :
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
