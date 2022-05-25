import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/productSlice';
import categoryReducer from '../redux/categorySlice';
import cartReducer from '../redux/cartSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer
  }
})