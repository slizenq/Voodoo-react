const { User } = require("../models/model");
const ApiError = require("../error/ApiError");

class AuthController {
  async registration(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return next(ApiError.badRequest("Заполните все обязательные поля"));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }

      const user = await User.create({
        username,
        email,
        password,
        isAdmin: false,
      });

      const token = user.generateToken();

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }

      const isPasswordValid = await user.checkPassword(password);
      if (!isPasswordValid) {
        return next(ApiError.badRequest("Неверный пароль"));
      }

      const token = user.generateToken();
      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async check(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      const token = user.generateToken();
      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new AuthController();
