import { useState } from "react";

import { useQuery } from "../hooks/useQuery";
import RegisterDetails from "../components/RegisterDetails";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [details, setDetails] = useState(false);

  const { data: users, error: usersError } = useQuery("users");

  if (usersError) {
    return <ErrorMessage error={usersError} />;
  }

  const showDetailsScreen = () => {
    setDetails(true);
  };

  return (
    <div className="auth-container">
      {details ? (
        <RegisterDetails username={username} password={password} />
      ) : (
        <RegisterForm
          users={users}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSuccess={showDetailsScreen}
        />
      )}
    </div>
  );
}
