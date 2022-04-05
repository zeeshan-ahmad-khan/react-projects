import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: null,
    userName: null,
    userImg: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.uid = action.payload.uid;
            state.userName = action.payload.userName;
            state.userImg = action.payload.userImg;
        },
        signout: (state) => {
            state.uid = null;
            state.userName = null;
            state.userImg = null;
            localStorage.removeItem("user");
        }
    }
})

export const { login, signout } = authSlice.actions;
export default authSlice.reducer;