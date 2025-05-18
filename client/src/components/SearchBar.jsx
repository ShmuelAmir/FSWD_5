export default function SearchBar({ searchValue, setSearchValue }) {
  return (
    <div>
      <input
        type="search"
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search..."
      />
    </div>
  );
}
