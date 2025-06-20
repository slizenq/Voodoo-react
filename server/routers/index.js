const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");
const usersController = require("../controllers/usersController");
const subscriptionController = require("../controllers/subscriptionController");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/subscribe", subscriptionController.subscribe);
router.get("/subscriptions", subscriptionController.getAllSubscriptions);

router.post("/auth/registration", authController.registration);
router.post("/auth/login", authController.login);
router.get("/auth/check", authMiddleware, authController.check);

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);

router.post("/admin/products", productController.createProduct);
router.put("/admin/products/:id", productController.updateProduct);
router.delete("/admin/products/:id", productController.deleteProduct);

router.get("/categories", productController.getCategoriesWithProducts);
router.get(
  "/categories/:category/products",
  productController.getProductsByCategory
);

router.get("/users", usersController.getAllUsers);
router.get("/users/:id", usersController.getUserById);
router.post("/users", usersController.createUser);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderById);
router.post("/orders", orderController.createOrder);

module.exports = router;
