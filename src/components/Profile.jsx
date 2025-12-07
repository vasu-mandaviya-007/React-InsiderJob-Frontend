import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useUser } from '@clerk/clerk-react';
import { FaCamera, FaPen, FaPlus, FaUserAlt } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import EditProfilePopup from './EditProfilePopup';
import Swal from "sweetalert2";

const Profile = () => {

     const { user } = useUser();

     const [coverImg, setcoverImg] = useState("");

     const [pageNo, setpageNo] = useState(1);

     const { userData, setuserData } = useContext(AppContext);

     const [showEditProfilebox, setshowEditProfilebox] = useState(true);

     const handleEditProfileOpen = () => {
          setshowEditProfilebox(true);
          window.scrollTo(0, 0);
     }

     const handleEditProfileClose = () => {

          Swal.fire({
               title: "Discart Changes",
               text: "Are You Sure that you want to discard your changes?",
               icon: "question",
               showCancelButton: true,
               showConfirmButton: true,
               showCloseButton: true,
               confirmButtonText: "Discart",
          }).then((result) => {
               if (result.isConfirmed)

                    if (pageNo > 1) {
                         setpageNo(pageNo - 1);
                    }
                    else {
                         setshowEditProfilebox(false);
                    }

          })

     }

     return (

          <div className='bg-light-bg dark:bg-dark-primary text-black dark:text-white p-8 px-20 min-h-[700px]'>

               <div onClick={handleEditProfileClose} className={`${!showEditProfilebox && "hidden"} z-10 duration-300 fixed top-0 left-0 w-full h-full bg-black/30`}></div>

               <EditProfilePopup showEditProfilebox={showEditProfilebox} handleEditProfileClose={handleEditProfileClose} pageNo={pageNo} setpageNo={setpageNo} />

               <div className='bg-white w-full min-h-[200px] rounded-2xl overflow-hidden shadow'>

                    {/* <div className=" w-full h-[200px] bg-gradient-to-tl from-gray-500 via-gray-400 to-gray-500" ></div> */}
                    <div
                         style={{
                              background: `linear-gradient(180deg, #161c2d00 0%, #161c2d80 25%, #161c2dbf 50%, #161c2d 100%),url(${coverImg !== "" ? URL.createObjectURL(coverImg) : assets.banner})`,
                              backgroundPosition: "0 15%",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                         }}
                         className='h-[250px] relative'
                    >

                         <label className="absolute flex items-center gap-2 group cursor-pointer top-4 right-4 text-white  text-xl bg-white/20 hover:bg-white/30 p-2.5 rounded-full" >
                              <FaCamera />
                              {/* <p className='text-sm hidden group-hover:block'>change cover image</p> */}
                              <input type="file" className='hidden' onChange={(e) => setcoverImg(e.target.files[0])} />
                         </label>

                         {/* <img className='w-full h-full' src="https://replay.software/updates/images/sleeve-2-2-backdrop.jpg" alt="" /> */}
                         {/* <img className='w-full object-center' src={assets.banner} alt="" /> */}
                    </div>

                    {/* <div className="min-h-[200px] flex " >

                         <div className=' flex flex-col items-start ml-4'>

                              <div className='h-20 w-full relative'>
                                   <div className="absolute -top-20 left-10 w-40 h-40 ">
                                        <div className='relative rounded-full overflow-hidden group'>

                                             <img className='border-4 border-white rounded-full' src={user?.imageUrl} alt="" />
                                             <label htmlFor='profile-image' className='group-hover:bg-black/40 cursor-pointer group-hover:opacity-100 opacity-0 flex flex-col gap-3 items-center justify-center duration-300 rounded-full absolute w-full h-full top-0 leading-0 z-10'>
                                                  <FaPlus className='text-white text-3xl' />
                                                  <p className='font-semibold text-white'>Add Photo</p>
                                             </label>
                                             <input type="file" className='hidden' id='profile-image' />
                                        </div>
                                   </div>
                              </div>

                              <div className='pl-12 py-2 pb-8 text-nowrap'>
                                   <h2 className="font-semibold text-nowrap text-2xl" >{user?.fullName}</h2>
                                   <p className='text-base text-neutral-700 font-semibold'>Software Developer At Google</p>
                                   <p className='text-sm mt-1 text-gray-600 font-light'>{userData?.city + ", " + userData?.state + ", " + userData.country}</p>

                                   <p className="mt-2 cursor-pointer text-sm font-semibold text-blue-500" >500+ connections</p>
                              </div>

                         </div>

                         <div className='flex relative border justify-center p-4 w-full h-[200px]'>

                              <div className='flex h-fit  items-center gap-2'>
                                   <div className="flex items-center gap-5 pl-4 pr-8 py-2 border border-gray-300 bg-sky-100" >
                                        <FaUserAlt className="p-3 border text-[43px] bg-[#363636]  hover:bg-white text-white  hover:text-sky-400 hover:border duration-300" />
                                        <div className='flex flex-col' >
                                             <span className='text-blue-500 font-semibold '>500+</span>
                                             <p className='-mt-1 text-black/80 font-semibold '>connections</p>
                                        </div>
                                   </div>
                                   <div className="flex items-center gap-5 pl-4 pr-8 py-2 border border-gray-300 bg-[#f7f7f7]" >
                                        <FaPen className="p-3 border text-[43px] bg-[#363636]  hover:bg-white text-white  hover:text-sky-400 hover:border duration-300 " />
                                        <div className='flex flex-col' >
                                             <span className='text-blue-500 font-semibold '>50</span>
                                             <p className='-mt-1 text-black/80 font-semibold '>Posts</p>
                                        </div>
                                   </div>
                              </div>

                              <Button onClick={handleEditProfile} className="!absolute !right-4 !top-4" variant='contained' startIcon={<FaPen className='!text-sm ' />} >Edit Profile</Button>


                         </div>

                    </div> */}

                    <div className="min-h-[190px] relative flex " >


                         <div className='absolute -top-12 left-10'>
                              <div className='group rounded-full '>
                                   <img src={user?.imageUrl}
                                        className="w-50 rounded-full border-4 border-white h-50 grow relative"
                                        alt=""
                                   />
                                   <label htmlFor='profile-image' className='group-hover:bg-black/40 cursor-pointer group-hover:opacity-100 opacity-0 flex flex-col gap-3 items-center justify-center duration-300 rounded-full absolute w-full h-full top-0 leading-0'>
                                        <FaPlus className='text-white text-3xl' />
                                        <p className='font-semibold text-white'>Add Photo</p>
                                   </label>
                                   <input type="file" className='hidden' id='profile-image' />
                                   {/* <div class="absolute rounded-full inset-0 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 group-hover:before:opacity-50 before:transition-opacity before:duration-300"></div> */}
                              </div>
                         </div>

                         <div className='ml-66 py-4 text-nowrap'>

                              <h1 className="font-bold text-nowrap text-4xl" >{user?.fullName}</h1>
                              <p className='text-base text-neutral-700 mt-1 font-semibold'>Software Developer At Google</p>
                              <p className='text-sm mt-1 text-gray-600 font-light'>{userData?.city + ", " + userData?.state + ", " + userData.country}</p>

                              {/* <p className="mt-2 cursor-pointer text-sm font-semibold text-blue-500" >500+ connections</p> */}
                         </div>

                         <div className='flex relative justify-end p-4 w-full'>

                              <div className='flex h-fit  items-end gap-2'>
                                   <div className="flex items-center gap-5 min-w-50 pl-4 pr-8 py-2 border border-gray-300 bg-sky-100 cursor-pointer" >
                                        <FaUserAlt className="p-3 border text-[43px] bg-[#363636]  hover:bg-blue-400 text-white  hover:text-white hover:border duration-300" />
                                        <div className='flex flex-col' >
                                             <span className='text-blue-500 font-semibold '>500+</span>
                                             <p className='-mt-1 text-black/80 font-semibold '>connections</p>
                                        </div>
                                   </div>
                                   <div className="flex items-center gap-5 min-w-50 pl-4 pr-8 py-2 border border-gray-300 bg-sky-100 cursor-pointer" >
                                        <FaPen className="p-3 border text-[43px] bg-[#363636]  hover:bg-blue-400 text-white  hover:text-white hover:border duration-300 " />
                                        <div className='flex flex-col' >
                                             <span className='text-blue-500 font-semibold '>50</span>
                                             <p className='-mt-1 text-black/80 font-semibold '>Posts</p>
                                        </div>
                                   </div>
                              </div>

                              <Button onClick={handleEditProfileOpen} className="!absolute !right-4 !top-26" variant='contained' startIcon={<FaPen className='!text-sm ' />} >Edit Profile</Button>

                         </div>

                    </div>

               </div>

               <div className='bg-white mt-8 w-full min-h-[200px] rounded-2xl overflow-hidden shadow'>

                    <div className={`dark:bg-stone-900 dark:text-white duration-300 text-gray-800 h-full w-[20%] sticky p-2.5 top-0 border-r border-r-gray-300 shadow dark:border-r-gray-800 `}>

                         <ul className='recruiter-container flex flex-col gap-1 items-start pt-5'>

                              <NavLink to={"/recruiter"} end className={({ isActive }) => `nav-link ${location.pathname === "/recruiter" || location.pathname === "/recruiter/" ? 'active' : ''}`}>

                                   <img className='min-w-5 w-5 ' src={assets.dashboard_icon} alt="" />
                                   <p className='max-sm:hidden text-sm'>Dashbord</p>

                              </NavLink>

                              <NavLink to={"/recruiter/add-job"} className={({ isActive }) => `nav-link ${isActive && 'active'}`}>

                                   {/* <FaRegPlusSquare /> */}
                                   <img className='min-w-5 w-5 ' src={assets.job_Icon} alt="" />
                                   <p className='max-sm:hidden text-sm'>Add Job</p>

                              </NavLink>

                              <NavLink to={"/recruiter/manage-job"} className={({ isActive }) => `nav-link ${isActive && 'active'}`}>

                                   <img className='min-w-5 w-5 ' src={assets.manage_job} alt="" />
                                   <p className='max-sm:hidden text-sm'>Manage Jobs</p>

                              </NavLink>

                              <NavLink to={"/recruiter/view-applications"} className={({ isActive }) => `nav-link ${isActive && 'active'}`}>


                                   {/* <BsPersonFillCheck /> */}
                                   <img className='min-w-5 w-5 ' src={assets.view_application} alt="" />
                                   <p className='max-sm:hidden text-sm'>View Applications</p>

                              </NavLink>

                              <NavLink to={"/recruiter/notification"} className={({ isActive }) => `nav-link ${isActive && 'active'}`}>

                                   {/* <FaBell /> */}
                                   <img className='min-w-5 w-5 ' src={assets.notification_icon} alt="" />
                                   <p className='max-sm:hidden text-sm'>Notification</p>

                              </NavLink>

                              <NavLink to={"/recruiter/message"} className={({ isActive }) => `nav-link ${isActive && 'active'}`}>

                                   {/* <RiMessage2Line /> */}
                                   <img className='min-w-5 w-5 ' src={assets.message_icon} alt="" />
                                   <p className='max-sm:hidden text-sm'>Message</p>

                              </NavLink>

                              <NavLink to={"/recruiter/setting"} className={({ isActive }) => `nav-link ${isActive && 'active'}`}>

                                   {/* <IoSettingsSharp /> */}
                                   <img className='min-w-5 w-5 ' src={assets.setting_icon} alt="" />
                                   <p className='max-sm:hidden text-sm'>Setting</p>

                              </NavLink>

                         </ul>

                    </div>

               </div>


          </div>

     );
}

export default Profile;
