import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllTheLoai,
  fetchTheLoaiById,
  addTheLoai,
  editTheLoai,
  removeTheLoai
} from '../actions/theLoaiActions';

const theLoaiSlice = createSlice({
  name: 'theLoai',
  initialState: {
    theLoai: [],
    chonTheLoai: null,
    loading: false,
    error: null
  },
  reducers: {
    clearchonTheLoai: (state) => {
      state.chonTheLoai = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTheLoai.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTheLoai.fulfilled, (state, action) => {
        state.loading = false;
        state.theLoai = action.payload;
      })
      .addCase(fetchAllTheLoai.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTheLoaiById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheLoaiById.fulfilled, (state, action) => {
        state.loading = false;
        state.chonTheLoai = action.payload;
      })
      .addCase(fetchTheLoaiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTheLoai.fulfilled, (state, action) => {
        state.theLoai.push(action.payload);
      })

      .addCase(editTheLoai.fulfilled, (state, action) => {
        const index = state.theLoai.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.theLoai[index] = action.payload;
        }
      })

      .addCase(removeTheLoai.fulfilled, (state, action) => {
        state.theLoai = state.theLoai.filter(c => c._id !== action.payload._id);
      });
  }
});

export const { clearchonTheLoai } = theLoaiSlice.actions;
export default theLoaiSlice.reducer;