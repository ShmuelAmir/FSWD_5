import { useState } from "react";

import Button from "./ui/Button";
import { deletePhoto, updatePhoto } from "../api/photos";

export default function Photo({ photo, refetch }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(photo.title);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    await updatePhoto(photo.id, { title });
    setEdit(false);
    refetch();
  };

  const handleDelete = async () => {
    await deletePhoto(photo.id);
    refetch();
  };

  const handelCancel = () => {
    setEdit(false);
    setTitle(photo.body);
  };

  return (
    <div style={{ position: "relative" }} className="photo-card">
      <div className="comment-actions icon-overlay">
        <Button
          text={edit ? "💾" : "✏️"}
          handleClick={edit ? handleSave : handleEdit}
          className="btn-icon"
          title={edit ? "Save" : "Edit"}
          style={{ backgroundColor: "white", borderRadius: "50%" }}
        />
        <Button
          text={edit ? "❌" : "🗑️"}
          handleClick={edit ? handelCancel : handleDelete}
          className="btn-icon"
          title={edit ? "Cancel" : "Delete"}
          style={{ backgroundColor: "white", borderRadius: "50%" }}
        />
      </div>
      <img
        src={photo.url}
        alt={photo.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: 0,
          right: 0,
          margin: 0,
          padding: "0.5rem",
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          textAlign: "center",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        {edit ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
        ) : (
          <p>{photo.title}</p>
        )}
      </div>
    </div>
  );
}
