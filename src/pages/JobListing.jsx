import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';


import JobCard from '../components/JobCard/JobCard';
import { Button, IconButton } from '@mui/material';


import { IoFilterSharp } from "react-icons/io5";
import { BsFillGrid1X2Fill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { LiaAngleDownSolid } from "react-icons/lia";
import { FaAnglesLeft, FaFilter } from "react-icons/fa6";
import { FaAngleLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

const JobListing = () => {

     const { searchFilter, setsearchFilter, IsSearched, Jobs } = useContext(AppContext);

     const Navigator = useNavigate();

     const scrollToRef = useRef(null);

     const [filteredJobs, setfilteredJobs] = useState(Jobs);
     const [showSortByMenu, setshowSortByMenu] = useState(false);
     const [sortBy, setsortBy] = useState("Sort By");
     const [position, setposition] = useState("bottom");

     const [showFilter, setshowFilter] = useState(false);
     const [loading, setLoading] = useState(false);
     const [view, setview] = useState(2);

     const handleViewChange = (num) => {
          setLoading(true);
          setTimeout(() => {
               setview(num);
               localStorage.setItem("JobListingView", num)
               setLoading(false);
          }, 1000);
     }

     useEffect(() => {
          const view = localStorage.getItem("JobListingView");
          if (view) {
               setview(Number(view));
          } else {
               setview(3);
          }
     }, []);


     const handleSortByMenuClick = (e) => {

          setshowSortByMenu(!showSortByMenu)

          if (!showSortByMenu) {
               const distanceFromBottom = window.innerHeight - e.clientY;
               const element = e.currentTarget;

               const Menu = element.parentElement.querySelector("div");

               const MenuHeight = Menu.offsetHeight;

               if (distanceFromBottom < MenuHeight) {
                    setposition("top");
               } else {
                    setposition("bottom");
               }
          }

     }

     const SortJobs = () => {

          setfilteredJobs(
               [...filteredJobs].sort((a, b) =>
                    sortBy == "Oldest"
                         ? new Date(a.date) - new Date(b.date)
                         : new Date(b.date) - new Date(a.date)
               )
          );

     }

     useEffect(() => {

          SortJobs();

     }, [sortBy])



     //////////////////////////// PAGINATION ////////////////////////////


     const [currentPage, setcurrentPage] = useState(1);
     const [ItemPerPage, setItemPerPage] = useState(6);

     const indexOfLastProduct = currentPage * ItemPerPage;
     const indexOfFirstProduct = indexOfLastProduct - ItemPerPage;

     const totalPages = Math.ceil(filteredJobs.length / ItemPerPage);

     // Handle Next and Prev
     const nextPage = () => {
          if (currentPage < totalPages) {
               setcurrentPage(currentPage + 1);
               // window.scrollTo({ top: 0, behavior: 'smooth' });
               if (scrollToRef && scrollToRef.current) {
                    const elementTop = scrollToRef.current.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementTop - 200; // manual offset of 100px
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
               }
          }
     };

     const prevPage = () => {
          if (currentPage > 1) {
               setcurrentPage(currentPage - 1);
               if (scrollToRef && scrollToRef.current) {
                    const elementTop = scrollToRef.current.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementTop - 200; // manual offset of 100px
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
               }
          }
     };

     useEffect(() => {
          if (scrollToRef && scrollToRef.current) {
               const elementTop = scrollToRef.current.getBoundingClientRect().top + window.pageYOffset;
               const offsetPosition = elementTop - 200; // manual offset of 100px
               window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
     }, [currentPage]);

     // Handle items per page change
     const handleItemsPerPageChange = (e) => {
          setItemPerPage(Number(e.target.value));
          setcurrentPage(1); // Reset to first page when changing items per page
     };

     const maxPageButtons = 5; // Adjust how many page numbers to show

     const getPageNumbers = () => {
          let pages = [];
          const startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
          const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

          if (startPage > 2) pages.push("..."); // Ellipsis before middle pages

          for (let i = startPage; i <= endPage; i++) {
               pages.push(i);
          }

          if (endPage < totalPages - 1) pages.push("..."); // Ellipsis after middle pages

          return pages;
     };

     const handleInputChange = (event) => {
          if (event.target.value <= Number(value[1] - minDistance)) {
               setValue(prev => {
                    const newArray = [...prev];
                    newArray[0] = event.target.value === '' ? 0 : Number(event.target.value);
                    return newArray;
               })
          }
     };

     const handleInputChange2 = (event) => {
          if (event.target.value >= Number(value[0] + minDistance)) {
               setValue(prev => {
                    const newArray = [...prev];
                    newArray[1] = event.target.value === '' ? 0 : Number(event.target.value);
                    return newArray;
               })
          }
     };


     return (

          <div>

               <div className='flex justify-center md:justify-between flex-wrap gap-8 overflow-hidden h-[300px]'>

                    <div
                         className='relative w-full h-full flex items-center justify-center px-30 pb-10'
                         style={{
                              background: `linear-gradient(180deg, #161c2d00 0%, #161c2d80 25%, #161c2dbf 50%, #161c2d 100%),url(${assets.banner})`,
                              backgroundPosition: "0 10%",
                              backgroundSize: "cover",
                         }}
                    >

                         <div className='flex flex-col items-center justify-center gap-10 relative h-full  w-full'>
                              <h1 className='text-white text-4xl font-bold text-center w-full'>Job Listing</h1>

                              <div className='absolute bottom-0 text-white font-semibold flex items-center gap-2 bg-white/20 rounded-full px-4 py-3'>
                                   <NavLink to={"/"} className='hover:text-blue-500 px-2 duration-300'>Home</NavLink>
                                   <FaAngleRight />
                                   <NavLink to={""} className='hover:text-blue-500 px-2 duration-300'>Jobs</NavLink>
                              </div>
                         </div>

                    </div>

               </div>


               <div className='relative'>
                    <div className="overflow-hidden absolute left-0 right-0 -bottom-px text-white dark:text-dark-primary">
                         <svg className='h-auto  w-full origin-top scale-200' viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path></svg>
                    </div>
               </div>

               <div className='px-20 scroll-p-24 2xl:px-20 mx-auto bg-white dark:bg-dark-primary flex flex-col lg:flex-col max-lg:space-y-8 py-18 gap-6 max-sm:py-4'>

                    {showFilter &&
                         <div onClick={() => setshowFilter(false)} className="overlay fixed top-0 left-0 bottom-0 bg-black/40 z-10 w-full h-full"></div>
                    }

                    <Filter showFilter={showFilter} setshowFilter={setshowFilter} filteredJobs={filteredJobs} setfilteredJobs={setfilteredJobs} sortBy={sortBy} />

                    <div className='flex justify-between items-center shadow-dark-custom px-5 py-4 bg-[#fff] dark:bg-[#0e0e0e] rounded'>

                         <div className='flex items-center gap-3'>

                              <Button variant='contained' className='' onClick={() => setshowFilter(true)} startIcon={<FaFilter className='text-md!' />} >Filter</Button>

                              <div className='relative'>

                                   <span onClick={(e) => handleSortByMenuClick(e)} className='flex border cursor-pointer border-gray-300 dark:border-gray-700 text-gray-500 dark:text-white font-semibold text-md rounded w-52 justify-between items-center px-4 py-2'>
                                        {sortBy}
                                        <LiaAngleDownSolid />
                                   </span>

                                   <div className={`${position === "bottom" ? "top-11" : "bottom-11"} ${!showSortByMenu && "opacity-0 scale-0"} z-2 bg-[#f9f9f9] w-full shadow border border-gray-300 dark:border-black/70 absolute `}>
                                        <ul className='text-xs font-semibold text-white bg-[#061421] py-0.5 space-y-0.5 px-0.5'>
                                             <li className={`px-4 py-3 cursor-pointer hover:text-white ${sortBy === "Sort By" ? " bg-blue-500 text-white! " : "hover:bg-[#353535]"} `} onClick={() => { setsortBy("Sort By"), setshowSortByMenu(false) }} >Sort By</li>
                                             <li className={`px-4 py-3 cursor-pointer hover:text-white ${sortBy === "Newest" ? " bg-blue-500 text-white!  " : "hover:bg-[#353535]"} `} onClick={() => { setsortBy("Newest"), setshowSortByMenu(false) }} >Newest</li>
                                             <li className={`px-4 py-3 cursor-pointer hover:text-white ${sortBy === "Oldest" ? " bg-blue-500 text-white!  " : "hover:bg-[#353535]"} `} onClick={() => { setsortBy("Oldest"), setshowSortByMenu(false) }} >Oldest</li>
                                        </ul>
                                   </div>

                              </div>

                         </div>

                         <div className='flex items-center gap-3'>
                              <IconButton onClick={() => handleViewChange(1)} className={`rounded-none! shadow-[0_0_5px_rgba(0,0,0,.15)]! h-9 w-9 dark:text-white! ${view === 1 ? "bg-blue-500! text-white!" : "dark:hover:shadow-white/40 dark:bg-sidebar-dark-active!"} `} sx={{ fontSize: "18px" }}>
                                   <BsGrid3X3GapFill />
                              </IconButton>
                              <IconButton onClick={() => handleViewChange(2)} className={`rounded-none! shadow-[0_0_5px_rgba(0,0,0,.15)] h-9 w-9 dark:text-white! ${view === 2 ? "bg-blue-500! text-white!" : "dark:hover:shadow-white/40 dark:bg-sidebar-dark-active!"} `} sx={{ fontSize: "14px" }}>
                                   <BsFillGrid1X2Fill />
                              </IconButton>
                              <IconButton onClick={() => handleViewChange(3)} className={`rounded-none! shadow-[0_0_5px_rgba(0,0,0,.15)] h-9 w-9 dark:text-white! ${view === 3 ? "bg-blue-500! text-white!" : "dark:hover:shadow-white/40 dark:bg-sidebar-dark-active!"} `} sx={{ fontSize: "18px" }}>
                                   <FaListUl />
                              </IconButton>
                         </div>

                    </div>


                    <div className='flex w-full gap-4'>

                         {/* Job Listing */}

                         <section ref={scrollToRef} className='w-full relative lg:w-full text-gray-800 max-lg:px-4'>

                              {loading && <div className='absolute flex justify-center pt-40 top-0 left-0 w-full h-full bg-white/80 dark:bg-black/70 z-60'>
                                   <p className='h-10 w-10 border-blue-600 border-t-4 border-b-4 border-r-4 border-l-4 border-l-transparent rounded-full animate-spin'></p>
                              </div>}

                              {/* Job Listing */}
                              {false ? (
                                   <div className='flex justify-center mt-5'>
                                        {/* <AiOutlineLoading3Quarters /> */}
                                        <p className='h-6 w-6 border-blue-600 border-t-2 border-b-2 border-r-2 border-l-2 border-l-transparent rounded-full animate-spin'></p>
                                   </div>
                              ) : (
                                   <div
                                        className={`grid gap-4 ${view === 1 ? "xl:grid-cols-3 sm:grid-cols-3" : view === 2 ? "xl:grid-cols-2 sm:grid-cols-2" : view === 3 ? "xl:grid-cols-1" : ""}
                              `}
                                   >

                                        {filteredJobs.slice(indexOfFirstProduct, indexOfLastProduct).map((job, i) => {
                                             return <JobCard className={""} view={view} key={i} job={job} />
                                        })}

                                   </div>
                              )}

                              {/* {
                                   filteredJobs.length == 0 && <div className='mt-10 text-2xl font-bold flex items-center justify-center w-full'>!Sorry, No Jobs Found</div>
                              } */}


                              {/* Pagination */}

                              {
                                   Jobs.length > 0 && (

                                        <div className='flex items-center justify-between space-x-2 mt-10 border border-gray-200 dark:border-gray-800 dark:bg-[#151515] px-4 py-3.5 shadow'>

                                             <div className='flex items-center gap-3 text-gray-500 dark:text-white text-sm'>
                                                  <div className='flex items-center'>
                                                       item per page
                                                       <select className='ml-2 px-1 py-0.5 focus:outline focus:outline-blue-400 border' value={ItemPerPage} onChange={handleItemsPerPageChange} name="" id="">
                                                            {[6, 12, 18, 24].map((num) => (
                                                                 <option key={num} value={num} className='text-gray-600'>
                                                                      {num}
                                                                 </option>
                                                            ))}
                                                       </select>
                                                  </div>
                                                  <span>
                                                       Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, Jobs.length)} of {Jobs.length}
                                                  </span>
                                             </div>

                                             <div className='flex gap-2'>

                                                  <button onClick={() => setcurrentPage(1)} disabled={currentPage === 1} className='disabled:text-gray-400'><FaAnglesLeft /></button>
                                                  <button onClick={prevPage} disabled={currentPage === 1} className='disabled:text-gray-400'><FaAngleLeft /></button>


                                                  {totalPages >= 1 && (
                                                       <button onClick={() => setcurrentPage(1)} className={`w-9 h-9 flex items-center justify-center border border-gray-300 dark:border-none dark:bg-white/10 rounded ${currentPage === 1 ? "bg-blue-500! text-white" : "text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20"}`}>1</button>
                                                  )}


                                                  {getPageNumbers().map((page, i) => (
                                                       <button
                                                            key={i}
                                                            onClick={() => typeof page === "number" && setcurrentPage(page)}
                                                            className={`w-9 h-9 flex items-center justify-center border border-gray-300 dark:border-none dark:bg-white/10 rounded ${currentPage === page ? "bg-blue-500! text-white" : "text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20"}`}
                                                            disabled={page === "..."}
                                                       >
                                                            {page}
                                                       </button>
                                                  ))}


                                                  {totalPages > 1 && (
                                                       <button onClick={() => setcurrentPage(totalPages)} className={`w-9 h-9 flex items-center justify-center border border-gray-300 dark:border-none dark:bg-white/10 rounded ${currentPage === totalPages ? "bg-blue-500! text-white" : "text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20"}`}>{totalPages}</button>
                                                  )}


                                                  <button onClick={nextPage} disabled={currentPage === totalPages} className='disabled:text-gray-400'><FaAngleRight /></button>
                                                  <button onClick={() => setcurrentPage(totalPages)} disabled={currentPage === totalPages} className='disabled:text-gray-400'><FaAnglesRight /></button>

                                             </div>

                                        </div>

                                   )
                              }

                         </section>

                    </div >

               </div >

          </div>

     );
}


export default JobListing;
