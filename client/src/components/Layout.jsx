import { Outlet, Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Layout() {
  const [user] = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

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
