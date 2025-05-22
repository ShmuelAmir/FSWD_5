import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/home">Home</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
