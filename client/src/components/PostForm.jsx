import { useState } from "react";

import Button from "./ui/Button";

export default function PostForm({ onSubmit, initialValues }) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [body, setBody] = useState(initialValues?.body || "");

  const handleSubmit = () => {
    if (title && body) {
      onSubmit(title, body);
    }
  };

  return (
    <div className="card">
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          placeholder="Body"
          rows={10}
        ></textarea>
        {/* <Button
          text="Submit"
          className="btn-primary"
          style={{ alignSelf: "flex-end" }}
        /> */}
      </form>
    </div>
  );
}
