import { createBrowserRouter } from "react-router";

import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserInfo from "./components/UserInfo.jsx";
import Home from "./pages/Home.jsx";
import TodosPage from "./pages/TodosPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import AlbumsPage from "./pages/AlbumsPage.jsx";
import AlbomPage from "./pages/AlbumPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
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
        path: "Albums",
        children: [
          { index: true, element: <AlbumsPage /> },
          { path: ":id", element: <AlbomPage /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "*", element: <NotFoundPage /> },
]);
