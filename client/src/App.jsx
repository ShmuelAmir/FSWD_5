import { RouterProvider } from "react-router";

import { router } from "./router";
import "./index.css";
import "./App.css";

export default function App() {
  return <RouterProvider router={router} />;
}
