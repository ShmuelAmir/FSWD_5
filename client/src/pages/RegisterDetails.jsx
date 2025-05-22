import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterDetails() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Retrieve the temporary user from register step
    const tempUser = JSON.parse(localStorage.getItem("registerUser") || "{}");
    if (!tempUser.username || !tempUser.password) {
      setError("Missing registration step.");
      navigate("/register");
      return;
    }
    const newUser = { ...tempUser, fullname, email };

    // Retrieve all existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Double-check username uniqueness (safety)
    if (users.find(u => u.username === newUser.username)) {
      setError("This username is already registered.");
      return;
    }

    // Add the new user to the array and save
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Log in the new user and clean temp
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.removeItem("registerUser");
    navigate("/home");
  };

  return (
    <div>
      <h2>Complete your profile</h2>
      <form onSubmit={handleSubmit} autoComplete="on">
        <input
          name="fullname"
          placeholder="Full name"
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
        <button type="submit">Create my account</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
