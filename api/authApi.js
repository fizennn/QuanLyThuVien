import axios from 'axios';
import { API_URL } from './apiURL';

export const login = async (email, password) => {
  console.log(`${API_URL}/taikhoan/login`)
  const response = await axios.post(`${API_URL}/taikhoan/login`, { 
    "username": email,
    "passwd": password 
  });
  console.log(response.data.message)
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/logout`);
};

export const fetchProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};