import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import io from "socket.io-client";
import useDebounce from './CustomHook/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket, userSetup } from './store/authSlice.js';
import axios from 'axios';

const Endpoint = import.meta.env.VITE_BACKEND_HOST;

function Ridirect() {
    const dispatch = useDispatch();
    const { param } = useParams();
    let user = useSelector((state) => state.auth.userData);

    const setupFunc = useDebounce(() => {
        if (user) {
            const socket = io(Endpoint);
            socket.emit('setup', user);
            dispatch(setSocket({ socket }));
        }
    }, 1000);

    useEffect(() => {
        if (!user) {
            // fetch(import.meta.env.VITE_BACKEND_URI+'/user/get-current-user').then((res)=>{
            //     console.log(res,"FROM REDIRECT");
            // })
            axios.post(import.meta.env.VITE_BACKEND_URI + '/user/get-current-user', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${"sfa"}`
                },
                withCredentials: true
            }).then(res => {
                console.log(res.data)
                dispatch(userSetup({ user: res.data.user }))
                user = res.data.user;
                setupFunc();
            });
        }
        else
        setupFunc();
    }, []);

    return (
        <>
            <Dashboard param={param} />
        </>
    );
}

export default Ridirect;
