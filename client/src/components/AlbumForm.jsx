import { useState } from "react";

import Button from "./ui/Button";

export default function AlbumForm({ onSubmit }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onSubmit(title);
    }
  };

  return (
    <div className="card">
      <h2>Add Album</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
        />
        <Button
          text="Submit"
          className="btn-primary"
          style={{ alignSelf: "flex-end" }}
        />
      </form>
    </div>
  );
}
