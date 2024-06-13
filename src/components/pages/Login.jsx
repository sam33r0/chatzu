import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "./../../@/components/ui/input";
import { Button } from "./../../@/components/ui/button.jsx";
import Logo from './../Logo/Logo.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, setGoogle } from './../store/authSlice';
import Footer from './../../components/Footer/Footer.jsx';

function Login() {
  const dispatch = useDispatch();
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const loginWithGoogle = () => {
    window.open(`${import.meta.env.VITE_BACKEND_HOST}/auth/google/callback`, "_self");
  };
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const send = async (data) => {
    try {
      const res = await axios.post(`${backendUri}/user/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(login({ user: res.data.data.user, accessToken: res.data.data.accessToken, contacts: res.data.data.connections, roomList: res.data.data.roomList }));
        navigate('/dashboard/jwt');
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
    reset();
  };

  return (
    <>
      <div className='min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center'>
        <div className='bg-white shadow rounded-lg p-8 w-full max-w-lg'>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>
            Sign In to your account
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Don't have an account?&nbsp;
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <form onSubmit={handleSubmit(send)}>
            <div className='flex flex-col gap-4'>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Input type="email" id="email" {...register("email", { required: true })} placeholder="Email" className="p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <Input type="password" id="password" {...register("password", { required: true })} placeholder="Password" autoComplete="on" className="p-2 border border-gray-300 rounded" />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Sign In
            </Button>
          </form>
          <Button onClick={loginWithGoogle} className="w-full mt-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Sign In With GOOGLE
          </Button>
          {error && <div className='text-red-500 mt-4 text-center'>Please check the entered Credentials</div>}
          <div className="mt-4 flex justify-center">
            <Logo width="100px" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
