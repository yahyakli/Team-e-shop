import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/user-slice';


const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [statusRes, setStatusRes] = useState()

  const postData = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", data);
      const token = response?.data?.user;
      if (token) {
        dispatch(login(token)); // Dispatch the login action with token
        navigate('/'); // Redirect to home after login
      }
    } catch (err) {
      setStatusRes(err.message || "Login failed");
      console.log(err);
    }
  };

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data) => {
    console.log("form data: ", data)
    postData(data)
  }

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center py-4 bg-slate-100'>
      <div className='w-full lg:w-1/2 h-fit lg:h-full py-8 lg:py-0 flex bg-white
                  rounded-xl overflow-hidden shadow-xl'>
        {/* left */}
        <div className='w-full h-full p-10 2xl:px-20 gap-3 flex flex-col justify-center'>
          <div className='flex items-center'>
          <span className='text-orange-500 font-semibold cursor-pointer' style={{fontSize:"25px"}}>
              <Link to={'/'}>E-Shop</Link>
            </span>
          </div>
          <p className='text-ascent-1 text-base font-semibold '>
            Login to your account
          </p>
          <p className='text-ascent-1 text-base font-semibold '>
            Welcome back
          </p>
          <form className='py-2 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='email'>
              <label htmlFor="">Email</label>
              <input type="email" id='email' 
                placeholder='email'
                className='w-full rounded-md border border-[#66666690] outline-none text-sm px-4 py-3 placeholder:text-[#666]'
                {...register('email')}
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p> }
            </div>
            <div className='password'>
              <label htmlFor="">Password</label>
              <input type="password" id='password' 
                placeholder='password'
                className='w-full rounded-md border border-[#66666690] outline-none text-sm px-4 py-3 placeholder:text-[#666]'
                {...register('password')}
              />
              {errors?.password && <p className='text-red-500'>{errors?.password.message}</p> }
            </div>
            <button type="submit" className="btn-style">
              Login
            </button>
          </form>
          <p className='text-center'>Don't have an account ? <Link to={'/register'} className='text-orange-400'>Create Account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login