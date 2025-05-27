import { useState } from "react";
import Button from "./ui/Button";

export default function PhotoForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      onSubmit(title, url);
    }
  };

  return (
    <div className="card">
      <h3>Add Album</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="Url"
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
