import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { useQuery } from "../hooks/useQuery";
import Button from "../components/ui/Button";
import UserInfo from "../components/UserInfo";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useAuth();
  const [show, setShow] = useState(false);

  const { data: user, isLoading, error } = useQuery(`users/${userId}`, !userId);

  if (isLoading || !user) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleToggleShow = () => {
    setShow((p) => !p);
  };

  const handleLogout = () => {
    setUserId(undefined);
    navigate("/login");
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/Albums">Albums</Link>
            </li>
          </ul>
        </nav>
        {/* TODO: add user avatar with info link and logout button */}
        <div>User avatar</div>
        <Button text="Logout" handleClick={handleLogout} />
        <Button text="Show User Info" handleClick={handleToggleShow} />
      </header>
      <main>
        <h2>Welcome, {user.name || user.username}!</h2>
        {show && <UserInfo user={user} />}
      </main>
    </div>
  );
}
