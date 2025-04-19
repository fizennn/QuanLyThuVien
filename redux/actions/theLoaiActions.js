import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllTheLoai,
  getTheLoaiById,
  createTheLoai,
  updateTheLoai,
  deleteTheLoai
} from '../../api/theLoaiApi';

export const fetchAllTheLoai = createAsyncThunk(
  'theLoai/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      return await getAllTheLoai(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const fetchTheLoaiById = createAsyncThunk(
  'theLoai/fetchById',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await getTheLoaiById(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch category');
    }
  }
);

export const addTheLoai = createAsyncThunk(
  'theLoai/add',
  async ({ genreData, token }, { rejectWithValue }) => {
    try {
      return await createTheLoai(genreData, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add category');
    }
  }
);

export const editTheLoai = createAsyncThunk(
  'theLoai/edit',
  async ({ id, theLoaiData, token }, { rejectWithValue }) => {
    try {
      return await updateTheLoai(id, theLoaiData, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category');
    }
  }
);

export const removeTheLoai = createAsyncThunk(
  'theLoai/remove',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await deleteTheLoai(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  }
);