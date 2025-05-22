import { createBrowserRouter } from "react-router";

import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserInfo from "./pages/UserInfo.jsx";
import Home from "./pages/Home.jsx";
import TodosPage from "./pages/TodosPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import AlbomsPage from "./pages/AlbomsPage.jsx";
import AlbomPage from "./pages/AlbomPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "info", element: <UserInfo /> },
      { path: "todos", element: <TodosPage /> },
      {
        path: "posts",
        children: [
          { index: true, element: <PostsPage /> },
          { path: ":id", element: <PostPage /> },
        ],
      },
      {
        path: "Alboms",
        children: [
          { index: true, element: <AlbomsPage /> },
          { path: ":id", element: <AlbomPage /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);
