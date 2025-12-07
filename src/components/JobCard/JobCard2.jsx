import React from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard2 = ({ job }) => {

     const Navigate = useNavigate();

     return (

          <div className='p-6 shadow-custom hover:shadow-dark-custom bg-white rounded'>

               <div className='flex justify-between items-center'>

                    <img className='h-8' src={assets.company_icon} alt="" />

               </div>

               <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
               {/* <h4 className='font-medium text-xl mt-2'>{job.category}</h4> */}
               {/* <h4 className='font-medium text-xl mt-2'>{job.location}</h4> */}

               <div className='flex items-center mt-2 gap-3 text-xs'>

                    <span className='inline-flex items-center gap-2.5 rounded-xs px-2 py-1.5 bg-blue-50 border border-blue-200 '>
                         {job.location}
                    </span>

                    <span className='inline-flex items-center gap-2.5 rounded px-4 py-1.5 bg-red-50 border border-red-200'>
                         {job.level}
                    </span>

               </div>

               <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>

               <div className='mt-4 flex gap-4 text-sm'>

                    <button onClick={() => { Navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='text-white rounded bg-primary hover:bg-primary-hover px-4 py-1.5'>Apply Now</button>
                    <button onClick={() => { Navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className="text-gray-600 rounded border border-gray-500 px-4 py-1.5" >Learn More</button>

               </div>

          </div>

     );
}

export default JobCard2;
