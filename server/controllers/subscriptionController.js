const { User, UserSubscription } = require("../models/model");
const ApiError = require("../error/ApiError");

async function subscribe(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return next(ApiError.badRequest("Email обязателен"));
    }

    let subscription = await UserSubscription.findOne({ where: { email } });

    if (!subscription) {
      subscription = await UserSubscription.create({
        email,
        isSubscribed: true,
        notificationPreferences: "email",
      });

      const user = await User.findOne({ where: { email } });
      if (user) {
        await subscription.setUser(user);
      }
    } else {
      subscription.isSubscribed = true;
      await subscription.save();
    }

    res.json({ success: true, message: "Вы успешно подписались на рассылку" });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function getAllSubscriptions(req, res, next) {
  try {
    const subscriptions = await UserSubscription.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email", "isAdmin"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(subscriptions);
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

module.exports = {
  subscribe,
  getAllSubscriptions,
};
