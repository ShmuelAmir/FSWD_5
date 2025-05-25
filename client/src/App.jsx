import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import RegisterDetails from "./pages/RegisterDetails";
import TodosPage from "./pages/TodosPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AlbumsPage from "./pages/AlbumsPage";
import AlbumPage from "./pages/AlbumPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/details" element={<RegisterDetails />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/albums" element={<AlbumsPage />} />
      <Route path="/albums/:id" element={<AlbumPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
