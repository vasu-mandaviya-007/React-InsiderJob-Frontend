import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

import { FaBell, FaClipboardList, FaUserCircle } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { Button } from '@mui/material';
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotificationBar from './NotificationBar';


const Navbar = () => {

     const navigate = useNavigate();

     const { showRecruiterLogin, setshowRecruiterLogin, Role, setRole } = useContext(AppContext);

     const { openSignIn, signOut, openUserProfile } = useClerk();
     const { user } = useUser();

     const [showProfile, setshowProfile] = useState(false);
     const [DarkMode, setDarkMode] = useState(false);
     const [OpenMenu, setOpenMenu] = useState(false);
     const [OpenNotificationbox, setOpenNotificationbox] = useState(false);

     const handleModeChange = () => {
          setDarkMode(!DarkMode);
          if (document.documentElement.classList.contains("dark")) {
               document.documentElement.classList.remove("dark")
          } else {
               document.documentElement.classList.add("dark")
          }
     }

     const [isLogingOut, setisLogingOut] = useState(false);

     const handleLogout = () => {

          setisLogingOut(true);

          setTimeout(() => {
               signOut();
               setisLogingOut(false)
          }, 2000);

     } 

     return (

          <div className='sticky top-0 z-10 shadow-lg bg-[#262626] dark:bg-black text-white py-4 max-sm:py-3'>

               <div className='container flex justify-between items-center px-0 2xl:px-20 mx-auto'>

                    <NavLink to={"/recruiter"}>
                         <img className='max-sm:h-6 cursor-pointer' src={assets.light_logo} alt="" />
                    </NavLink>

                    <div className='flex items-center gap-5'>


                         <button
                              onClick={handleModeChange}
                              className='text-white bg-white/10 hover:text-white  hover:outline-2   hover:outline-white  duration-100 rounded-full h-8 w-8 flex items-center justify-center'
                         >
                              <BsMoonStarsFill className={`absolute duration-500 ${DarkMode ? " scale-100 opacity-100 rotate-360" : "opacity-0 rotate-180"}`} />
                              <MdWbSunny className={`absolute duration-500 ${!DarkMode ? "scale-100 opacity-100 rotate-0" : "opacity-0 rotate-180"}`} />
                         </button>

                         <div className='relative'>

                              <button
                                   onClick={() => { OpenNotificationbox ? setOpenNotificationbox(false) : setOpenNotificationbox(true) }}
                                   className='text-gray-400  bg-white/10 hover:text-white focus:text-white hover:outline-2 focus:outline-2 focus:outline-offset-1 hover:outline-white focus:outline-white duration-100 rounded-full h-8 w-8 flex items-center justify-center'
                              ><FaBell /></button>

                              <NotificationBar setOpenNotificationbox={setOpenNotificationbox} OpenNotificationbox={OpenNotificationbox} />

                              {/* <div className={`${!OpenNotificationbox ? "scale-75 opacity-0 pointer-events-none" : "scale-100 opacity-100 pointer-events-auto"} absolute w-[200px] right-0 top-[45px] bg-white text-black shadow origin-top-right duration-300 rounded py-1`}>
                                   <ul className='text-gray-800'>
                                        <li className='hover:bg-gray-100 text-sm flex items-center cursor-pointer px-4 py-2'>
                                             <img src={assets.profile_icon} className='h-4 mr-2' alt="" />
                                             My Profile
                                        </li>

                                        <li className='hover:bg-gray-100 text-sm flex items-center cursor-pointer px-4 py-2'>
                                             <img src={assets.setting_icon} className='h-4 mr-2' alt="" />
                                             Setting
                                        </li>

                                        <li className='hover:bg-gray-100 text-sm flex items-center cursor-pointer px-4 py-2'>
                                             <img src={"https://img.icons8.com/?size=100&id=0nJEXu0vsXkr&format=png&color=000000"} className='h-4 mr-2' alt="" />
                                             Sign Out
                                        </li>

                                   </ul>
                              </div> */}

                         </div>


                         {
                              user
                                   ? <div className='flex items-center gap-3 relative'>
                                        {Role === "user" && <p className='font-semibold'>Hi, {user.firstName}</p>}
                                        {/* <UserButton /> */}

                                        <div style={{ display: showProfile ? "flex" : "none" }} onClick={() => setshowProfile(false)} className='fixed w-full h-full  z-[2] left-0 top-0'></div>

                                        <button onClick={() => setshowProfile(!showProfile)} className='relative group overflow-hidden z-[5] rounded-full'>
                                             <img src={user.imageUrl} className='h-8 w-8' alt="" />
                                             <span className='absolute border -skew-x-30 -translate-x-10 group-hover:translate-x-10 duration-600 w-4 h-12 z-10 bg-gray-200/40 -top-2 left-2'></span>
                                        </button>

                                        <div className={` ${showProfile ? "opacity-100 translate-y-0 z-10 pointer-events-auto" : "opacity-0 translate-y-5 -z-10 pointer-events-none"} duration-300 absolute bg-white text-black w-[376px] overflow-hidden rounded-xl right-0 top-[120%] border border-gray-300 shadow-2xl `}>

                                             <div className='flex items-center gap-4 py-3.5 px-4 border-b border-b-gray-200'>
                                                  <img src={user.imageUrl} className='h-10 w-10 rounded-full' alt="" />
                                                  <div>
                                                       <p className='text-sm'>{user.fullName}</p>
                                                       <p className='text-xs'>{user.emailAddresses[0].emailAddress}</p>
                                                  </div>
                                             </div>

                                             <div className='flex flex-col items-center text-[13px] text-neutral-600'>

                                                  <button
                                                       onClick={() => {
                                                            navigate("/profile")
                                                            setshowProfile(false);
                                                       }}
                                                       className="flex items-center hover:bg-gray-100 w-full gap-6 px-7 py-4 border-b border-gray-200"
                                                  >
                                                       <FaUserCircle className='text-gray-700 text-base' />
                                                       Profile
                                                  </button>

                                                  <button
                                                       onClick={() => openUserProfile()}
                                                       className="flex items-center hover:bg-gray-100 w-full gap-6 px-7 py-4 border-b border-gray-200" >
                                                       <IoMdSettings className='text-gray-700 text-base' />
                                                       Manage account
                                                  </button>

                                                  <button
                                                       onClick={() => {
                                                            navigate("/applications")
                                                            setshowProfile(false);
                                                       }}
                                                       className="flex items-center hover:bg-gray-100 w-full gap-6 px-7 py-4 border-b border-gray-200"
                                                  >
                                                       <FaClipboardList className='text-gray-700 text-base' />
                                                       View Job Application
                                                  </button>

                                                  <button
                                                       onClick={handleLogout}
                                                       disabled={isLogingOut}
                                                       className="flex items-center hover:bg-gray-100 w-full gap-6 px-7 py-4 border-b border-gray-200" >
                                                       {
                                                            isLogingOut
                                                                 ?
                                                                 <AiOutlineLoading3Quarters className='animate-spin duration-100' />
                                                                 :
                                                                 <TbLogout className='text-gray-700 text-base' />
                                                       }
                                                       Logout
                                                  </button>

                                             </div>

                                        </div>

                                   </div>
                                   :
                                   <div className='flex gap-4 max-sm:text-xs bg-gray-700 pl-4  rounded-full'>
                                        <button onClick={() => setshowRecruiterLogin(true)} className='text-neutral-400 text-[13px] '>Recruiter Login</button>
                                        {/* <SignInButton mode="modal"> */}
                                        <Button onClick={(e) => openSignIn()} variant='contained' className='!rounded-full !px-8' >Login</Button>
                                        {/* </SignInButton> */}
                                   </div>
                         }


                    </div>

               </div>

          </div>

          // <div className="shadow shadow-gray-200 sticky top-0 bg-white z-50 py-3 max-sm:py-3">
          //      <div className='container flex justify-between items-center px-4 2xl:px-20 mx-auto'>
          //           <NavLink to={"/"}>
          //                <img className='max-sm:h-6 cursor-pointer' src={assets.logo} alt="" />
          //           </NavLink>

          //           {
          //                user
          //                     ? <div className='flex items-center gap-3'>
          //                          <Link to={"/applications"}>Applied Jobs</Link>
          //                          <p> | </p>
          //                          <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
          //                          <UserButton />
          //                     </div>
          //                     : <div className='flex gap-4 max-sm:text-xs'>
          //                          <button onClick={() => setshowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
          //                          <SignInButton mode="modal">
          //                               <button onClick={(e) => openSignIn()} className='rounded-full bg-primary hover:bg-blue-700 px-6 sm:px-9 py-2 text-white '>Login</button>
          //                          </SignInButton>
          //                     </div>
          //           }

          //      </div>
          // </div>
     );
}

export default Navbar;
