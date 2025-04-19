import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllPhieuMuon,
  fetchPhieuMuonById,
  addPhieuMuon,
  editPhieuMuon,
  removePhieuMuon
} from '../actions/phieuMuonActions';

const phieuMuonSlice = createSlice({
  name: 'phieuMuon',
  initialState: {
    borrowings: [],
    selectedBorrowing: null,
    loading: false,
    error: null
  },
  reducers: {
    clearSelectedBorrowing: (state) => {
      state.selectedBorrowing = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch all borrowings
      .addCase(fetchAllPhieuMuon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPhieuMuon.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowings = action.payload;
      })
      .addCase(fetchAllPhieuMuon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch borrowing by id
      .addCase(fetchPhieuMuonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhieuMuonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBorrowing = action.payload;
      })
      .addCase(fetchPhieuMuonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add borrowing
      .addCase(addPhieuMuon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPhieuMuon.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowings.push(action.payload);
      })
      .addCase(addPhieuMuon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // edit borrowing
      .addCase(editPhieuMuon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPhieuMuon.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowings = state.borrowings.map(borrowing =>
          borrowing.id === action.payload.id ? action.payload : borrowing
        );
      })
      .addCase(editPhieuMuon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // remove borrowing
      .addCase(removePhieuMuon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePhieuMuon.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowings = state.borrowings.filter(borrowing => borrowing.id !== action.payload.id);
      })
      .addCase(removePhieuMuon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSelectedBorrowing } = phieuMuonSlice.actions;
export default phieuMuonSlice.reducer;