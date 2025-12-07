import React, { useEffect } from 'react';
import kconvert from "k-convert"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { Button, Checkbox } from '@mui/material';

import { IoLocationOutline } from "react-icons/io5";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { MdOutlineOpenInNew, MdAccessTime } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";


const JobCard = ({ className, job, view }) => {

     const Navigate = useNavigate();

     const handleSaveJob = (e) => {
          if (e.target.checked) {
               console.log(e.target)
          }
     }


     return (

          // <div data-aos="fade-up" data-aos-once="true" data-aos-duration="1500" className={`${className} p-6 rounded-lg hover:shadow-[0_5px_20px_0_rgba(23,25,107,0.1)] cursor-pointer bg-white dark:bg-[#232323] dark:text-white border border-black/5 shadow-full-shadow `}>
          <div onClick={() => { Navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className={`${className} lg:p-6 sm:p-4 rounded-lg hover:shadow-[0_0px_10px_0_rgba(0,0,0,.15)]  hover:border hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer bg-white dark:bg-dark-box-bg dark:text-white border border-black/5 shadow-full-shadow `}>
          {/* // <div className={`${className} lg:p-6 sm:p-4 rounded-lg hover:shadow-[0_0px_10px_0_rgba(0,0,0,.15)]  hover:border hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer bg-white dark:bg-dark-box-bg dark:text-white border border-black/5 shadow-full-shadow `}> */}

               <div className='flex items-center lg:gap-4 sm:gap-1 relative'>

                    <Checkbox
                         className='!absolute right-0 top-0 dark:!text-white dark:!bg-[#363636]'
                         onClick={(e) => handleSaveJob(e)}
                         icon={<BookmarkBorderIcon />}
                         checkedIcon={<BookmarkIcon />}
                    />

                    <img src={job?.companyId?.image} className='lg:h-14 lg:max-h-15 sm:h-10 mr-2' alt="" />

                    <div className='flex flex-col'>

                         <p className='dark:text-white lg:text-base sm:text-sm cursor-pointer font-semibold'>{job?.title}</p>

                         <span className='lg:text-sm sm:text-xs text-blue-500 hover:text-blue-600 dark:text-sky-400 dark:hover:text-sky-500 font-semibold'>{job.companyId?.name}</span>

                    </div>

               </div>

               <div className='flex items-center gap-3 text-xs text-gray-700 dark:text-white/80 mt-1 hidden'>

                    <span className='flex items-center gap-1'>
                         <IoLocationOutline className='text-base' />
                         {job?.location}, India
                    </span>
                    <span className='flex items-center gap-1.5'>
                         <FaUser />
                         {job?.level}
                    </span>
                    <span className='flex items-center gap-1.5'>
                         <GiMoneyStack className='text-lg' />
                         {kconvert.convertTo(job?.salary)} - 200k
                    </span>

               </div>

               <hr className='w-5/5 border border-gray-100 dark:border-black/40 lg:my-3 sm:my-2.5 dark:my-4' />

               <div className='mt-2 flex items-center gap-4 sm:gap-3'>
                    <span className='text-xs lg:py-1 px-2 sm:py-0.5 text-sky-500 dark:bg-sky-400 dark:text-white bg-sky-100'>Internship</span>
                    <span className='text-xs lg:py-1 px-2 sm:py-0.5 text-green-500 dark:bg-green-400 dark:text-white bg-green-100'>Full Time</span>
                    <span className='text-xs lg:py-1 px-2 sm:py-0.5 text-red-500 dark:bg-red-400 dark:text-white bg-red-100'>Part Time</span>
               </div>

               <p className={`text-gray-500 dark:text-[#cacaca] sm:line-clamp-2 lg:text-sm  sm:text-[13px] lg:mt-4 sm:mt-3`} dangerouslySetInnerHTML={{ __html: job?.JobDescription.slice(0, 150) }}></p>

               <div className='flex justify-between items-end lg:mt-5 sm:mt-3'>
                    <Button onClick={() => { Navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} variant="contained" endIcon={<MdOutlineOpenInNew className='lg:!text-lg sm:!text-sm' />} className='flex !font-bold lg:!text-md sm:!text-sm capitalize items-center'>
                         Apply
                    </Button>
                    <p className='flex items-center gap-1 lg:text-sm sm:text-xs text-gray-500 dark:text-[#ccc] text-right'><MdAccessTime className='text-lg text-blue-400' /> {moment(job.date).fromNow()}</p>
               </div>

          </div>

     );

}

export default JobCard;
