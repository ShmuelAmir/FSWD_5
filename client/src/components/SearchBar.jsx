export default function SearchBar({ searchValue, setSearchValue }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search posts..."
      />
    </div>
  );
}
