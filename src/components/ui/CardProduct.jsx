import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CardProduct = (props) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/product/${props.id}`);
  };

  if (props.typeCard === "column") {
    return (
      <Link
        to={`/product/${props.id}`}
        onClick={handleClick}
        className="popular__card anime-card"
      >
        <div className="anime-card__image">
          <img src={props.imageProduct} alt={props.titleProduct} />
          {props.category && (
            <span className="anime-card__category">{props.category}</span>
          )}
        </div>
        <h3 className="title title_sm anime-card__title">
          {props.titleProduct}
        </h3>
        <p className="anime-card__desc">{props.desProduct}</p>
        <p className="anime-card__price">{props.priceProduct} ₽</p>
      </Link>
    );
  }

  if (props.typeCard === "row") {
    return (
      <div className="basket-product">
        <div className="basket-product__image">
          <img src={props.imageProduct} alt={props.titleProduct} />
        </div>
        <div className="basket-product__content">
          <h3 className="title title_sm">{props.titleProduct}</h3>
          <p className="desc">{props.desProduct}</p>
          <p className="price">{props.priceProduct} ₽</p>
          <div className="basket-product__actions">
            <button onClick={props.onDecrease}>-</button>
            <span>{props.countProduct}</span>
            <button onClick={props.onIncrease}>+</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CardProduct;
