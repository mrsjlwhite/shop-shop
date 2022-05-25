import { createSlice } from '@reduxjs/toolkit';
  
export const productSlice = createSlice({
  name: 'productsReducer',
  initialState: {
    products: [],
  },
  reducers: {
    updateProducts: (state, action) => {
        state.products = [...action.payload];
    }
  },
})

export const { updateProducts } = productSlice.actions

export default productSlice.reducer