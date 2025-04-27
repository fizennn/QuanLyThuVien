import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPhieuDangKy,
  fetchPhieuDangKyById,
  addPhieuDangKy,
  editPhieuDangKy,
  removePhieuDangKy
} from '../actions/phieuDangKyActions';

const phieuDangKySlice = createSlice({
  name: 'phieuDangKy',
  initialState: {
    registrations: [],
    selectedRegistration: null,
    loading: false,
    error: null
  },
  reducers: {
    clearSelectedRegistration: (state) => {
      state.selectedRegistration = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAllPhieuDangKy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPhieuDangKy.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload;
      })
      .addCase(fetchAllPhieuDangKy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch by id
      .addCase(fetchPhieuDangKyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhieuDangKyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRegistration = action.payload;
      })
      .addCase(fetchPhieuDangKyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add
      .addCase(addPhieuDangKy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPhieuDangKy.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations.push(action.payload);
      })
      .addCase(addPhieuDangKy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // edit
      .addCase(editPhieuDangKy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPhieuDangKy.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = state.registrations.map(registration =>
          registration.id === action.payload.id ? action.payload : registration
        );
      })
      .addCase(editPhieuDangKy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // remove
      .addCase(removePhieuDangKy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePhieuDangKy.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = state.registrations.filter(registration => registration.id !== action.payload.id);
      })
      .addCase(removePhieuDangKy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSelectedRegistration } = phieuDangKySlice.actions;
export default phieuDangKySlice.reducer;
