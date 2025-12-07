import React from 'react';
import Hero from '../components/Hero';
import LetestJobs from '../components/LetestJobs';
import AppDownload from '../components/AppDownload';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JobCategory from '../components/JobCategory';

const Home = () => {

     const location = useLocation();
     const isChildRouteActive = location.pathname !== "/"; // Check if the URL is not exactly "/"

     return (

          <div className='dark:bg-black bg-gradient-to-b from-[#F4F7FB] to-[#F8F9FA] '>
               {/* // <div className='bg-[#F7F7F7]'> */}
               {/* < div className = 'bg-white' > */}

               <Navbar />

               {
                    !isChildRouteActive && (
                         <div className='bg-[#fefefe]'>
                              <Hero />
                              <JobCategory />
                              <LetestJobs />
                              <AppDownload />
                         </div>
                    )
               }

               <Outlet />

          </div>

     );

}

export default Home;
