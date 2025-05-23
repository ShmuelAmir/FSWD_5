import { Outlet, Navigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

export default function Layout() {
  const [userId] = useAuth();

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
