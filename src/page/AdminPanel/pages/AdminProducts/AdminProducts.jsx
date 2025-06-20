import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "figures",
    stock: 0,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/products`
      );
      setProducts(data);
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingId) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/admin/products/${editingId}`,
          data
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/products`,
          data
        );
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Ошибка при сохранении товара:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/admin/products/${id}`
        );
        fetchProducts();
      } catch (error) {
        console.error("Ошибка при удалении товара:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "figures",
      stock: 0,
      image: null,
    });
    setEditingId(null);
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="page-header">
          <h1>Управление товарами</h1>
        </div>

        <div className="admin-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <input
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Название"
                required
              />
            </div>

            <div className="form-group mb-4">
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Описание"
                required
              />
            </div>

            <div className="form-group mb-4">
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Цена"
                required
              />
            </div>

            <div className="form-group mb-4">
              <select
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="figures">Фигурки</option>
                <option value="clothing">Одежда</option>
                <option value="posters">Постеры</option>
                <option value="plush">Плюшевые игрушки</option>
                <option value="accessories">Аксессуары</option>
                <option value="manga">Манга</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <input
                className="form-control"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Количество на складе"
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required={!editingId}
              />
            </div>

            <div className="flex items-center">
              <button type="submit" className="btn btn-primary mr-2">
                {editingId ? "Обновить товар" : "Добавить товар"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Отменить
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Список товаров</h2>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={`${process.env.REACT_APP_API_URL}${product.image}`}
                  alt={product.name}
                  className="product-image"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/200")
                  }
                />
                <div className="product-content">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span>Цена: {product.price}</span>
                    <span>Категория: {product.category}</span>
                    <span>На складе: {product.stock}</span>
                  </div>
                  <div className="product-actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(product)}
                    >
                      Редактировать
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
