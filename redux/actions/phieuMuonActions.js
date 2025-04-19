import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllPhieuMuon,
  getPhieuMuonById,
  createPhieuMuon,
  updatePhieuMuon,
  deletePhieuMuon
} from '../../api/phieuMuonApi';

export const fetchAllPhieuMuon = createAsyncThunk(
  'phieuMuon/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      return await getAllPhieuMuon(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch borrowings.');
    }
  }
);

export const fetchPhieuMuonById = createAsyncThunk(
  'phieuMuon/fetchById',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await getPhieuMuonById(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch borrowing.');
    }
  }
);

export const addPhieuMuon = createAsyncThunk(
  'phieuMuon/add',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      return await createPhieuMuon(data, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add borrowing.');
    }
  }
);

export const editPhieuMuon = createAsyncThunk(
  'phieuMuon/edit',
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      return await updatePhieuMuon(id, data, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update borrowing.');
    }
  }
);

export const removePhieuMuon = createAsyncThunk(
  'phieuMuon/remove',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await deletePhieuMuon(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete borrowing.');
    }
  }
);