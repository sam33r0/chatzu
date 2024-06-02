import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    accessToken: null,
    connection: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.connection = action.payload.connection;
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null;
            state.accessToken = null;
            state.connection = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;