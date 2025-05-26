import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { createUser } from "../api/users";

export default function RegisterDetails({ username, password }) {
  const navigate = useNavigate();
  const { setUserId } = useAuth();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = await createUser({
      username,
      website: password,
      name: fullname,
      email,
      phone,
    });

    setUserId(userId);
    navigate("/home");
  };

  return (
    <div className="auth-card">
      <h2>Complete your profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullname"
          placeholder="Full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Create my account</button>
      </form>
    </div>
  );
}
