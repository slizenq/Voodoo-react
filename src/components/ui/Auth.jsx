import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";

const Auth = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLoginMode
        ? `${process.env.REACT_APP_API_URL}/auth/login`
        : `${process.env.REACT_APP_API_URL}/auth/registration`;

      const dataToSend = isLoginMode
        ? { email: formData.email, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

      const response = await axios.post(url, dataToSend);

      localStorage.setItem("token", response.data.token);
      onLogin(response.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Произошла ошибка");
    }
  };

  return (
    <div className="auth">
      <div className="auth__logo">
        <Logo />
      </div>
      <div className="auth__line-left" />
      <div className="auth__line-right" />
      <div className="auth__form">
        {error && <div className="auth__error">{error}</div>}

        {!isLoginMode && (
          <input
            type="text"
            name="username"
            placeholder="Придумайте никнейм"
            value={formData.username}
            onChange={handleChange}
            className="auth__input"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="auth__input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль (минимум 6 символов)"
          value={formData.password}
          onChange={handleChange}
          className="auth__input"
          required
          minLength="6"
        />

        <button
          className="auth__button auth__input-common"
          onClick={handleSubmit}
        >
          {isLoginMode ? "Войти" : "Зарегистрироваться"}
        </button>

        <p className="auth__link" onClick={toggleMode}>
          {!isLoginMode ? "Войти" : "Зарегистрироваться"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
