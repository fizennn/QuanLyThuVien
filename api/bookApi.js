import axios from 'axios';
import { API_URL } from './apiURL';

export const getAllBooks = async (token) => {
  console.log(`${API_URL}/sach`)
  const response = await axios.get(`${API_URL}/sach`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getBookById = async (id, token) => {
  const response = await axios.get(`${API_URL}/sach/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createBook = async (bookData, token) => {
  console.log(`${API_URL}/sach`);
  try {
    const response = await axios.post(`${API_URL}/sach`, bookData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log("Lỗi khi gọi API:", error.response?.data || error.message);
    throw error; // hoặc xử lý khác nếu cần
  }
};

export const updateBook = async (id, bookData, token) => {
  const response = await axios.put(`${API_URL}/sach/${id}`, bookData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteBook = async (id, token) => {
  const response = await axios.delete(`${API_URL}/sach/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
