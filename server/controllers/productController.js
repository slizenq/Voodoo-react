const { Product } = require("../models/model");
const path = require("path");
const multer = require("multer");
const { Op } = require('sequelize');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/products"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imagePath = "/uploads/products/" + req.file.filename;

    const product = await Product.create({
      name,
      description,
      price,
      image: imagePath,
      category,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { query, category } = req.query;
    let whereClause = {};

    if (query) {
      whereClause.name = { [Op.like]: `%${query}%` };
    }

    if (category) {
      whereClause.category = category;
    }

    const products = await Product.findAll({ where: whereClause });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const updateData = { name, description, price, category, stock };
    if (req.file) updateData.image = "/uploads/products/" + req.file.filename;
    const [updated] = await Product.update(updateData, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.json(updatedProduct);
    }
    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (deleted) return res.json({ message: "Product deleted" });
    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCategoriesWithProducts = async (req, res) => {
  try {
    const categoryValues = Product.rawAttributes.category.values;
    const categoriesWithCount = await Promise.all(
      categoryValues.map(async (category) => {
        const count = await Product.count({ where: { category } });
        return {
          name: category,
          count,
          slug: category.toLowerCase().replace(/\s+/g, "-"),
        };
      })
    );
    const nonEmptyCategories = categoriesWithCount.filter((c) => c.count > 0);
    res.json(nonEmptyCategories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = Product.rawAttributes.category.values;
    if (!validCategories.includes(category)) {
      return res.status(404).json({ message: "Category not found" });
    }
    const products = await Product.findAll({
      where: { category },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct: [upload.single("image"), createProduct],
  updateProduct: [upload.single("image"), updateProduct],
  deleteProduct,
  getCategoriesWithProducts,
  getProductsByCategory,
  searchProducts
};
