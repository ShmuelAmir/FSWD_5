import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> |{" "}
        <Link to="/">Home</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
