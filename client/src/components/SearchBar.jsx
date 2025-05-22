export default function SearchBar({ searchValue, setSearchValue }) {
  return (
    <div>
      <input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
