import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/SmallLoader';
import { assets } from '../assets/assets';
import kconvert from "k-convert"
import moment from 'moment/moment';
import { Button, Checkbox } from '@mui/material';
import { useClerk, useUser } from "@clerk/clerk-react";
import Swal from "sweetalert2";

import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { PiClockCountdownBold } from "react-icons/pi";
import { FaIdCardAlt } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { FaPlus, FaCheck } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import JobCard from '../components/JobCard/JobCard';

import JobApplyPopup from '../components/JobApplyPopup';

const JobDetails = () => {

     const { user } = useUser();
     const { openSignIn } = useClerk();

     const { id } = useParams();

     const { Jobs } = useContext(AppContext);

     const [JobData, setJobData] = useState(null);
     const [IsFollow, setIsFollow] = useState(false);
     const [showApplyBox, setshowApplyBox] = useState(false);
     const [loading, setloading] = useState(false);

     const [ShowMore, setShowMore] = useState(false);

     const about = `Every company has a mission. What's ours? To empower every person and every organization to achieve more. We believe technology can and should be a force for good and that meaningful innovation contributes to a brighter world in the future and today. Our culture doesn’t just encourage curiosity; it embraces it. Each day we make progress together by showing up as our authentic selves. We show up with a learn-it-all mentality. We show up cheering on others, knowing their success doesn't diminish our own. We show up every day open to learning our own biases, changing our behavior, and inviting in differences. Because impact matters.

     Microsoft operates in 190 countries and is made up of approximately 228,000 passionate employees worldwide.
     `

     const handleFollowClick = (e) => {
          setloading(true);

          setTimeout(() => {
               setIsFollow(!IsFollow);
               setloading(false);
          }, 1500);

     }

     const fetchJob = async () => {

          const data = Jobs.filter(job => job._id === id);

          if (Jobs.length > 0 && data.length > 0) {
               setJobData(data[0])
          }

     }

     const handleJobApply = () => {
          if (user) {
               setshowApplyBox(true);
          } else {
               Swal.fire({
                    title: 'Login to Apply',
                    text: "you must login to apply for any jobs",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: `<i class="fa-solid fa-arrow-right-to-bracket"></i> Login`,
                    cancelButtonText: 'Cancel',
                    showLoaderOnConfirm: true,
               })
                    .then(async (result) => {
                         if (result.isConfirmed) {
                              openSignIn();
                         }
                    })
               // toast.error("Please Login First To Apply", {});
          }
     }

     const handleSaveJob = (e, index) => {
          if (e.target.checked) {
               console.log(e.target)
               // e.target.checked = false;
          }
     }

     useEffect(() => {
          fetchJob();
     }, [id, Jobs]);



     return JobData ? (

          <div className='mx-auto min-h-screen dark:bg-dark-primary flex flex-col pb-10 2xl:px-20 '>

               <div onClick={() => setshowApplyBox(false)} className={`${!showApplyBox && "hidden"} z-10 duration-300 fixed top-0 left-0 w-full h-full bg-black/30`}></div>

               <JobApplyPopup showApplyBox={showApplyBox} JobId={id} companyId={JobData?.companyId?._id} setshowApplyBox={setshowApplyBox} />

               <div className='flex justify-center md:justify-between flex-wrap gap-8'>

                    <div
                         data-aos="fade-down" data-aos-duration="1000"
                         className='relative w-full h-full flex items-center justify-between px-30 pt-36 pb-40'
                         style={{
                              background: `linear-gradient(180deg, #161c2d00 0%, #161c2d80 25%, #161c2dbf 50%, #161c2d 100%),url(${assets.banner})`,
                              backgroundPosition: "center top",
                              backgroundSize: "cover",
                         }}
                    >
                         <div className='flex flex-col md:flex-row  items-center'>

                              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-300' src={JobData?.companyId?.image} alt="" />

                              <div className='text-center md:text-left text-white'>

                                   <h1 className='text-2xl sm:text-4xl font-semibold'>{JobData?.title}</h1>

                                   <div className='flex flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-[#bbb] mt-2'>

                                        <span className='flex items-center gap-1'>
                                             <BusinessCenterIcon style={{ fontSize: "22px" }} />
                                             {JobData.companyId?.name}
                                        </span>
                                        <span className='flex items-center gap-1'>
                                             <IoLocationOutline className='text-base' />
                                             {JobData?.State}, India
                                        </span>
                                        <span className='flex items-center gap-1.5'>
                                             <FaUser />
                                             {JobData.Category}
                                        </span>
                                        <span className='flex items-center gap-1.5'>
                                             <GiMoneyStack className='text-lg' />
                                             {kconvert.convertTo(JobData?.Salary[0]) + " - " + kconvert.convertTo(JobData?.Salary[1])}
                                        </span>
                                   </div>

                              </div>

                         </div>

                         <div className='flex flex-col justify-center text-end max-md:mx-auto max-md:text-center '>
                              <div className='flex items-center gap-2'>
                                   <Button onClick={handleJobApply} variant="contained" endIcon={<MdOutlineOpenInNew className='text-lg!' />} className='font-bold! h-fit p-2.5! bg-primary! px-6!'>
                                        Apply Now
                                   </Button>
                                   <div className='bg-white rounded outline-2 outline-white'>
                                        <Checkbox
                                             className=''
                                             icon={<BookmarkBorderIcon />}
                                             checkedIcon={<BookmarkIcon />}
                                        />
                                   </div>
                              </div>
                              <p className=' text-sm mt-1 text-gray-400'>Posted {moment(JobData.date).fromNow()}</p>
                         </div>

                    </div>

               </div>

               <div data-aos="fade-up" data-aos-once="true" data-aos-duration="1000" className='relative mb-14 '>
                    <div className="overflow-hidden absolute left-0 right-0 -bottom-px text-[#F4F7FB] dark:text-dark-primary">
                         <svg className='h-auto  w-full origin-top scale-200' viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path></svg>
                    </div>
               </div>

               {/* ========================> JOB DETAILS <======================== */}

               <div className='flex flex-col dark:text-white lg:flex-row justify-between px-20 items-start'>


                    <div data-aos="" data-aos-offset="30" data-aos-once="true" data-aos-duration="1000" className='lg:sticky top-20 w-full lg:w-2/3 py-10 px-12 bg-white dark:bg-dark-box-bg shadow-(--box-shadow-custom) rounded-lg '>
                         <h2 className='font-bold text-2xl mb-4'>Job Description</h2>
                         <div className='rich-text text-[#474d6a]! dark:text-gray-300! ' dangerouslySetInnerHTML={{ __html: JobData.JobDescription }} ></div>
                         <Button onClick={handleJobApply} variant="contained" endIcon={<MdOutlineOpenInNew className='text-lg!' />} className='mt-10! font-bold! h-fit p-2.5! bg-primary! px-6!'>
                              Apply Now
                         </Button>
                    </div>

                    <div className='lg:sticky top-20 w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>

                         {/* JOB OVERVIEW */}
                         <div data-aos="fade-up" data-aos-once="true" data-aos-duration="1000" className='bg-white dark:bg-dark-box-bg p-8 pt-5 shadow-(--box-shadow-custom) rounded-lg'>
                              <h2 className='text-lg font-bold mb-8 border-b border-b-gray-300 pb-2'>Job Overview</h2>
                              <ul className='flex flex-col gap-10'>
                                   <li className='flex items-center gap-5 px-2'>
                                        <span className='h-10 w-10 flex items-center justify-center  bg-sky-100 text-sky-400' >
                                             <FaCalendarAlt />
                                        </span>
                                        <div className='font-medium'>
                                             <h4 className='text-md' >Date Posted : </h4>
                                             <p className='text-xs text-gray-500'>Posted {moment(JobData.date).fromNow()}</p>
                                        </div>
                                   </li>
                                   <li className='flex items-center gap-5 px-2'>
                                        <span className='h-10 w-10 text-lg flex items-center justify-center  bg-sky-100 text-sky-400' >
                                             <PiClockCountdownBold />
                                        </span>
                                        <div className='font-medium'>
                                             <h4 className='text-md' >Last Date To Apply : </h4>
                                             <p className='text-xs text-gray-500'>November 16,2025</p>
                                        </div>
                                   </li>
                                   <li className='flex items-center gap-5 px-2'>
                                        <span className='h-10 w-10 text-xl flex items-center justify-center  bg-sky-100 text-sky-400' >
                                             <IoLocationOutline />
                                        </span>
                                        <div className='font-medium'>
                                             <h4 className='text-md' >Job Location : </h4>
                                             <p className='text-xs text-gray-500'>{JobData?.City + "," + JobData?.State}</p>
                                        </div>
                                   </li>
                                   <li className='flex items-center gap-5 px-2'>
                                        <span className='h-10 w-10 flex items-center justify-center  bg-sky-100 text-sky-400' >
                                             <FaIdCardAlt />
                                        </span>
                                        <div className='font-medium'>
                                             <h4 className='text-md' >Job Title : </h4>
                                             <p className='text-xs text-gray-500'>{JobData?.title}</p>
                                        </div>
                                   </li>
                                   <li className='flex items-center gap-5 px-2'>
                                        <span className='h-10 w-10 text-xl flex items-center justify-center  bg-sky-100 text-sky-400' >
                                             <RiMoneyRupeeCircleFill />
                                        </span>
                                        <div className='font-medium'>
                                             <h4 className='text-md' >Salary : </h4>
                                             <p className='text-xs text-gray-500'>{kconvert.convertTo(JobData?.Salary[0]) + " - " + kconvert.convertTo(JobData?.Salary[1])} </p>
                                        </div>
                                   </li>
                              </ul>
                         </div>

                         {/* EMBEDED GOOGLE MAP */}
                         <div data-aos="fade-up" data-aos-offset="30" data-aos-once="true" data-aos-duration="1000" className='bg-white dark:bg-dark-box-bg p-6 pt-5 shadow-(--box-shadow-custom) rounded-lg'>
                              <h2 className='text-lg font-bold mb-8 border-b border-b-gray-300 pb-2'>Location</h2>
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.749047454!2d72.41458417037201!3d23.020473746685298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1739598871195!5m2!1sen!2sin"
                                   height="300" allowFullScreen loading="lazy"
                                   className='w-full'
                                   referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                         </div>

                    </div>

               </div>

               {/* ========================> SIMILAR JOBS <======================== */}

               <div className='mt-8 px-24'>

                    <h2 className='dark:text-white text-lg font-bold mb-4'>Similar Jobs</h2>

                    <div className='grid grid-cols-2 gap-y-6 gap-x-3'>

                         {/* {
                              Jobs.filter(job => job.companyId._id === JobData.companyId._id && job._id !== JobData._id)
                                   .filter(job => true).slice(0, 4)
                                   .map((job, index) => {

                                        return (

                                             <div data-aos="fade-up" data-aos-once="true" data-aos-duration="1000" key={index} className='p-6 rounded-lg hover:shadow-lg duration-300 cursor-pointer bg-white dark:bg-[#] shadow-[var(--box-shadow-custom)]'>

                                                  <div className='flex items-center gap-4 relative'>

                                                       <Checkbox
                                                            className='!absolute right-0 top-0'
                                                            onClick={(e) => handleSaveJob(e, index)}
                                                            icon={<BookmarkBorderIcon />}
                                                            checkedIcon={<BookmarkIcon />}
                                                       />

                                                       <img src={job.companyId.image} className='h-10 max-h-12' alt="" />

                                                       <div className='flex flex-col'>
                                                            <p className='text-blue-500 hover:text-blue-700 cursor-pointer font-semibold'>{job?.title}</p>
                                                            <span className='text-sm text-gray-800 font-semibold'>{job.companyId.name}</span>
                                                       </div>

                                                  </div>

                                                  <div className='flex items-center gap-3 text-xs text-gray-700 mt-4'>

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

                                                  <hr className='w-5/5 border border-gray-100 mt-3' />

                                                  <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>

                                                  <div className='flex justify-between items-end mt-5'>
                                                       <Button variant="contained" endIcon={<MdOutlineOpenInNew className='!text-lg' />} className='flex !font-bold capitalize items-center'>
                                                            Apply
                                                       </Button>
                                                       <p className='text-sm text-gray-500 text-right'>{moment(job.date).fromNow()}</p>
                                                  </div>

                                             </div>

                                        )

                                   })
                         } */}


                         {
                              // Jobs.filter(job => job.companyId._id === JobData.companyId._id && job._id !== JobData._id)
                              //      .filter(job => true).slice(0, 4)
                              //      .map((job, index) => <JobCard job={job} key={index} />)
                              Jobs.slice(0, 4).map((job, index) => {
                                   return <JobCard job={job} key={index} />
                              })
                         }

                    </div>
               </div>


               {/* ========================> ABOUT COMPANY <======================== */}

               <div className='px-24 mt-10'>

                    <div className='relative overflow-hidden container bg-white dark:bg-dark-box-bg dark:text-white px-8 pb-18 pt-5 shadow-custom rounded-lg'>

                         <h2 className='text-xl font-bold mb-8 border-b border-b-gray-300 pb-4'>About Company</h2>

                         <div className='flex justify-between'>

                              <div className='flex gap-3'>

                                   <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-300' src={JobData?.companyId?.image} alt="" />

                                   <div className='pt-2'>
                                        <h3 className='font-bold text-sky-500 text-2xl cursor-pointer'>{JobData.companyId.name}</h3>
                                        <p className='text-gray-700 dark:text-gray-200 font-semibold'>1,131,062 followers</p>
                                   </div>
                              </div>

                              <Button onClick={(e) => handleFollowClick(e)} disabled={loading} variant="contained" startIcon={loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : IsFollow ? <FaCheck className='text-lg!' /> : <FaPlus className='text-lg!' />} className='h-fit '>
                                   {IsFollow ? "Following" : "Follow"}
                              </Button>

                         </div>


                         <div className={`text-gray-500 dark:text-gray-300 text-sm ${!ShowMore && "line-clamp-3"} mt-4 relative`}>
                              {about
                                   .split('\n')
                                   // .filter((para) => para.trim() !== "")
                                   .map((para, index) => {
                                        return <p key={index}>{para === "" ? "\u00A0" : para}</p>
                                   })
                              }
                              {!ShowMore && <button onClick={() => setShowMore(true)} className='absolute bottom-0 right-0 bg-white dark:bg-dark-box-bg text-sm font-semibold px-2'>...show more</button>}
                         </div>


                         <button className='absolute w-full left-0 bottom-0 py-3 text-white font-bold bg-black/70 dark:bg-black/50 hover:bg-black/80'>
                              Show More
                         </button>
                    </div>
                    {/* <button className='w-full bottom-0 bg-linear-to-t from-blue-500 to-sky-200 text-white '> */}

               </div>


          </div>
     ) : (
          <Loading />
     );
}

export default JobDetails;
