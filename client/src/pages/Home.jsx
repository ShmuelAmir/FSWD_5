import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import UserInfo from "../components/UserInfo";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Home() {
  const [show, setShow] = useState(false);
  const { userQuery } = useAuth();
  const { data: user, isLoading, error } = userQuery;

  if (isLoading || !user) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleToggleShow = () => {
    setShow((p) => !p);
  };

  return (
    <div className="container">
      <h2 className="welcome-title">Welcome, {user.name || user.username}!</h2>
      <Button
        text="Show User Info"
        handleClick={handleToggleShow}
        className="btn-primary"
      />
      {show && <UserInfo user={user} />}
    </div>
  );
}
