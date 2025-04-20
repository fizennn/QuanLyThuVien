import axios from 'axios';
import { API_URL } from './apiURL';

export const login = async (email, password) => {
  try {
    console.log(`${API_URL}/taikhoan/login`);
    const response = await axios.post(`${API_URL}/taikhoan/login`, { 
      "username": email,
      "passwd": password 
    });
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

export const signUp = async (email, password, fullName) => {
  console.log(`${API_URL}/taikhoan`)
  try {
    const response = await axios.post(`${API_URL}/taikhoan`, {
      username: email,
      fullname: fullName,
      passwd: password,
      email: email,
      phone: "",
      address: "",
      role: 0,
      status: 1
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Sign-up response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Sign-up error:', error.response?.data || error.message);
    throw error;
  }
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

export const requestOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/taikhoan/request-otp`, { email });
    console.log('Request OTP response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Request OTP error:', error.response?.data || error.message);
    throw error;
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/taikhoan/reset-password`, {
      email,
      otp,
      newPassword
    });
    console.log('Reset Password response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Reset Password error:', error.response?.data || error.message);
    throw error;
  }
};