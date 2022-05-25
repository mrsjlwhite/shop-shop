import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categoriesReducer',
  initialState: {
    currentCategory: "",
    categories: []
  },
  reducers: {
    updateCategories: (state, action) => {
      state.categories = [...action.payload];
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    }
  },
})

export const { updateCategories, updateCurrentCategory } = categorySlice.actions

export default categorySlice.reducer