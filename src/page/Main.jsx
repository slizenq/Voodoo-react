import React, { useState } from "react";
import Slider from "../components/Slider";
import Taglines from "../components/Taglines";
import Mosaic from "../components/Mosaic";
import banner from "../img/banner-subscription.png";
import axios from "axios";

const Main = () => {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/subscribe`, { email });
      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      setSubscriptionStatus("error");
      console.error("Subscription error:", error);
    }
  };
  return (
    <div className="">
      <div className="hero">
        <div className="hero__content wrap">
          <Slider />
        </div>
      </div>
      <Taglines />
      <Mosaic />
      <div className="subscription-section">
        <div className="subscription-container">
          <div className="subscription-content">
            <div className="subscription-text">
              <h2 className="subscription-title">
                Никогда ничего не пропускайте
              </h2>
              <p className="subscription-description">
                Подпишитесь на нашу рассылку, чтобы первыми получать уведомления
                об эксклюзивных предложениях и идеальных подарках.
              </p>
              {subscriptionStatus === "success" && (
                <div className="subscription-success">
                  Спасибо за подписку! Вы будете получать наши новости.
                </div>
              )}
              {subscriptionStatus === "error" && (
                <div className="subscription-error">
                  Произошла ошибка. Пожалуйста, попробуйте позже.
                </div>
              )}
              <form className="subscription-form" onSubmit={handleSubscribe}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="submit-button">
                    Подписаться
                    <svg className="arrow-icon" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="subscription-image">
              <img
                src={banner}
                alt="Мобильное уведомление"
                className="phone-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
