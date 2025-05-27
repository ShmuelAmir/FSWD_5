import Summary from "./Summary";

export default function List({ items, baseUrl }) {
  return (
    <div className="list-container">
      {items?.map((item) => (
        <Summary key={item.id} item={item} baseUrl={baseUrl} />
      ))}
    </div>
  );
}
