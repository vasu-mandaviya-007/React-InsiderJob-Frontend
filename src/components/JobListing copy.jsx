import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import "./filter.css";
import Filter from './Filter';
import Pagination from './Pagination';


import JobCard from './JobCard';
import { Button, IconButton } from '@mui/material';


import { IoFilterSharp } from "react-icons/io5";
import { BsFillGrid1X2Fill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { LiaAngleDownSolid } from "react-icons/lia";
import { FaAnglesLeft, FaFilter } from "react-icons/fa6";
import { FaAngleLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";

const JobListing = () => {

     const { searchFilter, setsearchFilter, IsSearched, Jobs } = useContext(AppContext);

     const scrollToRef = useRef(null);

     const [filteredJobs, setfilteredJobs] = useState(Jobs);
     const [showSortByMenu, setshowSortByMenu] = useState(false);
     const [sortBy, setsortBy] = useState("Sort By");
     const [position, setposition] = useState("bottom");

     const [showFilter, setshowFilter] = useState(false);
     const [loading, setLoading] = useState(false);
     const [view, setview] = useState();

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
               console.log(view);
               setview(Number(view));
          } else {
               setview(3);
          }
     }, []);

     useEffect(() => {

          const handleScroll = () => {
               setshowSortByMenu(false);
          }

          window.addEventListener("scroll", handleScroll)

          return () => {
               window.removeEventListener("scroll", handleScroll)
          }

     })


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

          if (sortBy === "Oldest") {

               let newJob = filteredJobs.slice().sort((a, b) => a.date - b.date);
               setfilteredJobs(newJob);

          } else {

               let newJob = filteredJobs.slice().sort((a, b) => b.date - a.date);
               setfilteredJobs(newJob);

          }

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

     // useEffect(() => {
     //      if (scrollToRef && scrollToRef.current) {
     //           const elementTop = scrollToRef.current.getBoundingClientRect().top + window.pageYOffset;
     //           const offsetPosition = elementTop - 200; // manual offset of 100px
     //           window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
     //      }
     // }, [currentPage]);

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

          <div className='px-20 scroll-p-24 2xl:px-20 mx-auto bg-white dark:bg-dark-primary flex flex-col lg:flex-col max-lg:space-y-8 py-8 gap-4 max-sm:py-4'>

               {showFilter &&
                    <div onClick={() => setshowFilter(false)} className="overlay fixed top-0 left-0 bottom-0 bg-black/40 z-10 w-full h-full"></div>
               }

               <Filter showFilter={showFilter} setshowFilter={setshowFilter} filteredJobs={filteredJobs} setfilteredJobs={setfilteredJobs} sortBy={sortBy} />

               <div className='flex justify-between items-center shadow-dark-custom px-3 py-2 bg-[#fff] dark:bg-[#0e0e0e] rounded'>

                    <h3 className='font-bold text-2xl ml-4 py-2 text-black dark:text-white' id='job-list'>Letest Jobs</h3>

                    <div className='flex items-center gap-3 pr-6'>

                         <Button variant='outlined' onClick={() => setshowFilter(true)} startIcon={<FaFilter className='!text-md' />} >Filter</Button>
                         {/* <button className='dark:button text-white flex gap-2 items-center duration-500 font-bold justify-center px-6 py-2 rounded-full text-sm' onClick={() => setshowFilter(false)} ><FaFilter className='' /> Filter</button> */}

                         <div className='relative'>

                              <span onClick={(e) => handleSortByMenuClick(e)} className='flex border cursor-pointer border-gray-300 text-gray-500 font-semibold text-md rounded w-52 justify-between items-center px-4 py-2'>
                                   {sortBy}
                                   <LiaAngleDownSolid />
                              </span>

                              <div className={`${position === "bottom" ? "top-11" : "bottom-11"} ${!showSortByMenu && "opacity-0 scale-0"} z-[2] bg-[#f9f9f9] w-full shadow border border-gray-300 absolute `}>
                                   <ul className='text-sm p-1 space-y-0.5'>
                                        <li className={`px-3 duration-200 cursor-pointer py-2 hover:bg-[#353535] hover:text-white ${sortBy === "Sort By" && "bg-[#353535] text-white"} `} onClick={() => { setsortBy("Sort By"), setshowSortByMenu(false) }} >Sort By</li>
                                        <li className={`px-3 duration-200 cursor-pointer py-2 hover:bg-[#353535] hover:text-white ${sortBy === "Newest" && "bg-[#353535] text-white"} `} onClick={() => { setsortBy("Newest"), setshowSortByMenu(false) }} >Newest</li>
                                        <li className={`px-3 duration-200 cursor-pointer py-2 hover:bg-[#353535] hover:text-white ${sortBy === "Oldest" && "bg-[#353535] text-white"} `} onClick={() => { setsortBy("Oldest"), setshowSortByMenu(false) }} >Oldest</li>
                                   </ul>
                              </div>

                         </div>

                         <IconButton onClick={() => handleViewChange(1)} className={`!rounded-none !shadow-[0_0_5px_rgba(0,0,0,.15)] h-8 w-8 dark:!text-white ${view === 1 ? "!bg-blue-500 !text-white" : "dark:hover:shadow-gray-400 dark:!bg-sidebar-dark-active"} `} sx={{ fontSize: "18px" }}>
                              <BsGrid3X3GapFill />
                         </IconButton>
                         <IconButton onClick={() => handleViewChange(2)} className={`!rounded-none shadow-[0_0_5px_rgba(0,0,0,.15)] h-8 w-8 dark:!text-white ${view === 2 ? "!bg-blue-500 !text-white" : "dark:hover:shadow-gray-400 dark:!bg-sidebar-dark-active"} `} sx={{ fontSize: "14px" }}>
                              <BsFillGrid1X2Fill />
                         </IconButton>
                         <IconButton onClick={() => handleViewChange(3)} className={`!rounded-none shadow-[0_0_5px_rgba(0,0,0,.15)] h-8 w-8 dark:!text-white ${view === 3 ? "!bg-blue-500 !text-white" : "dark:hover:shadow-gray-400 dark:!bg-sidebar-dark-active"} `} sx={{ fontSize: "18px" }}>
                              <FaListUl />
                         </IconButton>


                         {/* <div onClick={() => setview(1)} className={`p-2.5 shadow-[0px_0px_5px_rgba(0,0,0,.15)] ${view === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}  cursor-pointer  rounded text--md`}>
                              <BsGrid3X3GapFill />
                         </div>
                         <div onClick={() => setview(2)} className={`p-2.5 shadow-[0px_0px_5px_rgba(0,0,0,.15)] ${view === 2 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}  cursor-pointer  rounded text--md`}>
                              <BsFillGrid1X2Fill />
                         </div>
                         <div onClick={() => setview(3)} className={`p-2.5 shadow-[0px_0px_5px_rgba(0,0,0,.15)] ${view === 3 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}  cursor-pointer  rounded text--md`}>
                              <FaListUl />
                         </div> */}
                    </div>
               </div>

               <div className='flex w-full gap-4'>

                    {/* Sidebar */}

                    {/* <div className='sticky top-20 h-fit w-full lg:w-full max-w-1/4'>
                         {
                              IsSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                                   <>
                                        <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                                        <div className='mb-4 text-gray-600 flex gap-1'>
                                             {
                                                  searchFilter.title && (
                                                       <span className='inline-flex items-center gap-2.5 rounded px-4 py-2 bg-blue-50 border border-blue-300 '>
                                                            {searchFilter.title}
                                                            <img onClick={() => setsearchFilter(prev => ({ ...prev, title: "" }))} className="cursor-pointer" src={assets.cross_icon} alt="" />
                                                       </span>
                                                  )
                                             }
                                             {
                                                  searchFilter.location && (
                                                       <span className='inline-flex items-center gap-2.5 rounded px-4 py-2 bg-red-50 border border-red-300'>
                                                            {searchFilter.location}
                                                            <img onClick={() => setsearchFilter(prev => ({ ...prev, location: "" }))} className="cursor-pointer" src={assets.cross_icon} alt="" />
                                                       </span>
                                                  )
                                             }
                                        </div>
                                   </>
                              )
                         }

                         <button onClick={() => setshowFilter(!showFilter)} className='px-4 py-1.5 rounded border border-gray-400 lg:hidden'>
                              {
                                   showFilter
                                        ? "Close"
                                        : <div className='flex items-center gap-2'>
                                             <IoFilterSharp />
                                             Filter
                                        </div>

                              }
                         </button>


                         <div className={`${showFilter ? "" : "max-lg:hidden"} shadow-dark-custom px-6 py-3 pb-8 rounded`}>
                              <h4 className='font-semibold text-[#222] text-lg mb-4 py-3 border-b border-b-blue-400'>Search By Categories</h4>
                              <ul className='space-y-4 text-gray-600 pl-1'>
                                   {
                                        JobCategories.map((category, index) => {
                                             return (
                                                  <li key={index} className='flex items-center gap-3'>
                                                       <Switch id={category.name} checked={selectedCategories.includes(category.name)} onChange={(e) => handleCategoryChange(category.name)} size="small" />
                                                       <label className='cursor-pointer text-md' htmlFor={category.name}>{category.name}</label>
                                                  </li>
                                             )
                                        })
                                   }
                              </ul>
                         </div>

                         <div className={`${showFilter ? "" : "mt-5 max-lg:hidden"} shadow-dark-custom px-6 py-3 pb-8 rounded`}>
                              <h4 className='font-semibold text-[#222] text-lg mb-4 py-3 border-b border-b-blue-400'>Search By Location</h4>
                              <ul className='space-y-4 text-gray-600 pl-1'>
                                   {
                                        JobLocations.map((location, index) => {

                                             return (

                                                  <li key={index} className='flex items-center gap-3'>

                                                       <Switch id={location} checked={selectedLocation.includes(location)} onChange={(e) => handleLocationChange(location)} size="small" />

                                                       <label className='cursor-pointer text-md' htmlFor={location}>{location}</label>
                                                  </li>

                                             )

                                        })
                                   }
                              </ul>
                         </div>

                         <div className={`${showFilter ? "" : "mt-5 max-lg:hidden"} shadow-dark-custom px-6 py-3 pb-8 rounded`}>
                              <h4 className='font-semibold text-[#222] text-lg mb-4 py-3 border-b border-b-blue-400'>Search By Job Type</h4>
                              <ul className='space-y-4 text-gray-600 pl-1'>
                                   {
                                        Jobtypes.map((type, index) => {

                                             return (

                                                  <li key={index} className='flex items-center gap-3'>

                                                       <Switch id={type.name} checked={selectedType.includes(type.name)} onChange={(e) => handleJobTypeChange(type.name)} size="small" />

                                                       <label className='cursor-pointer text-md' htmlFor={type.name}>{type.name}</label>
                                                  </li>

                                             )

                                        })
                                   }
                              </ul>
                         </div>

                    </div> */}


                    {/* Job Listing */}
                    <section ref={scrollToRef} className='w-full relative lg:w-full text-gray-800 max-lg:px-4'>

                         {loading && <div className='absolute flex justify-center pt-40 top-0 left-0 w-full h-full bg-white/80 z-60'>
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
                                        return <JobCard className={"border-l-2 border-l-transparent"} key={i} job={job} />
                                   })}

                              </div>
                         )}

                         {
                              filteredJobs.length == 0 && <div className='mt-10 text-2xl font-bold flex items-center justify-center w-full'>!Sorry, No Jobs Found</div>
                         }

                         {/* Pagination */}

                         {
                              Jobs.length > 0 && (

                                   <div className='flex items-center justify-between space-x-2 mt-10 border border-gray-200 px-4 py-2.5 shadow'>

                                        <div className='flex items-center gap-3 text-gray-500 text-sm'>
                                             <div className='flex items-center'>
                                                  item per page
                                                  <select className='ml-2 px-1 py-0.5 focus:outline focus:outline-blue-400 rounded border' value={ItemPerPage} onChange={handleItemsPerPageChange} name="" id="">
                                                       {[6, 12, 18, 24].map((num) => (
                                                            <option key={num} value={num}>
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

                                             <button onClick={()=>setcurrentPage(1)} disabled={currentPage === 1} className='disabled:text-gray-400'><FaAnglesLeft /></button>
                                             <button onClick={prevPage} disabled={currentPage === 1} className='disabled:text-gray-400'><FaAngleLeft /></button>

                                             {/* First Page */}
                                             {totalPages >= 1 && (
                                                  <button onClick={() => setcurrentPage(1)} className={`w-9 h-9 flex items-center justify-center border border-gray-300 rounded ${currentPage === 1 ? "bg-blue-100 text-blue-500" : "text-gray-500 hover:bg-gray-100"}`}>1</button>
                                             )}

                                             {/* Dynamic Middle Pages */}
                                             {getPageNumbers().map((page, i) => (
                                                  <button
                                                       key={i}
                                                       onClick={() => typeof page === "number" && setcurrentPage(page)}
                                                       className={`w-9 h-9 flex items-center justify-center border border-gray-300 rounded ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                                                       disabled={page === "..."}
                                                  >
                                                       {page}
                                                  </button>
                                             ))}

                                             {/* Last Page */}
                                             {totalPages > 1 && (
                                                  <button onClick={() => setcurrentPage(totalPages)} className={`w-9 h-9 flex items-center justify-center border border-gray-300 rounded ${currentPage === totalPages ? "bg-blue-100 text-blue-500" : "text-gray-500 hover:bg-gray-100"}`}>{totalPages}</button>
                                             )}


                                             <button onClick={nextPage} disabled={currentPage === totalPages} className='disabled:text-gray-400'><FaAngleRight /></button>
                                             <button onClick={()=>setcurrentPage(totalPages)} disabled={currentPage === totalPages} className='disabled:text-gray-400'><FaAnglesRight /></button>

                                        </div>

                                   </div>

                              )
                         }

                         {/* <Pagination
                              indexOfLastProduct={indexOfLastProduct}
                              setindexOfLastProduct={setindexOfLastProduct}
                              indexOfFirstProduct={indexOfFirstProduct}
                              setindexOfFirstProduct={setindexOfFirstProduct}
                              jobLength={Jobs.length}
                              filteredJobs={filteredJobs}
                         /> */}

                    </section>

               </div >

          </div >
     );
}

export default JobListing;
