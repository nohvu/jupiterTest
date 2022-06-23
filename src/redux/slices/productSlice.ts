import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type IProduct = {
  id: number;
  title: string;
  category: string;
  imageURL: string;
};

export interface ProductState {
  items: IProduct[];
  target: number;
}
interface ParamsProps {
  categoryType: string;
}

interface ParamsDelProps {
  id: number;
}
export const initialState: ProductState = {
  items: [],
  target: NaN,
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params: ParamsProps) => {
    const { categoryType } = params;

    const { data } = await axios.get(
      `https://61fbb9d23f1e34001792c598.mockapi.io/products?${
        categoryType === 'Show all' ? '' : `category=${categoryType}&`
      }`,
    );

    return data;
  },
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (params: ParamsDelProps) => {
    const { id } = params;

    const { data } = await axios.delete(
      `https://61fbb9d23f1e34001792c598.mockapi.io/products/${id}`,
    );

    return data;
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductItems: (state, action) => {
      state.items = action.payload;
    },
    removeProductItem: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    setTarget: (state, action) => {
      state.target = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled.toString()]: (state, action) => {
      state.items = action.payload;
    },
    [deleteProduct.fulfilled.toString()]: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const productSelector = (state: { product: ProductState }) => state.product;

export const { setProductItems, removeProductItem, setTarget } = productSlice.actions;
export default productSlice.reducer;
