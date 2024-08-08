import React from "react";
import "../searchinput/SearchInput.css";
function Search({ onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className="form_search "
      type="text"
      placeholder="Поиск..."
      onChange={handleInputChange}
    />
  );
}

export default Search;
