import { useState } from "react";

export default function TodoRow({ todo, onToggle, onDelete, onEdit }) {
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
            <input value={draft} onChange={(e) => setDraft(e.target.value)} />
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
