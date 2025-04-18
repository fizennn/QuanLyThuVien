import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../../api/bookApi';

// Lấy tất cả sách
export const fetchBooks = createAsyncThunk(
  'books/fetchAll',
  async ( { token } , { getState, rejectWithValue }) => {
    try {
      return await getAllBooks(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
  }
);
// Lấy sách theo ID
export const fetchBookById = createAsyncThunk(
  'books/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      return await getBookById(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch book');
    }
  }
);

// Tạo sách mới
export const addBook = createAsyncThunk(
  'books/add',
  async ({bookData, token}, { rejectWithValue }) => {
    try {
      return await createBook(bookData, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add book');
    }
  }
);

// Cập nhật sách
export const editBook = createAsyncThunk(
  'books/edit',
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      return await updateBook(id, bookData, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update book');
    }
  }
);

// Xoá sách
export const removeBook = createAsyncThunk(
  'books/remove',
  async (id, { rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      return await deleteBook(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
    }
  }
);
