import { Outlet, Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Layout() {
  const navigate = useNavigate();
  const [user] = useAuth();

  if (!user) {
    navigate("/login");
  }

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/alboms">Alboms</Link>
            </li>
          </ul>
        </nav>
        {/* TODO: add user avatar with info link and logout button */}
        <div>User avatar</div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
