import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import RegisterDetails from "./pages/RegisterDetails.jsx";
import Home from "./pages/Home.jsx";
import TodosPage from "./pages/TodosPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import AlbomsPage from "./pages/AlbomsPage.jsx";
import AlbomPage from "./pages/AlbomPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "register/details", element: <RegisterDetails /> },
      { path: "home", element: <Home /> },
      { path: "info", element: <Home showInfo={true} /> }, // popin gérée dans Home
      { path: "todos", element: <TodosPage /> },
      { path: "posts", element: <PostsPage /> },
      { path: "albums", element: <AlbomsPage /> },
      { path: "albums/:id", element: <AlbomPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
