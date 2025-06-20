import React from "react";
import Logo from "../ui/Logo";
import link from "../../img/arrow-link.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content wrap">
        <div className="footer__about">
          <Logo />
          <p className="footer__description">
            Мы очень рады, что вы с нами! Следите за нашими новостями — здесь вы
            найдёте самые выгодные предложения и идеальные подарки без лишних
            хлопот.
          </p>
        </div>

        <div className="footer__columns">
          <ul className="footer__list">
            <p>
              "Коллекционирование - это не просто хобби, это способ сохранить
              кусочек волшебства в повседневной жизни"
            </p>
             <p>Сделано с любовью к фанатам</p>
          </ul>
        </div>
      </div>

      <div className="copyright"></div>
    </footer>
  );
};

export default Footer;
