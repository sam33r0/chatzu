import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    accessToken: null,
    contacts: null,
    authGoogle: null,
    roomList: null,
    socket: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.contacts = action.payload.contacts;
            state.roomList = action.payload.roomList;
        },
        userSetup: (state, action) =>{
            state.userData= action.payload.user;
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null;
            state.accessToken = null;
            state.contacts = null;
            state.authGoogle = null;
            state.roomList = null;
        },
        setGoogle: (state, action) => {
            state.authGoogle = action.payload.authGoogle;
        },
        setSocket: (state, action) => {
            state.socket = action.payload.socket;
        }
    }
})

export const { login, logout, setGoogle, setSocket, userSetup } = authSlice.actions;

export default authSlice.reducer;