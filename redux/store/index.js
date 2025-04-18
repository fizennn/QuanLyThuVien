import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import bookSlice from '../reducers/bookSlice';
import theLoaiSlice from '../reducers/theLoaiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
    theLoai: theLoaiSlice,
  },
});

export default store;
