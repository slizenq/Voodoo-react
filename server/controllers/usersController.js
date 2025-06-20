const { User } = require("../models/model");
const ApiError = require("../error/ApiError");

async function getAllUsers(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "isAdmin", "createdAt"],
    });
    res.json(users);
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "isAdmin", "createdAt"],
    });

    if (!user) {
      return next(ApiError.notFound("Пользователь не найден"));
    }

    res.json(user);
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function createUser(req, res, next) {
  try {
    const { username, email, password, isAdmin } = req.body;

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
      isAdmin: isAdmin || false,
    });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { username, email, isAdmin } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return next(ApiError.notFound("Пользователь не найден"));
    }

    if (email && email !== user.email) {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    await user.save();

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return next(ApiError.notFound("Пользователь не найден"));
    }

    await user.destroy();
    res.json({ message: "Пользователь успешно удален" });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
