import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import "./filter.css";


import JobCard from './JobCard/JobCard';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const LetestJobs = () => {

     const { Jobs } = useContext(AppContext);

     const Navigator = useNavigate();

     const [filteredJobs, setfilteredJobs] = useState(Jobs);
     const [view, setview] = useState();


     useEffect(() => {
          const view = localStorage.getItem("JobListingView");
          if (view) {
               setview(Number(view));
          } else {
               setview(3);
          }
     }, []);


     return (

          <div className='lg:px-20 md:px-8 sm:px-6 px-4 scroll-p-24 2xl:px-20 bg-white dark:bg-dark-primary flex flex-col lg:flex-col max-lg:space-y-8 py-8 gap-4 max-sm:py-4'>


               <h1 data-aos="fade-up" data-aos-once="true" data-aos-duration="1500" className='text-3xl font-bold text-center mt-5 dark:text-white mb-14'> Trending <span className='text-primary'> Jobs </span> Listing</h1>


               <div className='flex w-full gap-4'>

                    {/* Job Listing */}
                    <div className='w-full relative lg:w-full text-gray-800 max-lg:px-4'>

                         {/* Job Listing */}
                         {false ? (
                              <div className='flex justify-center mt-5'>
                                   {/* <AiOutlineLoading3Quarters /> */}
                                   <p className='h-6 w-6 border-blue-600 border-t-2 border-b-2 border-r-2 border-l-2 border-l-transparent rounded-full animate-spin'></p>
                              </div>
                         ) : (
                              <div className={`grid gap-4 xl:grid-cols-2 sm:grid-cols-2`}>

                                   {Jobs.slice(0, 6).map((job, i) => {
                                        return <JobCard className={""} key={i} job={job} />
                                   })}

                              </div>
                         )}

                         {/* {
                              filteredJobs.length == 0 && <div className='mt-10 text-2xl font-bold flex items-center justify-center w-full'>!Sorry, No Jobs Found</div>
                         } */}

                         <div className="flex justify-center items-center mt-16">
                              <Button onClick={() => { Navigator("/job-listing/"), scrollTo(0, 0) }} variant='contained' className='!rounded-full !py-3 !px-10 !bg-blue-500 hover:!bg-[#282828]'>Expore More Jobs</Button>
                         </div>


                    </div>

               </div >

          </div >
     );
}

export default LetestJobs;
