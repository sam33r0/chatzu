import React, { useState } from 'react';
import { Input } from './../../@/components/ui/input.jsx';
import { Button } from './../../@/components/ui/button.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './../../components/Footer/Footer.jsx';

function ChangePassword() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const { register, handleSubmit, reset } = useForm();
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [succes, setSucces] = useState(false);

  const updatePass = async (data) => {
    try {
      if (data.newPassword === data.password) {
        setErro(false);
        const res = await axios.post(
          backendUri + '/user/change-password',
          {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
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
      } else {
        setErro(true);
      }
    } catch (error) {
      setErro(true);
    }
  };

  return (
    <>
      <div className="flex justify-center p-20 items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="shadow-lg rounded bg-white p-8 w-full md:w-3/4 lg:w-1/2">
          {succes && (
            <h2 className="text-center text-green-600 text-2xl font-bold">
              Password Updated Successfully
            </h2>
          )}
          <h2 className="text-center text-2xl font-bold mb-4">Change Your Password</h2>
          <form onSubmit={handleSubmit(updatePass)} className="space-y-6">
            <div>
              <Input
                type="password"
                {...register('oldPassword', { required: true })}
                placeholder="Old Password"
                className="mt-2 text-gray-900"
              />
            </div>
            <div>
              <Input
                type="password"
                {...register('newPassword', { required: true })}
                placeholder="New Password"
                minLength="8"
                maxLength="20"
                autoComplete="on"
                pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                className="mt-2 text-gray-900"
              />
            </div>
            <div>
              <Input
                type="password"
                {...register('password', { required: true })}
                placeholder="Confirm New Password"
                className="mt-2 text-gray-900"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              Change Password
            </Button>
          </form>
          {erro && <div className="text-red-500 mt-4">Passwords do not match or there was an error</div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
