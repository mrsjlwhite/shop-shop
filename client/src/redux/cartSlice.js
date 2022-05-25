import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cartsReducer',
    initialState: {
        cartOpen: false,
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartOpen = true;
            state.cart = [...state.cart, action.payload];
        },
        addMultipleToCart: (state, action) => {
            state.cart = [...state.cart, ...action.payload];
        },
        removeFromCart: (state, action) => {
            let newState = state.cart.filter(product => product._id !== action.payload);
            state.cartOpen = newState.length > 0;
            state.cart = newState;
        },
        updateCartQuantity: (state, action) => {
            state.cartOpen = true;
            state.cart = state.cart.map(product => {
                if (action.payload._id === product._id) {
                    product.purchaseQuantity = action.payload.purchaseQuantity;
                }
                return product;
            });
        },
        clearCart: (state) => {
            state.cartOpen = false;
            state.cart = [];
        },
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        }
    },
})

export const { addToCart, addMultipleToCart, removeFromCart, updateCartQuantity, clearCart, toggleCart } = cartSlice.actions

export default cartSlice.reducer