import { Link } from "react-router-dom";

export default function AlbomsPage() {
  // Exemple albums mockés
  const albums = [{id: 1, title: "Voyage"}, {id: 2, title: "Famille"}];
  return (
    <div>
      <h3>Mes albums</h3>
      <ul>
        {albums.map(a => (
          <li key={a.id}>
            <Link to={`/albums/${a.id}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
