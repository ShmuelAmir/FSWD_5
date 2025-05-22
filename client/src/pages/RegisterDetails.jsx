import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterDetails() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Récupère l'utilisateur temporaire stocké par register.jsx
    const tempUser = JSON.parse(localStorage.getItem("registerUser") || "{}");
    const newUser = { ...tempUser, fullname, email };

    // Récupère tous les users déjà créés
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Vérifie unicité du username
    if (users.some(u => u.username === newUser.username)) {
      alert("Ce nom d'utilisateur existe déjà.");
      return;
    }

    // Ajoute le nouvel utilisateur
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Connecte le nouvel utilisateur
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.removeItem("registerUser");
    navigate("/home");
  };

  return (
    <div>
      <h2>Complète ton profil</h2>
      <form onSubmit={handleSubmit} autoComplete="on">
        <input
          name="fullname"
          placeholder="Nom complet"
          value={fullname}
          onChange={e => setFullname(e.target.value)}
          required
          autoComplete="name"
        /><br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
        /><br />
        <button type="submit">Créer mon compte</button>
      </form>
    </div>
  );
}
