import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    accessToken: null,
    contacts: null,
    authGoogle: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("from", action.payload);
            state.status = true;
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.contacts = action.payload.contacts;
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null;
            state.accessToken = null;
            state.contacts = null;
            state.authGoogle = null
        },
        setGoogle: (state, action) => {
            state.authGoogle = action.payload.authGoogle;
        }
    }
})

export const { login, logout, setGoogle } = authSlice.actions;

export default authSlice.reducer;