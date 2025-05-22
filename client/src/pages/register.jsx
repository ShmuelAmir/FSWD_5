import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EXISTING_USERS = [
  { username: "hanna" },
  { username: "george" },
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
    if (EXISTING_USERS.find(u => u.username === username)) {
      setError("Nom d'utilisateur déjà pris.");
      return;
    }
    if (password !== verify) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!username || !password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    localStorage.setItem("registerUser", JSON.stringify({ username, password }));
    navigate("/register/details");
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required /><br />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /><br />
        <input placeholder="Password (verify)" type="password" value={verify} onChange={e=>setVerify(e.target.value)} required /><br />
        <button type="submit">Suivant</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
