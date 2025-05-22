import { Outlet, Navigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

export default function Layout() {
  const [user] = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
