import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let existingItemIdx = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (existingItemIdx > -1) {
                state.cartItems[existingItemIdx].quantity++;
                state.totalPrice += action.payload.price;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                state.totalQuantity++;
                state.totalPrice += action.payload.price;
            }

            // console.log(existingItemIdx, state.totalQuantity, state.totalPrice);
        },
        removeFromCart: (state, action) => {
            let newCart = state.cartItems.filter(item => item.id !== action.payload.id)

            state.cartItems = newCart;
            state.totalPrice -= action.payload.price * action.payload.quantity;
            state.totalQuantity--;
        },
        increase: (state, action) => {
            let existingItemIdx = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems[existingItemIdx].quantity++;
            state.totalPrice += action.payload.price;
        },
        decrease: (state, action) => {
            let existingItemIdx = state.cartItems.findIndex(item => item.id === action.payload.id);

            state.cartItems[existingItemIdx].quantity--;
            // console.log(state.cartItems[existingItemIdx].quantity);

            if (state.cartItems[existingItemIdx].quantity < 1) {
                let newCart = state.cartItems.filter(item => item.id !== action.payload.id)

                state.cartItems = newCart;
                state.totalPrice -= action.payload.price;
                state.totalQuantity--;
            } else {
                state.totalPrice -= action.payload.price;
            }
        }
    }
})

export const { addToCart, removeFromCart, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;