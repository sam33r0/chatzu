import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "../../@/components/ui/input.jsx";
import { Button } from "../../@/components/ui/button.jsx";
import Logo from '../Logo/Logo.jsx';
import { useForm } from "react-hook-form";
import axios from 'axios';

function Signup() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const create = async (data) => {
    const fdata = new FormData();
    fdata.append("file", data.avatar[0]);
    fdata.append("upload_preset", "scckzbdr");
    fdata.append('cloud_name', 'de9rb613m');

    const res = await fetch('https://api.cloudinary.com/v1_1/de9rb613m/image/upload', {
      method: 'post',
      body: fdata
    });
    const avatar = await res.json();

    const response = await axios.post((backendUri + '/user/register'), {
      email: data.email,
      fullName: data.fullName,
      age: data.age,
      password: data.password,
      avatar: avatar.url
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <token>'
      },
      withCredentials: true
    });

    if (response) {
      const res = await axios.post((backendUri + '/user/login'), {
        email: data.email,
        password: data.password,
      }, {
        withCredentials: true
      });

      if (res) {
        navigate('/dashboard/jwt');
      }
    }
    reset();
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center'>
      <div className='bg-white shadow rounded-lg p-8 w-full max-w-lg'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>
          Sign Up to create account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
        <form onSubmit={handleSubmit(create)}>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex flex-col gap-4'>
              <Input type="email" id="email" {...register("email", { required: true })} placeholder="Email" className="p-2 border border-gray-300 rounded" />
              <Input type="text" {...register("fullName", { required: true })} placeholder="Full Name" className="p-2 border border-gray-300 rounded" />
              <Input type="password" {...register("password", { required: true })} placeholder="Password" minLength="8" maxLength="20" autoComplete="on" pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$" className="p-2 border border-gray-300 rounded" />
            </div>
            <div className='flex flex-col gap-4'>
              <Input type="text" {...register("age", { required: true })} placeholder="Age" className="p-2 border border-gray-300 rounded" />
              <div>
                <label htmlFor="fileInput" className="block text-gray-700">Upload Avatar</label>
                <Input type="file" {...register("avatar", { required: true })} id="fileInput" className="p-2 border border-gray-300 rounded w-full" />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create Account
          </Button>
        </form>
        <div className="mt-4 flex justify-center">
          <Logo width="100px" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
