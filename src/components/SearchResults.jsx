import React from "react";

const SearchResults = ({
  searchQuery,
  searchResults,
  isLoading,
  error,
  addSearchResult,
}) => {
  if (!searchQuery) {
    return (
      <div className="search-results-container">
        <div className="search-message">Начните вводить название товара</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="search-results-container">
        <div className="search-message">Поиск...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-container">
        <div className="search-message error">{error}</div>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="search-results-container">
        <div className="search-message">Ничего не найдено</div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-results-list">
        {searchResults.map((result) => (
          <div
            key={result.id_device}
            className="search-result-item"
            onClick={() => addSearchResult(result)}
          >
            <div className="search-result-image">
              <img src={result.link_image} alt={result.name} />
            </div>
            <div className="search-result-info">
              <h4 className="search-result-title">{result.name}</h4>
              <p className="search-result-price">{result.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
