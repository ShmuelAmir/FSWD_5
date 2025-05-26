import PostSummary from "./PostSummary";

export default function PostsList({ posts }) {
  return (
    <div className="posts-container">
      {posts?.map((post) => (
        <PostSummary key={post.id} post={post} />
      ))}
    </div>
  );
}
