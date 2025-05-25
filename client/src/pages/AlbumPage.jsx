import { useParams } from "react-router-dom";

export default function AlbomPage() {
  const { id } = useParams();
  return <div>Album #{id}</div>;
}
