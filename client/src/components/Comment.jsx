import { useState } from "react";

import { deleteComment, updateComment } from "../api/comments";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";

export default function Comment({ comment }) {
  const { userId } = useAuth();

  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState(comment.body);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    updateComment(comment.id, { body });
  };

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  return (
    <div>
      {/* name of the commenter by comment.userId */}
      {edit ? (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      ) : (
        <p>{comment.body}</p>
      )}
      {userId === comment.userId && (
        <div>
          <Button
            text={edit ? "save" : "edit"}
            handleClick={edit ? handleSave : handleEdit}
          />
          <Button text="delete" handleClick={handleDelete} />
        </div>
      )}
    </div>
  );
}
