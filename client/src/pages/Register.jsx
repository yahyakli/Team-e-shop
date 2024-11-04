import { AiTwotoneFire } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from '../assets/fire.svg';
import Shop_img from '../assets/shop.jpg';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';


const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  password_confirmation: z.string().min(6, { message: "Password must be at least 6 characters long" }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"]
});

const Register = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({})
  const [statusRes, setStatusRes] = useState()

  const postData = async (data) => {
    try {
      const response = await axios.post("", data);
      console.log(response.data);
      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (err) {
      setStatusRes(err.message || "Registration failed");
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
    <div className='w-full h-[100vh] flex items-center justify-center py-4 bg-slate-100'>
      <div className='w-full md:w-1/2 h-fit lg:h-full py-8 lg:py-0 flex bg-white 
                  rounded-xl overflow-hidden shadow-2xl '>
        {/* left */}
        <div className='w-full h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='flex items-center'>
            <span className='text-orange-500 font-semibold cursor-pointer' style={{fontSize:"25px"}}>
              <Link to={'/'}>E-Shop</Link>
            </span>
          </div>
          <p className='text-ascent-1 text-base font-semibold '>
            Create your account
          </p>
          <form className='py-2 flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='name'>
              <label htmlFor="">name </label>
              <input type="text" id='name' 
                placeholder='name'
                className='w-full rounded-md border border-[#66666690] outline-none text-sm px-4 py-3 placeholder:text-[#666]'
                {...register('name')}
              />
              {errors.name && <p className='text-red-500'>{errors.name.message}</p> }
            </div>
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
            <div className='password_confirmation'>
              <label htmlFor="">Password Confirmation</label>
              <input type="password" id='password_confirmation' 
                placeholder='password confirmation'
                className='w-full rounded-md border border-[#66666690] outline-none text-sm px-4 py-3 placeholder:text-[#666]'
                {...register('password_confirmation')}
              />
              {errors?.password_confirmation && <p className='text-red-500'>{errors?.password_confirmation.message}</p> }
            </div>
            <hr />
            <button type="submit" className="btn-style">
              Register
            </button>
          </form>
          <p className='text-center'>Already has an account ? <Link to={'/login'} className='text-orange-400'>Login</Link></p>
        </div> 
      </div>
    </div>
  )
}

export default Register