import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cherche l'utilisateur dans localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Bienvenue, {user.fullname || user.username || user.name}!</h2>
      <nav style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
        <Link to="/info">Info</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/albums">Albums</Link>
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </button>
      </nav>
      {/* Ici tu mets tes sous-pages */}
    </div>
  );
}
