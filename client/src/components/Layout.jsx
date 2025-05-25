import { Outlet, Navigate, Link, useLocation } from "react-router";

import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";

const pages = ["home", "todos", "posts", "albums"];

export default function Layout() {
  const { userId, setUserId, userQuery } = useAuth();
  const location = useLocation();
  const { data: user } = userQuery;

  if (!userId) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    setUserId(undefined);
  };

  const isActive = (path) => {
    return location.pathname.includes(path) ? "active" : "";
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <nav className="main-nav">
          <div className="container">
            <ul className="nav-links">
              {pages.map((page) => (
                <li key={page}>
                  <Link to={`/${page}`} className={isActive(page)}>
                    {page.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              {user && (
                <div className="user-avatar">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.id}`}
                    alt="User avatar"
                    className="avatar-image"
                  />
                </div>
              )}
              <Button
                text="Logout"
                handleClick={handleLogout}
                className="btn-primary"
              />
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
