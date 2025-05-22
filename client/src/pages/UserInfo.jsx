import React from "react";

export default function UserInfo() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="user-info-card">
      <h3>Mes informations</h3>
      <p><b>Nom complet:</b> {user.fullname || "-"}</p>
      <p><b>Email:</b> {user.email || "-"}</p>
      <p><b>Nom d'utilisateur:</b> {user.username}</p>
    </div>
  );
}
