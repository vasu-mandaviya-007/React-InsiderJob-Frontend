import { IconButton } from '@mui/material';
import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { assets } from '../assets/assets';
import { IoMdTime } from 'react-icons/io';

const NotificationBar = ({ OpenNotificationbox, setOpenNotificationbox }) => {
     return (
          <div className={`fixed flex flex-col justify-around top-0 right-0 rounded-tl-2xl rounded-bl-2xl overflow-hidden w-1/3 duration-500 text-black dark:text-white  ${OpenNotificationbox ? "-translate-x-0" : "translate-x-[105%]"} h-full z-[99999] bg-white dark:bg-sidebar-dark shadow-lg border-2 border-gray-200 dark:shadow-lg dark:shadow-gray-600`}>

               <h1 className='flex items-center justify-between z-[1] px-5 shadow border-b border-b-gray-200 py-5  font-semibold'>
                    Notification
                    <IconButton onClick={() => setOpenNotificationbox(false)} color="secondary" className=' !text-white !bg-red-500 !rounded-none !p-1' aria-label="add an alarm">
                         <IoCloseSharp />
                    </IconButton>
               </h1>

               <div className='py-2 h-full'>
                    <div className='flex relative items-center bg-gradient-to-tl from-sky-300 to-blue-200 gap-4 hover:bg-gray-100 border-b border-b-gray-300  px-4 py-3 ' >
                         <img src={assets.profile_img} className='h-10 w-10 rounded-full' alt="" />
                         <div className="flex justify-center flex-col" >
                              <h1 className='text-sm font-medium'>Vasu mandaviya posted his certificate</h1>
                              <p className="flex items-center gap-1 text-xxs text-gray-500 " > <IoMdTime className='text-sm text-gray-700' /> 20m ago</p>
                         </div>
                         <span className='absolute right-5 h-2 w-2 bg-blue-500 rounded-full'></span>
                    </div>
                    <div className='flex items-center gap-4 hover:bg-gray-100 border-b border-b-gray-300 px-4 py-3 ' >
                         <img src={assets.profile_img} className='h-10 w-10 rounded-full' alt="" />
                         <div className="flex justify-center flex-col" >
                              <h1 className='text-sm font-medium'>Vasu mandaviya posted his certificate</h1>
                              <p className="text-xs" >20m ago</p>
                         </div>
                    </div>
               </div>

               <div className='border-t border-t-gray-200 shadow px-4 py-3 bg-blue-500 text-white text-center font-semibold cursor-pointer hover:bg-blue-600'>
                    View All Notification
               </div>

          </div>
     );
}

export default NotificationBar;
