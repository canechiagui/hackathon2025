interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search locations..."
        onChange={handleInputChange}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default Search;
