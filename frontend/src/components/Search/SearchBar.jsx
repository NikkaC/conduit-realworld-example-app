// src/components/SearchBar.jsx
import { useFeedContext } from "../../context/FeedContext";


function SearchBar() {
  const { searchQuery, setSearch } = useFeedContext();

  return (
    <fieldset className="form-group" style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search articles or authors..."
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
      />
    </fieldset>
  );
}

export default SearchBar;
