import { useState } from "react";

import Button from "./ui/Button";
import { deletePost, updatePost } from "../api/posts";
import PostForm from "./PostForm";

export default function Post({ post }) {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = (title, body) => {
    updatePost(post.id, { title, body });
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  return (
    <div>
      <p>{post.id}</p>
      {edit ? (
        <PostForm onSubmit={handleSave} />
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      )}
      <div>
        <Button
          text={edit ? "save" : "edit"}
          handleClick={edit ? handleSave : handleEdit}
        />
        <Button text="delete" handleClick={handleDelete} />
      </div>
    </div>
  );
}
