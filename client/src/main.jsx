import React from "react";
import ReactDOM from "react-dom/client";

// Import du router de React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import du composant principal et des pages
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

// Définition des routes
const router = createBrowserRouter([
  {
    path: "/",             // Route principale
    element: <App />,      // Le composant App sert de layout général (avec nav)
    children: [
      { path: "login", element: <Login /> },         // /login
      { path: "register", element: <Register /> },   // /register
      { path: "home", element: <Home /> },           // /home
    ],
  },
]);

// Rendu de l'application avec le router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
