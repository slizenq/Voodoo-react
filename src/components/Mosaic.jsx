import React from "react";
import Button from "./ui/Button/Button";
import exclusive_figures from "../img/exclusive-figures.jpg";
import mosaic_hero1 from "../img/mosaic-hero1.jpg";
import mosaic_hero2 from "../img/mosaic-hero2.jpg";
import mosaic_hero3 from "../img/mosaic-hero3.jpg";
import mosaic_hero4 from "../img/mosaic-hero4.jpg";
import mosaic_hero5 from "../img/mosaic-hero5.jpg";
import { Link } from "react-router-dom";

const Mosaic = () => {
  const categories = [
    {
      img: mosaic_hero1,
      title: "Аниме-одежда",
      desc: "Футболки и худи с персонажами",
      theme: "dark",
      category: "clothing",
    },
    {
      img: mosaic_hero2,
      title: "Постеры",
      desc: "Арт-принты для ваших стен",
      theme: "light",
      category: "posters",
    },
    {
      img: mosaic_hero3,
      title: "Плюшевые игрушки",
      desc: "Мягкие персонажи",
      theme: "light",
      category: "plush",
    },
    {
      img: mosaic_hero4,
      title: "Аксессуары",
      desc: "Значки и брелки",
      theme: "dark",
      category: "accessories",
    },
    {
      img: mosaic_hero5,
      title: "Манга",
      desc: "Коллекционные издания",
      theme: "light",
      wide: true,
      category: "manga",
    },
  ];

  return (
    <div className="anime-mosaic">
      <div className="mosaic-container">
        <Link to={`/categories/figure/products`} className="mosaic-card-link">
          <div className="mosaic-card mosaic-main">
            <div className="card-image">
              <img src={exclusive_figures} alt="Аниме фигурки" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3 className="card-title">Эксклюзивные аниме-фигурки</h3>
              <p className="card-desc">
                Коллекционные издания с детальной проработкой
              </p>
              <div className="card-buttons">
                <Link
                  size="large"
                  to="/categories/figures/products"
                  className="button-view"
                >
                  Смотреть
                </Link>
              </div>
            </div>
          </div>
        </Link>
        <div className="mosaic-grid">
          {categories.map((item, index) => (
            <Link
              to={`/categories/${item.category}/products`}
              className="mosaic-card-link"
            >
              <div
                key={index}
                className={`mosaic-card ${item.wide ? "mosaic-wide" : ""} ${
                  item.theme === "dark" ? "anime-card-dark" : "anime-card-light"
                }`}
              >
                <div className="card-image">
                  <img src={item.img} alt={item.title} />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                  <div className="card-buttons">
                    <Link
                      to={`/categories/${item.category}/products`}
                      className="button-view"
                    >
                      Смотреть
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mosaic;
