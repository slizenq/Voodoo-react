/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import search from "../../img/search.svg";
import cart from "../../img/cart.svg";
import user_logo from "./../../img/user-logo.png";
import Logo from "./Logo";
import check from "../../img/check.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResults from "./SearchResults/SearchResults";

const Header = ({ user, onLogout }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Обработчик клика вне элементов
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target))
        closeSearch();
      if (profileRef.current && !profileRef.current.contains(event.target))
        setIsProfileOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setSearchError(null);
      try {
        const params = {
          query: searchQuery,
        };
        if (selectedCategory) {
          params.category = selectedCategory;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/search`,
          { params }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Ошибка при поиске:", error);
        setSearchError("Ошибка при поиске");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory]);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery("");
      setSearchResults([]);
      setSelectedCategory("");
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeSearch();
  };

  const closeSearch = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedCategory("");
  };

  const addSearchResult = (result) => {
    navigate(`/product/${result.id_device}`);
    closeSearch();
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    onLogout();
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__content wrap">
        <nav className="nav">
          <Link to="/">
            <Logo />
          </Link>
          <ul className="nav__list">
            <li className="nav-list__item">
              <Link to={`/`}>Продукты</Link>
            </li>
            <li className="nav-list__item">
              <Link
                to="#"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                Категории{" "}
                <img
                  src={check}
                  alt="check"
                  className={`${isCategoriesOpen ? "rotate-180" : ""}`}
                />
              </Link>
              {isCategoriesOpen && (
                <ul className="sub-categories">
                  {categories.map((category) => (
                    <li key={category.name} className="sub-categories__item">
                      <Link
                        to={`/categories/${category.slug}/products`}
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        {category.name} ({category.count})
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
          <div className="nav__right-section">
            <div className="nav__container" ref={searchRef}>
              <div
                className={`nav__search ${
                  isSearchActive ? "nav__search_active" : ""
                }`}
              >
                <img
                  onClick={toggleSearch}
                  src={search}
                  alt="поиск"
                  className="search-icon"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Поиск товаров..."
                  className="search-input"
                />
                {isSearchActive && searchQuery && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchQuery("")}
                    aria-label="Очистить поиск"
                  >
                    ×
                  </button>
                )}
              </div>
              <Link to={"/basket"}>
                <img src={cart} alt="корзина" className="cart-icon" />
              </Link>
            </div>

            <div className="profile-container" ref={profileRef}>
              {user ? (
                <>
                  <div className="profile-icon" onClick={toggleProfile}>
                    <img src={user_logo} alt="logo" />
                  </div>
                  {isProfileOpen && (
                    <div className="profile-dropdown">
                      <div className="profile-info">
                        <p className="profile-name">{user.username}</p>
                        <p className="profile-email">{user.email}</p>
                      </div>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="dropdown-item"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Админ панель
                        </Link>
                      )}
                      <button
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        Выйти
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/auth" className="login-btn">
                  Войти
                </Link>
              )}
            </div>
          </div>
        </nav>
        {isSearchActive && (
          <div className="search-container">
            <div className="category-filter-container">
              <p className="category-filter">Поиск по всем категориям</p>
            </div>
            <SearchResults
              searchQuery={searchQuery}
              searchResults={searchResults}
              isLoading={isLoading}
              error={searchError}
              addSearchResult={addSearchResult}
              selectedCategory={selectedCategory}
              categories={categories}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
