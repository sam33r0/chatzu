import React, { useState } from 'react';
import { Input } from './../../@/components/ui/input.jsx';
import { Button } from './../../@/components/ui/button.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from './../../components/Footer/Footer.jsx';

function UpdateAcD() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [succes, setSucces] = useState(false);

  const updatePass = async (data) => {
    try {
      setErro(false);
      const res = await axios.post(
        backendUri + '/user/update-account-detail',
        {
          email: data.email,
          fullName: data.fullName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res) {
        setSucces(true);
        setTimeout(() => navigate('/'), 2000);
      }
      reset();
    } catch (error) {
      console.error(error);
      setErro(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen p-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="shadow-lg rounded bg-white p-8 w-full md:w-3/4 lg:w-1/2">
          {succes && (
            <h2 className="text-center text-green-600 text-2xl font-bold">
              Details Updated Successfully
            </h2>
          )}
          <h2 className="text-center text-2xl font-bold mb-4">Change Your Email and Name</h2>
          <form onSubmit={handleSubmit(updatePass)} className="space-y-6">
            <div>
              <Input
                type="email"
                id="email"
                {...register('email')}
                placeholder="New Email"
                className="mt-2 text-gray-900"
              />
            </div>
            <div>
              <Input
                type="text"
                {...register('fullName')}
                placeholder="Full Name"
                className="mt-2 text-gray-900"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              Update Details
            </Button>
          </form>
          {erro && <div className="text-red-500 mt-4">Email already exists</div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateAcD;
