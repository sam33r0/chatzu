import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "./../@/components/ui/input"
import { Button } from "./../@/components/ui/button.jsx"
import Logo from './../Logo/Logo.jsx'
import { useForm } from 'react-hook-form'
import axios from 'axios'
function Login() {
    const backendUri = import.meta.env.VITE_BACKEND_URI;
    const loginWithGoogle= ()=>{
        window.open("http://localhost:8000/auth/google/callback","_self")
    }
    const { register, handleSubmit, reset } = useForm();  
    const [erro, setErro] = useState(false);
    const send=(data)=>{
        console.log(data);
    }
  return (
    <div className='h-full mt-3 md:ml-16 item-center pb-4 px-4'>
    <div className='shadow rounded bg-gray-200 mx-4 py-4 md:mx-16 px-4 md:px-8 w-5/6 md:w-4/6 h-full justify-center items-center'>
      <h2 className='text-center text-2xl font-bold leading-tight'>
        Sign In to your account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don't have an account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      <form onSubmit={handleSubmit(send)}>
        <div className='my-8 flex flex-col gap-4'> 
        <label htmlFor="email">Email</label>
          <Input type="email" id="email" {...register("email")} placeholder="Email"></Input>
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" {...register("password", { required: true })} placeholder="password" autoComplete="on"></Input>

        </div>
        <Button className="w-2/6 md:w-1/6" type="submit">Sign In</Button>
      </form>
      <Button className="" onClick={loginWithGoogle}>Sign In With GOOGLE</Button>
      {erro && <div className='text-red-500'>Please check the entered Credentials</div>}
      <div className="my-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
    </div>
  </div>
  )
}

export default Login