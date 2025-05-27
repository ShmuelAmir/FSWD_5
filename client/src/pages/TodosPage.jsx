import { useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { useQuery } from "../hooks/useQuery";
import { createTodo, updateTodo, deleteTodo, getTodosUrl } from "../api/todos";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import TodoRow from "../components/TodoRow";

export default function TodosPage() {
  const { userId } = useAuth();

  const [newTitle, setNewTitle] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const {
    data: todos,
    status,
    error,
    refetch,
  } = useQuery(getTodosUrl(userId, search, sortBy), !userId);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createTodo({ userId, title: newTitle, completed: false });
    setNewTitle("");
    refetch();
  };
  const toggleTodo = async (todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
    refetch();
  };
  const deleteSingle = async (id) => {
    await deleteTodo(id);
    refetch();
  };
  const editTitle = async (todo, text) => {
    await updateTodo(todo.id, { title: text });
    refetch();
  };

  if (status === "loading") return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>User's Todos</h2>
      <Link to="/home">← Back</Link>

      <form onSubmit={addTodo} style={{ margin: "1em 0" }}>
        <input
          placeholder="New task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">Sort by ID</option>
          <option value="title">Sort by title</option>
          <option value="status">Sort by status</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo)}
              onDelete={() => deleteSingle(todo.id)}
              onEdit={editTitle}
            />
          ))}
        </tbody>
      </table>
      {todos?.length === 0 && <p>No tasks found.</p>}
    </div>
  );
}
