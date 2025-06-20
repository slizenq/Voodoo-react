import React, { useState, useEffect } from "react";
import EditUserModal from "./EditUserModal/EditUserModal";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal";
import { getAllUsers, updateUser, deleteUser } from "./api";
import "./index.css";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    isAdmin: false,
  });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders`
      );
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchSubscriptions();
  }, []);
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/subscriptions`
      );
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      alert("Ошибка при загрузке пользователей: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setEditModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(currentUser.id, formData);
      fetchUsers();
      setEditModalOpen(false);
    } catch (error) {
      alert("Ошибка при сохранении: " + error.message);
    }
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(currentUser.id);
      fetchUsers();
      setDeleteModalOpen(false);
    } catch (error) {
      alert("Ошибка при удалении: " + error.message);
    }
  };

  return (
    <div className="users-container">
      <h1 className="user-title">Пользователи</h1>
      <div>
        {loading ? (
          <div className="loading">Загрузка...</div>
        ) : (
          <div className="responsive-table-container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Роль</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td data-label="ID">{user.id}</td>
                    <td data-label="Имя">{user.username}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Роль">
                      <span
                        className={`role-badge ${
                          user.isAdmin ? "admin" : "user"
                        }`}
                      >
                        {user.isAdmin ? "Администратор" : "Пользователь"}
                      </span>
                    </td>
                    <td data-label="Действия" className="user-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditClick(user)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h1 className="user-title">Подписки на рассылку</h1>
              <div>
                {loading ? (
                  <div className="loading">Загрузка...</div>
                ) : (
                  <div className="responsive-table-container">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>Статус</th>
                          <th>Дата подписки</th>
                          <th>Пользователь</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map((sub) => (
                          <tr key={sub.id}>
                            <td data-label="ID">{sub.id}</td>
                            <td data-label="Email">{sub.email}</td>
                            <td data-label="Статус">
                              <span
                                className={`role-badge ${
                                  sub.isSubscribed ? "admin" : "user"
                                }`}
                              >
                                {sub.isSubscribed ? "Активна" : "Неактивна"}
                              </span>
                            </td>
                            <td data-label="Дата подписки">
                              {new Date(sub.createdAt).toLocaleDateString()}
                            </td>
                            <td data-label="Пользователь">
                              {sub.User
                                ? `${sub.User.username} (${sub.User.email})`
                                : "Не зарегистрирован"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="orders-container">
              <h1 className="orders-title">Заказы</h1>

              <div className="responsive-table-container">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Пользователь</th>
                      <th>Email</th>
                      <th>Товары</th>
                      <th>Сумма</th>
                      <th>Дата</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td data-label="ID">{order.id}</td>
                        <td data-label="Пользователь">
                          {order.User
                            ? order.User.username
                            : order.customerName}
                        </td>
                        <td data-label="Email">
                          {order.User ? order.User.email : order.customerEmail}
                        </td>
                        <td data-label="Товары">
                          <ul className="order-items-list">
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.name} × {item.quantity} - {item.price} ₽
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td data-label="Сумма">{order.totalAmount} ₽</td>
                        <td data-label="Статус">
                          <span className={`status-badge ${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                        <td data-label="Дата">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td data-label="Действия">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value)
                            }
                            className="status-select"
                          >
                            <option value="pending">Ожидает</option>
                            <option value="processing">В обработке</option>
                            <option value="shipped">Отправлен</option>
                            <option value="delivered">Доставлен</option>
                            <option value="cancelled">Отменен</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <EditUserModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <DeleteUserModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          username={currentUser?.username}
        />
      </div>
    </div>
  );
}

export default Users;
