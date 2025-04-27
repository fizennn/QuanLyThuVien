import axios from 'axios';
import { API_URL } from './apiURL';

export const getAllPhieuDangKy = async (token) => {
  const response = await axios.get(`${API_URL}/phieudangky`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getPhieuDangKyById = async (id, token) => {
  const response = await axios.get(`${API_URL}/phieudangky/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createPhieuDangKy = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/phieudangky`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error in createPhieuDangKy:", error.response?.data || error.message);
    throw error;
  }
};

export const updatePhieuDangKy = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/phieudangky/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deletePhieuDangKy = async (id, token) => {
  const response = await axios.delete(`${API_URL}/phieudangky/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
