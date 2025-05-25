import { getPostCommentsUrl } from "../api/posts";
import { useQuery } from "../hooks/useQuery";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import Comment from "./Comment";

export default function Comments({ postId }) {
  const { data, error, isLoading } = useQuery(getPostCommentsUrl(postId));

  if (isLoading || !data) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      {data.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
