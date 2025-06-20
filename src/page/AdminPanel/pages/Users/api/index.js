import axios from 'axios';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    return [];
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    return null;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};
