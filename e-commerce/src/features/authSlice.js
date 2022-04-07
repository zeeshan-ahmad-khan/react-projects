import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
    uid: user ? user.uid : null,
    userName: user ? user.userName : null,
    userImg: user ? user.userImg : null,
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