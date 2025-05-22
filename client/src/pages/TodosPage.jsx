import React, { useEffect, useState } from "react";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("id");
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("id");
  const [newTitle, setNewTitle] = useState("");
  const [user, setUser] = useState(null);

  // Load user and todos from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "null");
    setUser(userData);
    if (userData) {
      const allTodos = JSON.parse(localStorage.getItem("todos") || "{}");
      setTodos(allTodos[userData.username] || []);
    }
  }, []);

  // Helper: save todos for current user
  const saveTodos = (newTodos) => {
    const allTodos = JSON.parse(localStorage.getItem("todos") || "{}");
    allTodos[user.username] = newTodos;
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setTodos(newTodos);
  };

  // Add new todo
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const id = Date.now();
    const newTodo = { id, title: newTitle, done: false };
    saveTodos([...todos, newTodo]);
    setNewTitle("");
  };

  // Delete todo
  const handleDelete = (id) => {
    saveTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle done
  const handleToggle = (id) => {
    saveTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // Edit title
  const handleEdit = (id, newTitle) => {
    saveTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  };

  // Sort & filter
  const filtered = todos.filter(todo => {
    if (!search) return true;
    if (searchField === "id") return String(todo.id).includes(search);
    if (searchField === "title") return todo.title.toLowerCase().includes(search.toLowerCase());
    if (searchField === "done") return (todo.done ? "done" : "not done").includes(search.toLowerCase());
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "id") return a.id - b.id;
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "done") return (a.done === b.done ? 0 : a.done ? 1 : -1);
    return 0;
  });

  if (!user) return <div>Please login.</div>;

  return (
    <div>
      <h2>Todos for {user.fullname || user.username}</h2>

      <form onSubmit={handleAdd} style={{marginBottom:8}}>
        <input
          placeholder="Add new todo..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <div style={{marginBottom:8}}>
        <select value={searchField} onChange={e => setSearchField(e.target.value)}>
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="done">Status</option>
        </select>
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{marginLeft:6}}
        />
        <span style={{marginLeft:12}}>Sort by:</span>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{marginLeft:4}}>
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="done">Status</option>
        </select>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(todo =>
            <TodoRow key={todo.id} todo={todo}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          )}
        </tbody>
      </table>
      {sorted.length === 0 && <p>No todos found.</p>}
    </div>
  );
}

// Composant pour chaque ligne Todo (éditable)
function TodoRow({ todo, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const saveEdit = () => {
    onEdit(todo.id, title.trim() || todo.title);
    setEditing(false);
  };

  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        {editing ? (
          <>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <button onClick={saveEdit} style={{marginLeft:4}}>Save</button>
            <button onClick={() => setEditing(false)} style={{marginLeft:2}}>Cancel</button>
          </>
        ) : (
          <>
            {todo.title}
            <button onClick={() => setEditing(true)} style={{marginLeft:6}}>Edit</button>
          </>
        )}
      </td>
      <td>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        {todo.done ? " Done" : " Not done"}
      </td>
      <td>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </td>
    </tr>
  );
}
