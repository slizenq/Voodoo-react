import React, { useEffect, useState } from "react";
import CardProduct from "../components/ui/CardProduct";
import Details from "../components/Details";
import { Link } from "react-router-dom";

const Basket = ({ cart, removeFromCart, updateQuantity }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [formalizationVisible, setFormalizationVisible] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(null);

  useEffect(() => {
    const count = cart.filter((product) => product.selected).length;
    setSelectedCount(count);
    setSelectAll(count > 0 && count === cart.length);
  }, [cart]);

  const handleFormalizationToggle = (visible) => {
    setFormalizationVisible(visible);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    cart.forEach((product) => {
      if (product.selected !== newSelectAll) {
        handleProductSelect(product.id);
      }
    });
  };

  const handleProductSelect = (productId) => {
    const product = cart.find((p) => p.id === productId);
    if (product) {
      updateQuantity(productId, product.count, {
        ...product,
        selected: !product.selected,
      });
    }
  };
  const handleDelete = (mode) => {
    if (mode === "all") {
      cart.forEach((product) => removeFromCart(product.id));
    } else {
      cart
        .filter((product) => product.selected)
        .forEach((product) => removeFromCart(product.id));
    }
  };
  const confirmDelete = (mode) => {
    setDeleteMode(mode);
    setShowDeleteModal(true);
  };

  const executeDelete = () => {
    if (deleteMode === "all") {
      cart.forEach((product) => removeFromCart(product.id));
    } else if (deleteMode === "selected") {
      cart
        .filter((product) => product.selected)
        .forEach((product) => removeFromCart(product.id));
    }
    setShowDeleteModal(false);
  };

  const handleDecrease = (productId) => {
    const product = cart.find((p) => p.id === productId);
    if (product && product.count > 1) {
      updateQuantity(productId, product.count - 1);
    } else if (product && product.count === 1) {
      removeFromCart(productId);
    }
  };

  const handleIncrease = (productId) => {
    const product = cart.find((p) => p.id === productId);
    if (product) {
      const newCount = product.count + 1;
      if (product.stock === undefined || newCount <= product.stock) {
        updateQuantity(productId, newCount);
      } else {
        alert(`Максимальное количество товара: ${product.stock}`);
      }
    }
  };

  return (
    <div className="basket">
      <div className="basket__content wrap">
        <h1 className="title title_md">Корзина</h1>
        {cart.length > 0 ? (
          <>
            <div className="basket__header">
              <div className="basket-top__form">
                <label className="select-all-checkbox">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                  <span className="checkmark"></span>
                  <span className="select-all-text">Выбрать все</span>
                </label>
                {selectedCount > 0 && (
                  <span className="selected-count">
                    Выбрано: {selectedCount}
                  </span>
                )}
              </div>
              <div className="basket__links">
                <button
                  className="delete-button"
                  onClick={() => confirmDelete("selected")}
                  disabled={selectedCount === 0}
                >
                  Удалить выбранное
                </button>
                <button
                  className="delete-button"
                  onClick={() => confirmDelete("all")}
                >
                  Удалить все
                </button>
              </div>
            </div>
            {showDeleteModal && (
              <div className="delete-modal-overlay">
                <div className="delete-modal">
                  <h3>Подтверждение удаления</h3>
                  <p>
                    {deleteMode === "all"
                      ? "Вы уверены, что хотите удалить все товары из корзины?"
                      : "Вы уверены, что хотите удалить выбранные товары?"}
                  </p>
                  <div className="delete-modal__actions">
                    <button
                      className="cancel-btn"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Отмена
                    </button>
                    <button className="confirm-btn" onClick={executeDelete}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="basket__main">
              <div className="products-list">
                {cart.map((product) => (
                  <div key={product.id} className="basket-item">
                    <label className="product-checkbox">
                      <input
                        type="checkbox"
                        checked={product.selected || false}
                        onChange={() => handleProductSelect(product.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <CardProduct
                      linkProduct={`/product/${product.id}`}
                      imageProduct={`${process.env.REACT_APP_API_URL}${product.image}`}
                      titleProduct={product.name}
                      desProduct={product.description}
                      priceProduct={product.price}
                      countProduct={product.count}
                      typeCard={"row"}
                      onDecrease={() => handleDecrease(product.id)}
                      onIncrease={() => handleIncrease(product.id)}
                      selected={product.selected}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="empty-basket">
            <p>Ваша корзина пуста</p>
            <Link to="/" className="button">
              Вернуться к покупкам
            </Link>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <Details detailsProduts={cart} onVisible={handleFormalizationToggle} />
      )}

      {formalizationVisible && (
        <div className="formalization" id="formalization">
          <div className="formalization__content wrap">
            <div className="formalization__form">
              <h2 className="title title_md">Оформление заказа</h2>
              <form action="">
                <span>
                  <p className="desc desc_bg sub_purpule">Фамилия</p>
                  <input type="text" required />
                </span>
                <span>
                  <p className="desc desc_bg sub_purpule">Имя</p>
                  <input type="text" required />
                </span>
                <span>
                  <p className="desc desc_bg sub_purpule">Email</p>
                  <input type="email" required />
                </span>
                <span>
                  <p className="desc desc_bg sub_purpule">Адрес доставки</p>
                  <input type="text" required />
                </span>
                <button
                  type="button"
                  className="button_formalization button button_bg button_purpule"
                >
                  Заказать
                </button>
              </form>
            </div>
            <div className="formalization_ditails">
              <Details detailsProduts={cart} detailsType={"min"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
