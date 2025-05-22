import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) return null; // tu peux mettre un loader ici si tu veux

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {user.fullname || user.username}!</h2>
      <nav style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
        <Link to="/info">Info</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/albums">Albums</Link>
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
      </nav>
      {/* Ici s'affichera le contenu de chaque sous-page */}
      <Outlet />
    </div>
  );
}
