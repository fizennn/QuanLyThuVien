import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import bookSlice from '../reducers/bookSlice';
import theLoaiSlice from '../reducers/theLoaiSlice';
import phieuMuonSlice from '../reducers/phieuMuonSlice';
import phieuDangKySlice from '../reducers/phieuDangKySlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
    theLoai: theLoaiSlice,
    phieuMuon: phieuMuonSlice,
    phieuDangKy: phieuDangKySlice,
  },
});

export default store;
