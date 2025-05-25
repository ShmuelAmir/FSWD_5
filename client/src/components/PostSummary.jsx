import { Link } from "react-router";

export default function PostSummary({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <p className="post-id">#{post.id}</p>
      <h3 className="post-title">{post.title}</h3>
    </Link>
  );
}
