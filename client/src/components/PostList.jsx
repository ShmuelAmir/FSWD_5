import PostSummary from "./PostSummary";

export default function PostsList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostSummary key={post.id} post={post} />
      ))}
    </div>
  );
}
