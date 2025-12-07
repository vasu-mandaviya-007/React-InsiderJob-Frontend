import React from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useState } from 'react';


const RecruiterLogin = () => {

     const [FormData, setFormData] = useState({
          username: "",
          email: "",
          password: ""
     });

     const handleInputChange = (e) => {
          setFormData({ ...FormData, [e.target.name]: e.target.value });
     }

     return (

          <div className='fixed flex justify-center items-center h-full w-full bg-stone-900/30 backdrop-blur-xs overflow-hidden z-20'>

               <div className='relative flex flex-col justify-center bg-white py-12 px-10 w-[380px] rounded-md'>

                    <MdClose className='absolute top-4 right-4 text-2xl cursor-pointer' />

                    <h1 className='text-3xl text-center font-semibold'>Recruiter Login</h1>

                    <p className='text-center text-gray-600 text-sm'>Welcome back! Please sign in to continue</p>

                    <div className="input-box relative mt-8">
                         <span className='absolute top-1/2 left-4 -translate-y-1/2 text-stone-500 text-lg'><HiOutlineMail /></span>
                         <input
                              className='text-neutral-600 rounded-full px-12 py-2.5 text-[15px] border outline-none focus:border focus:border-blue-400 focus:ring-3 focus:ring-blue-200 border-gray-300 w-full'
                              type="text"
                              name='email'
                              value={FormData.email}
                              onChange={handleInputChange}
                              placeholder='Email Address'
                         />
                    </div>

                    <div className="input-box relative mt-6">
                         <span className='absolute top-1/2 left-4 -translate-y-1/2 text-stone-500 text-sm'><FaLock /></span>
                         <input
                              className='text-neutral-600 rounded-full px-12 py-2.5 text-[14px] border outline-none focus:border focus:border-blue-400 focus:ring-3 focus:ring-blue-200 border-gray-300 w-full'
                              type="text"
                              name='password'
                              value={FormData.password}
                              onChange={handleInputChange}
                              placeholder="Password"
                         />
                    </div>

                    <a className='w-fit text-blue-500 hover:decoration-1 hover:underline hover:underline-offset-4 text-sm font-semibold mt-6 mb-3 text-left px-2' href="">Forget password?</a>

                    <button onClick={() => console.log(FormData)} className='bg-primary hover:bg-primary-hover p-2 duration-200 text-white font-semibold text-lg rounded-full'>Login</button>

                    <p className='text-center text-[14px] text-gray-600 tracking-wider mt-5 '>Don't have an account? <a href="" className='text-blue-500 font-semibold underline underline-offset-4'>Sign up</a> </p>

               </div>

          </div>

     );

}

export default RecruiterLogin;
