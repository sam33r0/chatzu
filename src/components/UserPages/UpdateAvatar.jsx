import React, { useState } from 'react';
import { Input } from './../../@/components/ui/input.jsx';
import { Button } from './../../@/components/ui/button.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from './../../components/Footer/Footer.jsx';

function UpdateAvatar() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [succes, setSucces] = useState(false);

  const updateAvat = async (data) => {
    try {
      setErro(false);
      const fdata = new FormData();
      fdata.append('file', data.avatar[0]);
      fdata.append('upload_preset', 'scckzbdr');
      fdata.append('cloud_name', 'de9rb613m');
      const res = await fetch('https://api.cloudinary.com/v1_1/de9rb613m/image/upload', {
        method: 'post',
        body: fdata,
      });
      const avatar = await res.json();
      const response = await axios.post(
        backendUri + '/user/update-avatar',
        { avatar: avatar },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (response) {
        setSucces(true);
        setTimeout(() => navigate('/'), 2000);
      }
      reset();
    } catch (error) {
      setErro(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-20 h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="shadow-lg rounded bg-white p-8 w-full md:w-3/4 lg:w-1/2">
          {succes && (
            <h2 className="text-center text-green-600 text-2xl font-bold">
              Avatar Updated Successfully
            </h2>
          )}
          <h2 className="text-center text-2xl font-bold mb-4">Update Your Avatar</h2>
          <form onSubmit={handleSubmit(updateAvat)} className="space-y-6">
            <div>
              <label htmlFor="fileInput" className="block text-sm font-medium">
                Upload Avatar
              </label>
              <Input type="file" {...register('avatar', { required: true })} id="fileInput" className="mt-2 text-gray-900" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              Update Avatar
            </Button>
          </form>
          {erro && <div className="text-red-500 mt-4">There was a problem updating the avatar!</div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateAvatar;
