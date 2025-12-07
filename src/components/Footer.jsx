import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
     return (
          <div className='bg-[#282828]'>

               <div className='border-b px-26 border-b-[#363636]'>

                    <div className="container h-[96px] flex items-center justify-between">

                         <NavLink to={"/"}>
                              <img width={160} className='cursor-pointer' src={assets.light_logo} alt="" />
                         </NavLink>

                         <div className='flex items-center gap-3 h-full'>

                              <div className='flex gap-4 px-10 items-center h-full border-l border-l-[#363636]'>
                                   <p className='bg-[#363636] text-white hover:bg-white hover:text-black duration-300 h-12 rounded w-12 flex items-center justify-center'>
                                        <BusinessCenterIcon />
                                   </p>
                                   <div className='flex flex-col'>
                                        <strong className='text-white'>1124</strong>
                                        <span className='text-gray-400 text-sm'>Job Listings</span>
                                   </div>
                              </div>

                              <div className='flex gap-4 pl-10 items-center h-full border-l border-l-[#363636]'>
                                   <p className='bg-[#363636] text-white text-2xl hover:bg-white hover:text-black duration-300 h-12 rounded w-12 flex items-center justify-center'>
                                        <IoPeople />
                                   </p>
                                   <div className='flex flex-col'>
                                        <strong className='text-white'>450</strong>
                                        <span className='text-gray-400 text-sm'>Resumes Posting</span>
                                   </div>
                              </div>

                         </div>

                    </div>

               </div>

               <div className='flex lg:flex-row flex-col lg:px-26 px-20 py-16'>

                    <div className='lg:w-2/3 w-full grid grid-cols-4'>

                         <div className='flex flex-col gap-4 text-[#909090] text-sm'>
                              <h3 className='text-white font-semibold text-lg'>For Candidates</h3>
                              <ul className='footer-link-container flex flex-col gap-1'>
                                   <li>Browse Jobs</li>
                                   <li>Browse Categories</li>
                                   <li>Candidate Dashboard</li>
                                   <li>Job Alerts</li>
                                   <li>My Bookmarks</li>
                              </ul>
                         </div>

                         <div className='flex flex-col gap-4 text-[#909090] text-sm'>
                              <h3 className='text-white font-semibold text-lg'>For Employers</h3>
                              <ul className='footer-link-container flex flex-col gap-1'>
                                   <li>Browse Candidates</li>
                                   <li>Employer Dashboard</li>
                                   <li>Add Job</li>
                                   <li>Packages</li>
                              </ul>
                         </div>

                         <div className='flex flex-col gap-4 text-[#909090] text-sm'>
                              <h3 className='text-white font-semibold text-lg'>Other</h3>
                              <ul className='footer-link-container flex flex-col gap-1'>
                                   <li>Job Page</li>
                                   <li>Task Page</li>
                                   <li>Resume Page</li>
                                   <li>Blog</li>
                                   <li>Contact</li>
                              </ul>
                         </div>

                         <div className='flex flex-col gap-4 text-[#909090] text-sm'>
                              <h3 className='text-white font-semibold text-lg'>Legal</h3>
                              <ul className='footer-link-container flex flex-col gap-1'>
                                   <li>Privacy Policy</li>
                                   <li>Terms of Use</li>
                                   <li>FAQ</li>
                              </ul>
                         </div>

                    </div>

                    <div className='lg:w-1/3 lg:mt-0 mt-10 w-full text-white'>

                         <h2 className='flex items-center gap-2 font-semibold'><MdOutlineMail className='text-xl' />Sign Up for a Newsletter</h2>
                         <p className='text-[#909090] mt-3'>Weekly breaking news, analysis and cutting edge advices on job searching.</p>
                         <div className='flex items-center gap-2 mt-4'>
                              <input type="text" className='py-3 rounded px-5 bg-[#333333] outline-none text-[#909090]' placeholder='Enter your email here' />
                              <button className='bg-primary hover:bg-blue-700 font-semibold rounded p-3 px-4'>Subscribe</button>
                         </div>

                    </div>

               </div>

               <div className='flex justify-between items-center py-5 px-26 border-t border-t-[#363636]'>

                    <p className='flex-1 text-sm text-[#909090] font-semibold max-sm:hidden'>Copyright @vasu mandaviya | All right reserved.</p>

                    <div className='flex gap-2'>
                         <FaFacebookSquare className='text-3xl text-blue-600' />
                         <FaInstagram className='text-3xl text-[#FF0069]' />
                         <FaTwitterSquare className='text-3xl text-[#1DA1F2]' />
                         <FaLinkedin className='text-3xl text-[#0A66C2]' />

                    </div>

               </div>

          </div>
     );
}

export default Footer;
