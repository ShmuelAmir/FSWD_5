import { fetchComments } from "../api/comments";
import { useQuery } from "../hooks/useQuery";
import Comment from "./Comment";

export default function Comments() {
  const { data, error, status } = useQuery(fetchComments);

  if (status === "loading") {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
