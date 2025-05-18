export default function PostSummary({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.id}</p>
    </div>
  );
}
