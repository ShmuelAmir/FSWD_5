import { useState } from "react";

import { deleteComment, updateComment } from "../api/comments";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";

export default function Comment({ comment, refetch }) {
  const { userId } = useAuth();

  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState(comment.body);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    updateComment(comment.id, { body });
    setEdit(false);
    refetch();
  };

  const handleDelete = () => {
    deleteComment(comment.id);
    refetch();
  };

  const handelCancel = () => {
    setEdit(false);
    setBody(comment.body);
  };

  return (
    <div className="comment-card">
      {edit ? (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="comment-edit-input"
        ></textarea>
      ) : (
        <>
          <p className="comment-body">{comment.body}</p>
          <p className="comment-user">
            {comment.user.name} {comment.user.username}
          </p>
        </>
      )}
      {userId === comment.userId && (
        <div className="comment-actions">
          <Button
            text={edit ? "💾" : "✏️"}
            handleClick={edit ? handleSave : handleEdit}
            className="btn-icon"
            title={edit ? "Save" : "Edit"}
          />
          <Button
            text={edit ? "❌" : "🗑️"}
            handleClick={edit ? handelCancel : handleDelete}
            className="btn-icon"
            title={edit ? "Cancel" : "Delete"}
          />
        </div>
      )}
    </div>
  );
}
