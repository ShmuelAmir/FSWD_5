import { useQuery } from "../hooks/useQuery";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import Comment from "./Comment";

export default function Comments() {
  const { data, error, isLoading } = useQuery("comments");

  if (isLoading) {
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
