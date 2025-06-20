const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: true,
  }
);

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    shippingAddress: { type: DataTypes.TEXT, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    customerName: { type: DataTypes.STRING, allowNull: false },
    customerEmail: { type: DataTypes.STRING, allowNull: false },
    items: { type: DataTypes.JSON, allowNull: false },
  },
  {
    timestamps: true,
  }
);

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    category: {
      type: DataTypes.ENUM(
        "figures",
        "clothing",
        "posters",
        "plush",
        "accessories",
        "manga"
      ),
      allowNull: false,
    },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: true,
  }
);
const OrderProduct = sequelize.define("OrderProduct", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  priceAtPurchase: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});
const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
      defaultValue: "pending",
    },
    transactionId: { type: DataTypes.STRING },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    timestamps: true,
  }
);

const UserSubscription = sequelize.define(
  "UserSubscription",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    notificationPreferences: {
      type: DataTypes.ENUM("email", "sms", "both", "none"),
      defaultValue: "email",
    },
  },
  {
    timestamps: true,
  }
);

// Связи между таблицами
User.hasOne(UserSubscription);
UserSubscription.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Payment);
Payment.belongsTo(Order);

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign(
    {
      id: this.id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

module.exports = {
  User,
  Product,
  Order,
  Payment,
  UserSubscription,
  OrderProduct,
};
