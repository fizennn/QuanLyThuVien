import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllPhieuDangKy,
  getPhieuDangKyById,
  createPhieuDangKy,
  updatePhieuDangKy,
  deletePhieuDangKy
} from '../../api/phieuDangKyApi';

export const fetchAllPhieuDangKy = createAsyncThunk(
  'phieuDangKy/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      return await getAllPhieuDangKy(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch registrations.');
    }
  }
);

export const fetchPhieuDangKyById = createAsyncThunk(
  'phieuDangKy/fetchById',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await getPhieuDangKyById(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch registration.');
    }
  }
);

export const addPhieuDangKy = createAsyncThunk(
  'phieuDangKy/add',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      console.log('Adding registration:', data);
      return await createPhieuDangKy(data, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add registration.');
    }
  }
);

export const editPhieuDangKy = createAsyncThunk(
  'phieuDangKy/edit',
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      return await updatePhieuDangKy(id, data, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update registration.');
    }
  }
);

export const removePhieuDangKy = createAsyncThunk(
  'phieuDangKy/remove',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await deletePhieuDangKy(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete registration.');
    }
  }
);
