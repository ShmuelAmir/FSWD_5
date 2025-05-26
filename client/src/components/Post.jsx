import { useState } from "react";
import { useNavigate } from "react-router";

import Button from "./ui/Button";
import { deletePost, updatePost } from "../api/posts";
import PostForm from "./PostForm";

export default function Post({ post, refetch }) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = (title, body) => {
    updatePost(post.id, { title, body });
    refetch();
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/posts");
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <div className="post-card">
      <div className="post-id">#{post.id}</div>
      {edit ? (
        <PostForm
          onSubmit={handleSave}
          initialValues={{ title: post.title, body: post.body }}
        />
      ) : (
        <>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
        </>
      )}
      <div className="post-actions">
        <Button
          text={edit ? "Save" : "Edit"}
          handleClick={edit ? handleSave : handleEdit}
          className={edit ? "btn-primary" : "btn-secondary"}
        />
        <Button
          text={edit ? "Cancel" : "Delete"}
          handleClick={edit ? handleCancel : handleDelete}
          className={edit ? "btn-secondary" : "btn-danger"}
        />
      </div>
    </div>
  );
}
