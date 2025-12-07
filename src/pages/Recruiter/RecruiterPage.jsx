import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Recruiter/Navbar';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';


const RecruiterPage = () => {

     const { Role, setRole } = useContext(AppContext);
     const navigate = useNavigate();


     return (

          <div className='recruiter-container dark:text-white w-full max-h-screen h-screen overflow-hidden'>

               <Navbar />

               {/* <div className="overlay fixed h-full w-full bg-black/40 z-20 top-0 left-0"></div> */}

               <section className='flex h-full w-full max-h-[91vh]'>

                    {/* SideBar */}

                    <div className={`dark:bg-stone-900 dark:text-white duration-300 text-gray-800 h-full w-[20%] sticky p-2.5 top-0 border-r border-r-gray-300 shadow dark:border-r-gray-800 `}>

                         <ul className='flex flex-col gap-1 items-start pt-5'>

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


                    <div className=' w-[80%] overflow-y-scroll dark:bg-neutral-900 bg-light-bg '>
                         <Outlet />
                    </div>

               </section>



          </div>

     );

}

export default RecruiterPage;
