import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import bookSlice from '../reducers/bookSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
  },
});

export default store;
