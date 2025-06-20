import React from "react";
import tagline_hero1 from "../img/tagline-hero1.png";
import tagline_hero2 from "../img/tagline-hero2.jpg";
import tagline_hero3 from "../img/tagline-hero3.jpg";
import tagline_hero4 from "../img/tagline-hero4.jpg";

const Taglines = () => {
  return (
    <div className="taglines">
      <div className="taglines__content wrap">
        <h2 className="title title_bg">
          Окунитесь в мир любимых аниме-персонажей
        </h2>
        <div className="taglines__cards">
          <div className="taglines__card taglines__card-1">
            <div className="taglines-card__img">
              <img src={tagline_hero1} alt="Аниме-фигурки" />
            </div>
            <div className="taglines-card__info">
              <p className="sub">Фигурки</p>
              <h3 className="title title_md">Коллекционные издания</h3>
            </div>
          </div>

          <div className="taglines__card taglines__card-2">
            <div className="taglines-card__img">
              <img src={tagline_hero4} alt="Аниме-одежда" />
            </div>
            <div className="taglines-card__info">
              <p className="sub">Одежда</p>
              <h3 className="title title_md">Стиль настоящего отаку</h3>
            </div>
          </div>

          <div className="taglines__card taglines__card-3">
            <div className="taglines-card__img">
              <img src={tagline_hero2} alt="Аниме-постеры" />
            </div>
            <div className="taglines-card__info">
              <p className="sub">Постеры</p>
              <h3 className="title title_md">Оживите стены любимыми сценами</h3>
            </div>
          </div>

          <div className="taglines__card taglines__card-4">
            <div className="taglines-card__img">
              <img src={tagline_hero3} alt="Аниме-плюши" />
            </div>
            <div className="taglines-card__info">
              <p className="sub">Плюшевые игрушки</p>
              <h3 className="title title_md">Мягкие и обнимаемые персонажи</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taglines;
