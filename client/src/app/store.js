import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/productSlice';
import categoryReducer from '../redux/categorySlice';

export default configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer
  },
})