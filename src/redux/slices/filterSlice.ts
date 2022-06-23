import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  categoryType: string;
}

const initialState: FilterState = {
  categoryType: 'Show all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },
  },
});

export const filterSelector = (state: { filter: FilterState }) => state.filter;

export const { setCategoryType } = filterSlice.actions;
export default filterSlice.reducer;
