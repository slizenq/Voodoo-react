import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProductsPage = ({ addToCart }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const categoryNames = {
    figures: "Эксклюзивные аниме-фигурки",
    clothing: "Аниме-одежда",
    posters: "Постеры",
    plush: "Плюшевые игрушки",
    accessories: "Аксессуары",
    manga: "Манга",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/categories/${category}/products`
        );
        setProducts(response.data);
        setCategoryName(categoryNames[category] || category);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="category-page-container">
      <div className="section-container">
        <div className="section-header">
          <h1>{categoryName}</h1>
          <p className="category-description">
            {products.length > 0
              ? "Найдите идеальный товар среди нашей подборки"
              : "Мы работаем над пополнением ассортимента"}
          </p>
        </div>

        <div className="products-container">
          {products.length === 0 ? (
            <div className="empty-section">
              <div className="empty-content">
                <p>В этой категории пока нет товаров</p>
                <button className="back-button" onClick={() => navigate("/")}>
                  Вернуться на главную
                </button>
              </div>
            </div>
          ) : (
            <div className="items-grid">
              {products.map((product) => (
                <div key={product.id} className="item-card">
                  <div className="item-image-wrapper">
                    <img
                      src={`${process.env.REACT_APP_API_URL}${product.image}`}
                      alt={product.name}
                      className="item-img"
                      onError={(e) => {
                        e.target.src = "/placeholder-product.png";
                        e.target.onerror = null;
                      }}
                    />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{product.name}</h3>
                    <p className="item-description">{product.description}</p>
                    <div className="price-section">
                      <p className="item-price">₽{product.price}</p>
                      {product.oldPrice && (
                        <p className="item-old-price">₽{product.oldPrice}</p>
                      )}
                    </div>

                    <div className="item-buttons">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="cart-button"
                      >
                        <svg className="cart-icon" viewBox="0 0 24 24">
                          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
