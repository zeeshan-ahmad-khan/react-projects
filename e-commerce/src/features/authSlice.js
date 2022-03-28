import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: undefined,
    userName: undefined,
    userImg: undefined,
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
            state.uid = "";
            state.userName = "";
            state.userImg = "";
        }
    }
})

export const { login, signout } = authSlice.actions;
export default authSlice.reducer;