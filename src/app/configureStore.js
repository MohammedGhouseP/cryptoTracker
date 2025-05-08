import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice';
// import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { crypto: cryptoReducer }
});

export default store;