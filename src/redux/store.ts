import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
