import React from 'react';
import './index.css';

const EditUserModal = ({ isOpen, onClose, onSubmit, formData, handleInputChange }) => {
  if (!isOpen) return null;

  return (
    <div className="edit-user-modal">
      <div className="edit-user-modal-content">
        <h2>Редактировать пользователя</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Имя пользователя:</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group checkbox">
            <label>
              <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleInputChange} />
              Администратор
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
