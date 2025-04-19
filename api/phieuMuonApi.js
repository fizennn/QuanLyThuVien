import axios from 'axios';
import { API_URL } from './apiURL';

export const getAllPhieuMuon = async (token) => {
  const response = await axios.get(`${API_URL}/phieumuon`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getPhieuMuonById = async (id, token) => {
  const response = await axios.get(`${API_URL}/phieumuon/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createPhieuMuon = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/phieumuon`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error in createPhieuMuon:", error.response?.data || error.message);
    throw error;
  }
};

export const updatePhieuMuon = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/phieumuon/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deletePhieuMuon = async (id, token) => {
  const response = await axios.delete(`${API_URL}/phieumuon/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};