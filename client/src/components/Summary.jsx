import { Link } from "react-router";

export default function Summary({ item, baseUrl }) {
  return (
    <Link to={`/${baseUrl}/${item.id}`} className="item-card">
      <p className="item-id">#{item.id}</p>
      <h3 className="item-title">{item.title}</h3>
    </Link>
  );
}
