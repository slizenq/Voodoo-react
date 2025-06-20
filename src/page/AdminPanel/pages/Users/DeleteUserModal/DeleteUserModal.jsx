import React from 'react';
import './index.css';

const DeleteUserModal = ({ isOpen, onClose, onConfirm, username }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-user-modal">
      <div className="delete-user-modal-content">
        <h2>Удалить пользователя</h2>
        <p>Вы уверены, что хотите удалить пользователя {username}?</p>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Отмена
          </button>
          <button type="button" className="delete-confirm-btn" onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
