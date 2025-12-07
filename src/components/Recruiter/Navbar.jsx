import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import Swal from 'sweetalert2';

import { FaBell } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { NavLink } from 'react-router-dom';



const Navbar = () => {

     const { companyData, setcompanyData, IsLoading, setIsLoading, } = useContext(AppContext);

     // const { DarkMode, setDarkMode } = useContext(AppContext);
     const { Role, setRole } = useContext(AppContext);
     const [DarkMode, setDarkMode] = useState(false);
     const [OpenMenu, setOpenMenu] = useState(false);
     const [OpenNotificationbox, setOpenNotificationbox] = useState(false);

     const dropdownRef = useRef(null);

     const handleModeChange = () => {
          setDarkMode(!DarkMode);
          if (document.documentElement.classList.contains("dark")) {
               document.documentElement.classList.remove("dark")
          } else {
               document.documentElement.classList.add("dark")
          }
     }

     useEffect(()=>{
          console.log(companyData);
     },[companyData])

     const handleLogOut = () => {

          Swal.fire({
               title: 'Are you sure?',
               text: "After Logout You have to login again!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: `<i class="fa-solid fa-power-off"></i> Logout`,
               cancelButtonText: 'Cancel',
               showLoaderOnConfirm: true,
          })
               .then(async (result) => {
                    if (result.isConfirmed) {
                         await Swal.fire({
                              title: "Logout Successfull",
                              icon: "success",
                         });
                         localStorage.removeItem("JobPortalAuthToken");
                         window.location.replace('/')
                    }
               })

          // localStorage.removeItem("JobPortalAuthToken");
     }

     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setOpenMenu(false);
               }
          };

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
               document.removeEventListener("mousedown", handleClickOutside);
          };
     }, []);

     return !companyData ? (
          <></>
     ) : (

          <div className='shadow bg-gray-900 dark:bg-black text-white py-3 max-sm:py-3'>

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
                                   onBlur={() => setOpenNotificationbox(false)} onClick={() => { OpenNotificationbox ? setOpenNotificationbox(false) : setOpenNotificationbox(true) }}
                                   className='text-gray-400  bg-white/10 hover:text-white focus:text-white hover:outline-2 focus:outline-2 focus:outline-offset-1 hover:outline-white focus:outline-white duration-100 rounded-full h-8 w-8 flex items-center justify-center'
                              ><FaBell /></button>

                              <div className={`${!OpenNotificationbox ? "scale-75 opacity-0" : "scale-100 opacity-100"} absolute w-[200px] right-0 top-[45px] bg-white text-black shadow origin-top-right duration-300 rounded py-1`}>
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
                              </div>

                         </div>

                         {Role === "user" && <p className='font-semibold'>Hi, Vasu</p>}

                         <div className='relative group flex items-center' ref={dropdownRef}>

                              <button onClick={() => { OpenMenu ? setOpenMenu(false) : setOpenMenu(true) }} className='h-9 outline-2 outline-white overflow-hidden rounded-full focus:outline-2 focus:outline-offset-2'>
                                   <img className='h-full  ' src={companyData.image} alt="" />
                              </button>

                              <div className={`${!OpenMenu ? "scale-75 opacity-0 pointer-events-none" : "scale-100 pointer-events-auto opacity-100"} absolute w-[200px] right-0 z-30 top-[45px] bg-white text-black shadow origin-top-right duration-300 rounded py-1`}>

                                   <ul className='text-gray-800' onClick={() => { setOpenMenu(false) }}>

                                        <li className='hover:bg-gray-100 text-sm flex items-center cursor-pointer px-4 py-2'>
                                             <img src={assets.profile_icon} className='h-4 mr-2' alt="" />
                                             My Profile
                                        </li>

                                        <li className='hover:bg-gray-100 text-sm flex items-center cursor-pointer px-4 py-2'>
                                             <img src={assets.setting_icon} className='h-4 mr-2' alt="" />
                                             Setting
                                        </li>

                                        <li onClick={handleLogOut} className='hover:bg-gray-100 text-sm flex items-center cursor-pointer px-4 py-2'>
                                             <img src={"https://img.icons8.com/?size=100&id=0nJEXu0vsXkr&format=png&color=000000"} className='h-4 mr-2' alt="" />
                                             Sign Out
                                        </li>

                                   </ul>

                              </div>

                         </div>


                    </div>

               </div>

          </div>

     );

}

export default Navbar;
