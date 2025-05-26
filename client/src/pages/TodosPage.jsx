// src/pages/TodosPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useQuery, useQueryClient } from "../hooks/useQuery";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todos";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function TodosPage() {
  const [userId] = useAuth();
  const queryClient = useQueryClient();

  const [newTitle, setNewTitle] = useState("");
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [sortBy, setSortBy] = useState("id");

  // 1) charger
  const {
    data: todos = [],
    status,
    error,
  } = useQuery(
    () => fetchTodos(userId),
    ["todos", userId],
    { enabled: !!userId }
  );

  // 2) CRUD + invalidation cache
  const addTodo = async e => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createTodo({ userId, title: newTitle, completed: false });
    setNewTitle("");
    queryClient.invalidateQueries(["todos", userId]);
  };
  const toggleTodo = async todo => {
    await updateTodo(todo.id, { ...todo, completed: !todo.completed });
    queryClient.invalidateQueries(["todos", userId]);
  };
  const deleteSingle = async id => {
    await deleteTodo(id);
    queryClient.invalidateQueries(["todos", userId]);
  };
  const editTitle = async (todo, text) => {
    await updateTodo(todo.id, { ...todo, title: text });
    queryClient.invalidateQueries(["todos", userId]);
  };

  // 3) recherche & tri en mémoire
  const filtered = todos.filter(t => {
    if (!search) return true;
    const v = search.toLowerCase();
    if (searchField === "id") return String(t.id).includes(v);
    if (searchField === "title") return t.title.toLowerCase().includes(v);
    if (searchField === "status")
      return (t.completed ? "done" : "not done").includes(v);
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "id") return a.id - b.id;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "status")
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    return 0;
  });

  if (status === "loading") return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>Todos de l’utilisateur</h2>
      <Link to="/home">← Retour</Link>

      <form onSubmit={addTodo} style={{ margin: "1em 0" }}>
        <input
          placeholder="Nouvelle tâche…"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

      <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
        <select value={searchField} onChange={e => setSearchField(e.target.value)}>
          <option value="id">Recherche par ID</option>
          <option value="title">Recherche par titre</option>
          <option value="status">Recherche par statut</option>
        </select>
        <input
          placeholder="Recherche…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="id">Trier par ID</option>
          <option value="title">Trier par titre</option>
          <option value="status">Trier par statut</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(todo => (
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
      {sorted.length === 0 && <p>Aucune tâche trouvée.</p>}
    </div>
  );
}

function TodoRow({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const save = () => {
    onEdit(todo, draft.trim() || todo.title);
    setEditing(false);
  };
  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        {editing ? (
          <>
            <input value={draft} onChange={e => setDraft(e.target.value)} />
            <button onClick={save}>✔︎</button>
            <button onClick={() => setEditing(false)}>✕</button>
          </>
        ) : (
          <>
            {todo.title}
            <button onClick={() => setEditing(true)}>✎</button>
          </>
        )}
      </td>
      <td>
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        {todo.completed ? " Done" : " Not done"}
      </td>
      <td>
        <button onClick={onDelete}>🗑</button>
      </td>
    </tr>
  );
}
