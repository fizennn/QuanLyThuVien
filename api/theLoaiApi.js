import axios from 'axios';
import { API_URL } from './apiURL';

export const getAllTheLoai = async (token) => {
  const response = await axios.get(`${API_URL}/theloai`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getTheLoaiById = async (id, token) => {
  const response = await axios.get(`${API_URL}/theloai/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createTheLoai = async (genreData, token) => {
  try {
    const response = await axios.post(`${API_URL}/theloai`, genreData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error in createTheLoai:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTheLoai = async (id, theLoaiData, token) => {
  const response = await axios.put(`${API_URL}/theloai/${id}`, theLoaiData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteTheLoai = async (id, token) => {
  const response = await axios.delete(`${API_URL}/theloai/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};