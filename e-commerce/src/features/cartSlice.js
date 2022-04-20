import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signout } from "./authSlice";

const cart = JSON.parse(sessionStorage.getItem("cart"));

const initialState = {
    cartItems: cart ? cart.cartItems : [],
    totalQuantity: cart ? cart.totalQuantity : 0,
    totalPrice: cart ? cart.totalPrice : 0,
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async (uid) => {
    try {
        const response = await axios.get(`https://cardverse-179d7-default-rtdb.firebaseio.com/${uid}.json`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            let existingItemIdx = state?.cartItems.findIndex(item => item.id === action.payload.id);
            // console.log(existingItemIdx, state.cartItems);
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
            let newCart = state?.cartItems.filter(item => item.id !== action.payload.id)

            state.cartItems = newCart;
            state.totalPrice -= action.payload.price * action.payload.quantity;
            state.totalQuantity--;
        },
        increase: (state, action) => {
            let existingItemIdx = state?.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems[existingItemIdx].quantity++;
            state.totalPrice += action.payload.price;
        },
        decrease: (state, action) => {
            let existingItemIdx = state?.cartItems.findIndex(item => item.id === action.payload.id);

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartItems || [];
                state.totalQuantity = action.payload.totalQuantity || 0;
                state.totalPrice = action.payload.totalPrice || 0;
            })
            .addCase(signout, (state) => {
                state.cartItems = [];
                state.totalQuantity = 0;
                state.totalPrice = 0;
            })
    }
})

export const { addToCart, removeFromCart, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;