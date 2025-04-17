import { createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { login, logout, fetchProfile } from '../../api/authApi';

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      await SecureStore.setItemAsync('token', data.token);
      console.log('Token :', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await logout();
      await SecureStore.deleteItemAsync('token');
    } finally {
      dispatch(authSlice.actions.resetAuthState()); // Sync action từ slice
    }
  }
);

// Fetch profile thunk
export const loadUserProfile = createAsyncThunk(
  'auth/loadProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      return await fetchProfile(auth.token);
    } catch (error) {
      return rejectWithValue('Failed to load profile');
    }
  }
);