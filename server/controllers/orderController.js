const { Order, User, Product, OrderProduct } = require("../models/model");
const ApiError = require("../error/ApiError");

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
        {
          model: Product,
          through: { attributes: ["quantity", "priceAtPurchase"] },
          attributes: ["id", "name", "price", "image"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
        {
          model: Product,
          through: { attributes: ["quantity", "priceAtPurchase"] },
          attributes: ["id", "name", "price", "image"],
        },
      ],
    });

    if (!order) {
      return next(ApiError.notFound("Заказ не найден"));
    }

    res.json(order);
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function createOrder(req, res, next) {
  try {
    const {
      userId,
      products,
      shippingAddress,
      paymentMethod = "credit_card",
      firstName,
      lastName,
      email,
    } = req.body;

    if (!userId || !products || !shippingAddress) {
      return next(ApiError.badRequest("Не указаны обязательные поля"));
    }

    const productIds = products.map((item) => item.id);
    const dbProducts = await Product.findAll({ where: { id: productIds } });

    if (dbProducts.length !== products.length) {
      return next(ApiError.notFound("Некоторые товары не найдены"));
    }

    const totalAmount = products.reduce((sum, item) => {
      const product = dbProducts.find((p) => p.id === item.id);
      return sum + product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      userId,
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "pending",
    });

    await OrderProduct.bulkCreate(
      products.map((item) => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        priceAtPurchase: dbProducts.find((p) => p.id === item.id).price,
      }))
    );

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Product,
          through: { attributes: ["quantity", "priceAtPurchase"] },
        },
      ],
    });

    res.json(createdOrder);
  } catch (error) {
    console.error("Create order error:", error);
    next(ApiError.internal(error.message));
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return next(ApiError.badRequest("Статус не указан"));
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return next(ApiError.notFound("Заказ не найден"));
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return next(ApiError.notFound("Заказ не найден"));
    }

    await order.destroy();
    res.json({ message: "Заказ успешно удален" });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

async function getUserOrders(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return next(ApiError.notFound("Пользователь не найден"));
    }

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          through: { attributes: ["quantity", "priceAtPurchase"] },
          attributes: ["id", "name", "price", "image"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    next(ApiError.internal(error.message));
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getUserOrders,
};
