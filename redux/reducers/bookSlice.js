import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, fetchBookById, addBook, editBook, removeBook } from '../actions/bookActions';

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    selectedBook: null,
    loading: false,
    error: null
  },
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
      })

      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })

      .addCase(editBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })

      .addCase(removeBook.fulfilled, (state, action) => {
        state.books = state.books.filter(b => b._id !== action.payload._id);
      });
  }
});

export const { clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
