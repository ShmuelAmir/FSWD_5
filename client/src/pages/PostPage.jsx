import AddComment from "../components/AddComment";
import Comments from "../components/Comments";
import Post from "../components/Post";

export default function PostPage() {
  return (
    <div>
      <Post />
      <Comments />
      <AddComment />
    </div>
  );
}
