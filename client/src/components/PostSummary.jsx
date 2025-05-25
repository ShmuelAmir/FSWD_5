import { Link } from "react-router";

export default function PostSummary({ post }) {
  return (
    <div>
      <Link to={`/posts/${post.id}`}>
        <p>{post.id}</p>
        <h3>{post.title}</h3>
      </Link>
    </div>
  );
}
