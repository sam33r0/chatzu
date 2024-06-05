import { Input } from '../../@/components/ui/input.jsx';
import { Button } from '../../@/components/ui/button.jsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function AddContact() {
    const backendUri = import.meta.env.VITE_BACKEND_URI;
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [success, setSuccess] = useState(false);
    const [errorM, setErrorM] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const submitData = async (data) => {
        console.log(data, "AccessToken here", accessToken);
        try {
            const response = await axios.post(`${backendUri}/contact/create`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
            });
            console.log(response.status);
            if (response.status === 201) {
                setSuccess(true);
                setTimeout(() => { setSuccess(false) }, 2500);
                reset()
            }
        } catch (err) {
            setErrorM(true);
            console.log(errorM, "from error");
            setTimeout(() => { setErrorM(false) }, 2500);
        }
    };

    return (
        <>
            {success && (
                <div className="bg-green-600 text-white py-4 px-6 md:px-12 shadow-lg h-14 flex justify-center items-center">
                    <h2 className="text-xl font-extrabold text-center">Connection Added</h2>
                </div>
            )}
            {errorM && (
                <div className="bg-red-600 text-white py-4 px-6 md:px-12 shadow-lg h-14 flex justify-center items-center">
                    <h2 className="text-xl font-extrabold text-center">Unable to add Connection</h2>
                </div>
            )}
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-6 md:px-12 shadow-lg h-screen flex justify-center items-center'>
                <div className='bg-white rounded-lg shadow-lg p-8 w-5/6 md:w-2/3 lg:w-1/2'>
                    <h2 className='text-3xl font-extrabold text-center mb-8 text-gray-700'>Add a New Contact</h2>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitData)}>
                        <Input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder='Enter email to add to contact'
                            className="p-2 border border-gray-300 rounded bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200"
                        />
                        <div className='flex justify-center'>
                            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-2 px-4 rounded hover:from-blue-700 hover:to-purple-800">
                                Add to Contact
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddContact;
