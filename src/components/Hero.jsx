import React, { useContext, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { Button } from '@mui/material';

const Hero = () => {

     const { searchFilter, setsearchFilter, IsSearched, setIsSearched } = useContext(AppContext);

     const TitleRef = useRef(null);
     const LocationRef = useRef(null);

     const onSearch = () => {
          setsearchFilter({
               title: TitleRef.current.value,
               location: LocationRef.current.value
          })
          setIsSearched(true);
          console.log({
               title: TitleRef.current.value,
               location: LocationRef.current.value
          })
     }

     return (

          <div className='2xl:px-20 px-12 dark:bg-dark-primary py-10 max-sm:my-6'>

               {/* <div data-aos="fade-in" data-aos-once="true" data-aos-duration="1000" className='flex items-center justify-center bg-gradient-to-r from-purple-800 to-purple-950 text-secondary py-10 max-sm:py-6 text-center mx-2 rounded-xl'> */}
               <div data-aos="fade-in" data-aos-once="true" data-aos-duration="1000" className='flex items-center justify-center bg-linear-to-r from-gray-800 via-blue-700 to-gray-900 text-secondary py-10 max-sm:py-6 text-center mx-2 rounded-xl'>
               {/* <div data-aos="fade-in" data-aos-once="true" data-aos-duration="1000" className='flex items-center justify-center bg-linear-to-r from-sky-500 to-blue-500 text-secondary py-10 max-sm:py-6 text-center mx-2 rounded-xl'> */}
                    
                    <div>
                         
                         <h2 data-aos="fade-up" data-aos-once="true" data-aos-duration="1000" className="text-2xl md:text-3xl lg:text-5xl font-medium mb-4">Over 10,00+ Jobs to Apply</h2>
                         
                         <p data-aos="fade-up" data-aos-once="true" data-aos-duration="2000" className="mb-8 max-w-xl mx-auto text-sm font-light px-5">Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                         
                         <div data-aos="fade-up" data-aos-once="true" data-aos-duration="2500" className='flex justify-between items-center bg-white max-w-2xl max-sm:max-w-xs rounded text-gray-600 pl-3 p-1 max-sm:p-0.5 max-sm:pl-2 mx-auto sm:mx-auto'>
                              
                              <div className='flex items-center'>
                                   <img className='max-sm:h-3.5' src={assets.search_icon} alt="" />
                                   <input
                                        ref={TitleRef}
                                        type="text"
                                        placeholder="Search for Jobs"
                                        className="max-sm:text-xs p-2 max-sm:py-1 rounded-full outline-none w-full"
                                   />
                              </div>
                              
                              <div className='flex items-center'>
                                   <img className='max-sm:h-3.5' src={assets.location_icon} alt="" />
                                   <input
                                        ref={LocationRef}
                                        type="text"
                                        placeholder="Location"
                                        className="max-sm:text-xs p-2 rounded-full outline-none w-full"
                                   />
                              </div>

                              <Button onClick={onSearch} className='!px-6 max-sm:!px-4 !py-2 max-sm:!py-1' variant='contained'>Search</Button>
                              
                              {/* <button onClick={onSearch} className="bg-primary hover:bg-primary-hover text-secondary rounded ">Search</button> */}

                         </div>
                    </div>

                    <img data-aos="zoom-in-left" data-aos-once="true" data-aos-offset="0" data-aos-duration="1000" src={assets.app_main_img} alt="" />
               
               </div>

               <div data-aos="fade-up" data-aos-once="true" data-aos-offset="0" data-aos-duration="1000" className='border border-gray-300 shadow-md mx-2 mt-5 p-6 max-sm:p-2 rounded-md flex'>
                    <div className='flex items-center gap-10 lg:gap-16 max-sm:gap-5 flex-wrap justify-center'>
                         <p className='font-medium max-sm:text-sm'>Trusted By</p>
                         <img className='h-6 max-sm:h-4' src={assets.microsoft_logo} alt="" />
                         <img className='h-6 max-sm:h-4' src={assets.walmart_logo} alt="" />
                         <img className='h-6 max-sm:h-4' src={assets.accenture_logo} alt="" />
                         <img className='h-6 max-sm:h-4' src={assets.samsung_logo} alt="" />
                         <img className='h-6 max-sm:h-4' src={assets.amazon_logo} alt="" />
                         <img className='h-6 max-sm:h-4' src={assets.adobe_logo} alt="" />
                         <div className='flex flex-col items-center select-none '>
                              <img className='h-10 max-sm:h-4' src={assets.NewLogo} alt="" />
                              {/* <h1 className='font-bold text-gray-500 font-mono'>Neeva</h1> */}
                         </div>

                         {/* <img src="./logo.jpeg" className='h-10' alt="" /> */}
                    </div>
               </div>

          </div>

     );

}

export default Hero;
