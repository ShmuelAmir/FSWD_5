import { useState } from "react";
import { useParams } from "react-router";

import { getPostUrl } from "../api/posts";
import { useQuery } from "../hooks/useQuery";
import AddComment from "../components/AddComment";
import Comments from "../components/Comments";
import Post from "../components/Post";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { createComment } from "../api/comments";

export default function PostPage() {
  const { userId } = useAuth();
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery(getPostUrl(id), !id);

  const [show, setShow] = useState(true);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const toggleShow = () => {
    setShow((p) => !p);
  };

  const addComment = (body) => {
    createComment({ postId: id, userId, body });
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-layout">
          <div className="post-section">
            {data && <Post post={data} refetch={refetch} />}
          </div>
          <div className="comments-section">
            <div className="comments-header">
              <h3>Comments</h3>
              <Button
                text={show ? "Hide comments" : "Show comments"}
                handleClick={toggleShow}
                className="btn-secondary"
              />
            </div>
            {show && (
              <div>
                <Comments postId={id} />
                <AddComment handleAdd={addComment} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
