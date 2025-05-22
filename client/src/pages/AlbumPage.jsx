import { useParams } from "react-router";

export default function AlbomPage() {
  const { id } = useParams();
  return <div>Album #{id}</div>;
}
