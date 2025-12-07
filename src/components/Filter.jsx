import React, { useContext, useEffect, useState } from 'react';
import { assets, JobCategories, JobLocations, Jobtypes } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { IconButton, Switch, Button, Checkbox, Slider } from '@mui/material';

import { AnimatePresence, motion } from "framer-motion";

import { IoCloseSharp } from 'react-icons/io5';
import { FiPlus, FiMinus } from "react-icons/fi";
import { FcClearFilters } from "react-icons/fc";
import { FaFilterCircleXmark } from "react-icons/fa6";



const Filter = ({ showFilter, setshowFilter, filteredJobs, setfilteredJobs, sortBy }) => {

     const { searchFilter, setsearchFilter, IsSearched, Jobs } = useContext(AppContext);

     const [selectedCategories, setSelectedCategories] = useState([]);
     const [selectedLocation, setSelectedLocation] = useState([]);
     const [selectedType, setselectedType] = useState([]);

     const handleCategoryChange = (category) => {
          setSelectedCategories(
               prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
          )
     }

     const handleLocationChange = (location) => {
          setSelectedLocation(
               prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
          )
     }

     const handleJobTypeChange = (type) => {
          setselectedType(
               prev => prev.includes(type) ? prev.filter(c => c !== type) : [...prev, type]
          )
     }

     useEffect(() => {

          // Helper function to check if job matches selected category
          const matchesCategory = job =>
               selectedCategories.length === 0 || selectedCategories.includes(job.Category);

          // Helper function to check if job matches selected location
          const matchesLocation = job =>
               selectedLocation.length === 0 || selectedLocation.includes(job.City);

          const matchesJobType = job =>
               selectedType.length === 0 || selectedType.includes(job.type);

          // Helper function to check if job title matches search filter
          const matchesTitle = job =>
               searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

          // Helper function to check if job location matches search filter
          const matchesSearchLocation = job =>
               searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

          // Step 1: Make a reversed copy of the Jobs array (so newest jobs appear first)
          // Step 2: Use .filter() to check each job based on conditions
          // const newFilteredJobs = Jobs.slice().reverse().filter(job =>
          const newFilteredJobs = Jobs.slice().filter(job =>

               // if the job passes all checks means if all returns true then the job is added to newfiltered jobs other wise not
               matchesCategory(job) &&   // Job must match selected category (or no category is selected)
               matchesLocation(job) &&   // Job must match selected location (or no location is selected)
               matchesJobType(job) &&   // Job must match selected location (or no location is selected)
               matchesTitle(job) &&      // Job must match title search (or title search is empty)
               matchesSearchLocation(job) // Job must match location search (or location search is empty)

          );


          if (sortBy === "Oldest") {

               let newJob = newFilteredJobs.slice().sort((a, b) => a.date - b.date);
               setfilteredJobs(newJob);

          } else {

               let newJob = newFilteredJobs.slice().sort((a, b) => b.date - a.date);
               setfilteredJobs(newJob);

          }

          // Step 3: Update the filtered jobs list in state
          // setfilteredJobs(newFilteredJobs);

          // Step 4: Reset the current page to the first page whenever filters change
          // setcurrentPage(1);

          /*
          // Example Data:
          const Jobs = [
               { id: 1, title: "React Developer", category: "IT", location: "New York" },
               { id: 2, title: "Java Developer", category: "IT", location: "San Francisco" },
               { id: 3, title: "Marketing Manager", category: "Marketing", location: "New York" }
          ];
 
          // Example Filters:
          const selectedCategories = ["IT"];
          const selectedLocation = ["New York"];
          const searchFilter = { title: "", location: "" };
 
          // Expected Output:
          // Only Job 1 (React Developer) should be in filteredJobs because:
          // - Category "IT" matches
          // - Location "New York" matches
          // - Title filter is empty (so all titles pass)
          // - Location filter is empty (so all locations pass)
          */


     }, [Jobs, selectedCategories, selectedLocation, selectedType, searchFilter])

     const [openCategory, setopenCategory] = useState(false);
     const [openFilterDropDown, setopenFilterDropDown] = useState(["category"]);

     const handleCategoryClick = (category) => {

          // setopenCategory(!openCategory);
          if (openFilterDropDown.includes(category)) {
               setopenFilterDropDown((prev) => prev.filter(e => e !== category));
          } else {
               setopenFilterDropDown((prev) => [...prev, category])
          }

     }

     const [value, setValue] = useState([100000, 400000]);

     const MAX = 500000;
     const MIN = 5000;
     const minDistance = 5000;

     function valuetext(value) {
          return `${value}°C`;
     }

     const handleChange = (event, newValue, activeThumb) => {
          if (!Array.isArray(newValue)) {
               return;
          }

          if (activeThumb === 0) {
               setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
          } else {
               setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
          }
     };

     const handleClearFilter = () => {

          setSelectedCategories([])
          setSelectedLocation([])
          setselectedType([])

     }

     return (

          <div className={` filter-bar fixed top-0 left-0 w-1/4 duration-500  ${showFilter ? "translate-x-0" : "-translate-x-[105%]"} h-full overflow-y-scroll bg-white dark:bg-sidebar-dark dark:shadow-lg dark:shadow-gray-600 z-20 `}>

               <h1 className='sticky flex items-center justify-between top-0 z-1 text-xl px-4 text-white py-2 font-bold bg-sky-500'>
                    Filter
                    <IconButton onClick={() => setshowFilter(false)} color="secondary" className=' text-white! bg-red-500! rounded-none!' aria-label="add an alarm">
                         <IoCloseSharp />
                    </IconButton>
               </h1>

               {/* <Button size='small' onClick={handleClearFilter} className='!right-0 !text-xs !py-1.5 !px-2 !flex !ml-auto !mt-2 !mr-2 !bg-red-500' variant='contained' startIcon={<FcClearFilters />}> */}
               <Button size='small' onClick={handleClearFilter} className='right-0! text-xs! py-1.5! px-2! flex! ml-auto! mt-2! mr-2! bg-red-500!' variant='contained' startIcon={<FaFilterCircleXmark className='text-sm! ml-1' />}>
                    Clear All
               </Button>


               <div className="flex flex-col gap-2 p-4">

                    <div className={`bg-white dark:bg-sidebar-dark category-container rounded overflow-hidden border-b border-b-black/10 dark:border-b-white/25`}>

                         <Button
                              onClick={(e) => handleCategoryClick("category")}
                              endIcon={openFilterDropDown.includes("category") ? <FiMinus /> : <FiPlus />}
                              className={`${openFilterDropDown.includes("category") ? "bg-[#F5F7FC]! dark:bg-sidebar-dark-active!" : ""} w-full! text-black! dark:text-white/90! normal-case! text-sm! text-left! justify-between! py-4! px-4! font-semibold`} >
                              Categories
                         </Button>

                         <AnimatePresence >

                              {openFilterDropDown.includes("category") &&

                                   <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                             height: openFilterDropDown.includes("category") ? "auto" : 0,
                                             opacity: openFilterDropDown.includes("category") ? 1 : 0,
                                        }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                   >
                                        <ul className='category-list space-y-1 text-gray-600 dark:text-[#b3b3b3] px-4 pb-4 pt-2 '>
                                             {
                                                  JobCategories.map((category, index) => {
                                                       return (
                                                            <li key={index} className='flex items-center gap-3'>
                                                                 <Checkbox
                                                                      id={category.name}
                                                                      value={category.name}
                                                                      checked={selectedCategories.includes(category.name)}
                                                                      onChange={(e) => handleCategoryChange(category.name)}
                                                                      className='dark:text-white/80!'
                                                                      size="small"
                                                                 />
                                                                 <label className='cursor-pointer text-md' htmlFor={category.name}>{category.name}</label>
                                                            </li>
                                                       )
                                                  })
                                             }
                                        </ul>
                                   </motion.div>
                              }
                         </AnimatePresence>

                    </div>

                    <div className={`bg-white dark:bg-sidebar-dark category-container rounded overflow-hidden border-b border-b-black/10 dark:border-b-white/25`}>

                         <Button
                              onClick={(e) => handleCategoryClick("location")}
                              endIcon={openFilterDropDown.includes("location") ? <FiMinus /> : <FiPlus />}
                              // className={`${openFilterDropDown.includes("location") ? "!bg-[#F5F7FC]" : "!bg-white"} !w-full !text-black !normal-case !text-sm !text-left !justify-between !py-4 !px-4 font-semibold`}
                              className={`${openFilterDropDown.includes("location") ? "bg-[#F5F7FC]! dark:bg-sidebar-dark-active!" : ""} w-full! text-black! dark:text-white/90! normal-case! text-sm! text-left! justify-between! py-4! px-4! font-semibold`}
                         >
                              Location
                         </Button>

                         <AnimatePresence >

                              {openFilterDropDown.includes("location") &&

                                   <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                             height: openFilterDropDown.includes("location") ? "auto" : 0,
                                             opacity: openFilterDropDown.includes("location") ? 1 : 0,
                                        }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                   >
                                        <ul className='category-list space-y-4 text-gray-600 dark:text-[#b3b3b3] px-6 py-4 '>
                                             {
                                                  JobLocations.map((location, index) => {

                                                       return (

                                                            <li key={index} className='flex items-center gap-3'>

                                                                 <Switch
                                                                      id={location}
                                                                      checked={selectedLocation.includes(location)}
                                                                      onChange={(e) => handleLocationChange(location)}
                                                                      size="small"
                                                                      sx={{
                                                                           "& .MuiSwitch-track": document.documentElement.classList.contains("dark") && {
                                                                                background: "white"
                                                                           }
                                                                      }}
                                                                 />
                                                                 <label className='cursor-pointer text-[13px]' htmlFor={location}>{location}</label>

                                                            </li>

                                                       )

                                                  })

                                             }
                                        </ul>
                                   </motion.div>
                              }
                         </AnimatePresence>

                    </div>

                    <div className='bg-white dark:bg-sidebar-dark px-4 category-container rounded border-b border-b-black/10 dark:border-b-white/25'>

                         <h2 className='text-sm dark:text-white/90 pt-3 font-medium'>Salary</h2>

                         <div className='py-6 px-3'>

                              <Slider
                                   getAriaLabel={() => 'Temperature range'}
                                   value={value}
                                   onChange={handleChange}
                                   valueLabelDisplay="auto"
                                   getAriaValueText={valuetext}
                                   disableSwap
                                   shiftStep={25}
                                   step={1000}
                                   min={MIN}
                                   max={MAX}
                              />

                              <p className='text-sm flex justify-center items-center gap-6 py-1 bg-black/80 text-gray-200 mt-4'>
                                   <span>₹ {value[0]}</span>
                                   <span>To</span>
                                   <span>₹ {value[1]}</span>
                              </p>

                         </div>

                    </div>

                    <div className={`bg-white dark:bg-sidebar-dark category-container rounded overflow-hidden border-b border-b-black/10 dark:border-b-white/25`}>

                         <Button
                              onClick={(e) => handleCategoryClick("jobtype")}
                              endIcon={openFilterDropDown.includes("jobtype") ? <FiMinus /> : <FiPlus />}
                              // className={`${openFilterDropDown.includes("jobtype") ? "!bg-[#F5F7FC]" : "!bg-white"} !w-full !text-black !normal-case !text-sm !text-left !justify-between !py-4 !px-4 font-semibold`}
                              className={`${openFilterDropDown.includes("jobtype") ? "bg-[#F5F7FC]! dark:bg-sidebar-dark-active!" : ""} w-full! text-black! dark:text-white/90! normal-case! text-sm! text-left! justify-between! py-4! px-4! font-semibold`}
                         >
                              Job Type
                         </Button>

                         <AnimatePresence >

                              {openFilterDropDown.includes("jobtype") &&

                                   <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                             height: openFilterDropDown.includes("jobtype") ? "auto" : 0,
                                             opacity: openFilterDropDown.includes("jobtype") ? 1 : 0,
                                        }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                   >
                                        <ul className='category-list space-y-4 text-gray-600 dark:text-[#b3b3b3] px-6 py-4 '>
                                             {
                                                  Jobtypes.map((type, index) => {

                                                       return (

                                                            <li key={index} className='flex items-center gap-3'>

                                                                 <Switch
                                                                      id={type.name}
                                                                      checked={selectedType.includes(type.name)}
                                                                      onChange={(e) => handleJobTypeChange(type.name)}
                                                                      size="small"
                                                                      sx={{
                                                                           "& .MuiSwitch-track": document.documentElement.classList.contains("dark") && {
                                                                                background: "white"
                                                                           }
                                                                      }}
                                                                 />

                                                                 <label className='cursor-pointer text-[13px]' htmlFor={type.name}>{type.name}</label>
                                                            </li>

                                                       )

                                                  })
                                             }
                                        </ul>
                                   </motion.div>
                              }
                         </AnimatePresence>

                    </div>

               </div>

          </div>

     );

}

export default Filter;
