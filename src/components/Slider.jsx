import React from "react";
import "../styles/hero.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import slider_hero1 from "../img/slider-hero1.png";
import slider_hero2 from "../img/slider-hero2.png";
import slider_hero3 from "../img/slider-hero3.png";
import Button from "./ui/Button/Button";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="hero">
      <Splide
        options={{
          type: "loop",
          speed: 1000,
          autoplay: true,
          pagination: true,
          perPage: 1,
          padding: { left: 0, right: 0 },
        }}
        aria-label="Аниме коллекции"
      >
        <SplideSlide>
          <div className="slider__slide slider__left">
            <div className="slider__content">
              <div className="slider__text">
                <h1 className="slider__title">
                  Эксклюзивные коллекции аниме-мерча
                </h1>
                <p className="slider__desc">
                  Уникальные фигурки с любимыми персонажами
                </p>
                <Link
                  to="/categories/figures/products"
                  className="collection-btn-rounded"
                >
                  В коллекцию
                </Link>
              </div>
              <div className="slider__image__wrapper">
                <img
                  src={slider_hero1}
                  alt="Аниме-фигурка"
                  className="slider__image"
                />
              </div>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="slider__slide slider__right">
            <div className="slider__content">
              <div className="slider__image__wrapper">
                <img
                  src={slider_hero2}
                  alt="Аниме-постеры"
                  className="slider__image"
                />
              </div>
              <div className="slider__text">
                <h1 className="slider__title">Для настоящих ценителей аниме</h1>
                <p className="slider__desc">
                  Все изделия проходят проверку качества перед отправкой
                </p>
                <Link
                  to="/categories/posters/products"
                  className="collection-btn-rounded"
                >
                  Смотреть постеры
                </Link>
              </div>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="slider__slide slider__left">
            <div className="slider__content">
              <div className="slider__text">
                <h1 className="slider__title">
                  Получайте эксклюзивные предложения
                </h1>
                <p className="slider__desc">
                  Отслеживайте товары в корзине
                </p>
                <Link to="/basket" className="collection-btn-rounded">
                  Перейти в корзину
                </Link>
              </div>
              <div className="slider__image__wrapper">
                <img
                  src={slider_hero3}
                  alt="Аниме-плюш"
                  className="slider__image"
                />
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Slider;
