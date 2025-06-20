import React from "react";
import Button from "./ui/Button/Button";

const Details = ({ detailsProduts, detailsType, onVisible }) => {
  const total = detailsProduts.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);

  if (detailsType == "min") {
    return (
      <div className="details__content details-min">
        <h2 className="title title_sm">Заказ</h2>
        <div className="details__container">
          <div className="details__header">
            <p className="desc desc_lt">Название товара</p>
            <p className="desc desc_lt">Цена</p>
            <p className="desc desc_lt">Количество</p>
            <p className="desc desc_lt">Стоимость общая</p>
          </div>
          {detailsProduts.map((tovar, index) => (
            <div className="ditail" key={index}>
              <h4 className="title title_purpule title_lt">{tovar.name}</h4>
              <p className="sub sub_lt">{tovar.price}</p>
              <p className="desc desc_lg sub_purpule">{tovar.count}</p>
              <p className="sub sub_lt">₽ {tovar.price * tovar.count} руб.</p>
            </div>
          ))}
        </div>
        <div className="details__all">
          <h5 className="title title_md">Итого: {total} руб.</h5>
        </div>
      </div>
    );
  } else {
    return (
      <div className="details">
        <div className="details__content wrap">
          <h2 className="title title_md">Детали заказа</h2>
          <div className="details__container">
            <div className="details__header">
              <p className="desc">Название товара</p>
              <p className="desc">Цена</p>
              <p className="desc">Количество</p>
              <p className="desc">Стоимость общая</p>
            </div>
            {detailsProduts.map((tovar, index) => (
              <div className="ditail" key={index}>
                <h4 className="title title_purpule title_sm">{tovar.name}</h4>
                <p className="sub">{tovar.price}</p>
                <p className="desc desc_lg sub_purpule">{tovar.count}</p>
                <p className="sub">₽ {tovar.price * tovar.count} руб.</p>
              </div>
            ))}
          </div>
          <div className="details__all">
            <h5 className="title title_bg">Итого: {total} руб.</h5>
            <div
              className="button_formalization button button_bg button_purpule"
              onClick={() => onVisible(true)}
            >
              Оформить заказ
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
