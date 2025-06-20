import { Link } from "react-router-dom";
import "./index.css";

const SearchResults = ({
  searchQuery,
  searchResults,
  isLoading,
  error,
  addSearchResult,
  selectedCategory,
  categories,
}) => {
  if (isLoading) return <div className="search-results">Загрузка...</div>;
  if (error) return <div className="search-results error">{error}</div>;
  if (!searchQuery) return null;

  const handleCardClick = (result, e) => {
    if (e.target.closest(".category-badge")) {
      e.preventDefault();
      return;
    }
    addSearchResult(result);
  };

  return (
    <div className="search-results">
      {searchResults.length === 0 ? (
        <div className="no-results">
          Ничего не найдено по запросу "{searchQuery}"
          {selectedCategory && ` в категории "${selectedCategory}"`}
        </div>
      ) : (
        <>
          <div className="results-header">
            <h3>
              Результаты поиска: "{searchQuery}"
              {selectedCategory && ` в категории "${selectedCategory}"`}
            </h3>
          </div>
          <ul className="results-list">
            {searchResults.map((result) => {
              const itemCategory = categories.find(
                (c) => c.slug === result.category
              );

              return (
                <Link
                  to={
                    itemCategory
                      ? `/categories/${itemCategory.slug}/products`
                      : "#"
                  }
                  className="result-link"
                  onClick={(e) => handleCardClick(result, e)}
                >
                  <li key={result.id}>
                    <div>
                      <h4>{result.name}</h4>
                      <p>{result.price} ₽</p>
                      {itemCategory && (
                        <span
                          className="category-badge"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          {itemCategory.name}
                        </span>
                      )}
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResults;
