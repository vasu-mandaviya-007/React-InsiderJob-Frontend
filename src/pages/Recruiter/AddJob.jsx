'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { assets, countries, JobCategories, JobLocations } from '../../assets/assets';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from "axios";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';

import { Editor } from "@tinymce/tinymce-react";
import api_paths from "../../config/apis";
import Button from '@mui/material/Button';


const Input = styled(MuiInput)`
  width: 70px;
  font-size : 14px;
`;


function valuetext(value) {
     return `${value}°C`;
}

const Jobtypes = [
     {
          id: 1,
          name: 'Full Time',
          avatar: "https://img.icons8.com/?size=100&id=ZQSwzt886UqA&format=png&color=000000"
     },
     {
          id: 2,
          name: 'Part Time',
          avatar: "https://img.icons8.com/?size=100&id=R28GTU6fB5qS&format=png&color=000000"
     },
     {
          id: 3,
          name: 'Internship',
          avatar: "https://img.icons8.com/?size=100&id=Uq25KqZQeZME&format=png&color=000000"
     },
]

const EmpType = [

     {
          id: 1,
          name: 'Parmanent',
          avatar: "https://img.icons8.com/?size=100&id=20497&format=png&color=000000"
     },
     {
          id: 2,
          name: 'Temporary',
          avatar: "https://img.icons8.com/?size=100&id=btIoQZB8x0fj&format=png&color=000000"
     },
     {
          id: 3,
          name: 'Freelance',
          avatar: "https://img.icons8.com/?size=100&id=zARik4JcFgQ6&format=png&color=000000"
     },
]


const AddJob = ({ onChange }) => {

     const [value, setValue] = useState([10000, 50000]);

     const MAX = 500000;
     const MIN = 5000;
     const minDistance = 5000;

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

     const handleBlur = () => {
     };


     const [JobTitle, setJobTitle] = useState("");
     const [JobDescription, setJobDescription] = useState("");

     const [selectedCategory, setSelectedCategory] = useState(JobCategories[0])
     const [JobType, setJobType] = useState([Jobtypes[0]]);
     const [selectEmpType, setSelectEmpType] = useState(EmpType[0]);

     const [selectedCountry, setSelectedCountry] = useState(countries[0]);
     const [selectedState, setSelectedState] = useState({ id: 0, name: "Select State" });
     const [selectedCity, setSelectedCity] = useState("Select City");

     const [states, setStates] = useState(countries[0].states);
     const [cities, setCities] = useState([]);

     const [Email, setEmail] = useState("");
     const [MobileNo, setMobileNo] = useState("");
     const [Address, setAddress] = useState("");

     const handleSelect = (person) => {
          setJobType((prev) =>
               prev.includes(person)
                    ? prev.filter((item) => item !== person) // Remove if already selected
                    : [...prev, person] // Add new selection
          );
     };

     const handleCountryChange = (e) => {
          setSelectedCountry(e);
          setSelectedState({ id: 0, name: "Select State" });
          setSelectedCity("Select City");
          setStates(null);
          setStates(e ? e.states : null)
     }

     const handleStateChange = (e) => {
          setSelectedState(e);
          setSelectedCity("Select City");
          setCities(null);
          setCities(e && e.id !== 0 ? e?.cities : null)
     }

     const [content, setContent] = useState("");

     const handleSubmit = async () => {

          const requiredFields = {
               JobTitle,
               JobDescription,
               selectedCategory,
               JobType,
               selectEmpType,
               selectedCountry,
               selectedState: selectedState.id !== 0 ? selectedState : "",
               selectedCity: selectedCity !== "Select City" ? selectedCity : "",
               Email,
               MobileNo,
               Address
          };

          for (const [key, value] of Object.entries(requiredFields)) {
               if (!value || (Array.isArray(value) && value.length === 0)) {
                    toast.error(`${key.replace(/([A-Z])/g, " $1")} is required`, { className: "top-6" });
                    return;
               }
          }

          // console.log("Form submitted successfully", requiredFields);
          try {

               const token = localStorage.getItem("JobPortalAuthToken");

               const jobtypearr = JobType.map((job)=>{
                    return job.name;
               })


               const response = await axios.post(
                    api_paths.postNewJob,
                    { title: JobTitle, JobDescription: JobDescription, Category: selectedCategory.name, JobType: jobtypearr, EmployementType: selectEmpType.name, Country: selectedCountry.name, State: selectedState.name, City: selectedCity, Salary: value, Email: Email, PhoneNo: MobileNo, Address: Address },
                    { headers: { 'Content-Type': 'application/json', "token": token } });

               if (response.data?.success) {

                    Swal.fire({
                         title: response.data?.message,
                         icon: "success"
                    })

                    // toast.success("Success")

               }
               console.log(response.data)

          } catch (e) {
               Swal.fire("Error")
               console.log(e);
          }

     };



     return (

          <div className='p-16 pr-20'>

               <div className="input-box flex flex-col">
                    <label className="block text-sm/6 font-medium dark:text-white" htmlFor="">Job Title</label>
                    <input value={JobTitle} onChange={(e) => setJobTitle(e.target.value)} className='bg-white dark:text-black border-2 mt-1 py-1.5 outline-none px-3 text-sm rounded focus:ring-3 focus:ring-blue-200 focus:border-blue-300 border-gray-300' type="text" placeholder='Type Job Title Here' />
               </div>

               <div className="input-box mt-6 flex flex-col">
                    
                    <label className="block text-sm/6 font-medium dark:text-white" htmlFor="">Job Description</label>
                    {/* <textarea value={JobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={5} className='border-2 min-h-[100px] mt-1 py-1.5 outline-none px-3 text-sm rounded focus:ring-3 focus:ring-blue-200 focus:border-blue-300 border-gray-300' type="text" placeholder='Type Job Title Here' /> */}
                    {/* <div ref={editorRef}></div> */}
                    {/* <Editor
                         apiKey="your-api-key" // Get from tiny.cloud (free)
                         init={{ height: 300, menubar: false }}
                    /> */}
                    <Editor
                         apiKey='11fdmdnvfo0kfifikr73kbxmr7z21mwn5ytlvteu7ei0ef16'
                         init={{
                              plugins: [
                                   // Core editing features
                                   'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                   // Your account includes a free trial of TinyMCE premium features
                                   // Try the most popular premium features until Feb 15, 2025:
                                   'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                              ],
                              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                              tinycomments_mode: 'embedded',
                              tinycomments_author: 'Author name',
                              mergetags_list: [
                                   { value: 'First.Name', title: 'First Name' },
                                   { value: 'Email', title: 'Email' },
                              ],
                              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                         }}
                         initialValue="<h3>Job Description</h3>"
                         onEditorChange={(newContent) => {
                              setJobDescription(newContent);
                              onChange && onChange(newContent);
                         }}
                    />
               </div>

               <div className='flex items-center gap-6 mt-6' >

                    <div className='w-full'>

                         <Listbox value={selectedCategory} onChange={setSelectedCategory}>

                              <Label className="block text-sm/6 font-medium dark:text-white">Job Category</Label>

                              <div className="relative mt-2">
                                   <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                             <img alt="" src={selectedCategory.avatar} className="size-5 shrink-0 rounded-full" />
                                             <span className="block truncate">{selectedCategory.name}</span>
                                        </span>
                                        <HiMiniChevronUpDown
                                             aria-hidden="true"
                                             className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                   </ListboxButton>

                                   <ListboxOptions
                                        transition
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                   >
                                        {JobCategories.map((person, i) => (
                                             <ListboxOption
                                                  key={person.id}
                                                  value={person}
                                                  className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                             >
                                                  <div className="flex items-center">
                                                       <img alt="" src={person.avatar} className="size-5 shrink-0 rounded-full" />
                                                       <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{person.name}</span>
                                                  </div>

                                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                                       <FaCheck aria-hidden="true" className="size-5" />
                                                  </span>
                                             </ListboxOption>
                                        ))}
                                   </ListboxOptions>
                              </div>

                         </Listbox>

                    </div>

                    <div className='w-full'>

                         <Listbox multiple={true} value={JobType} onChange={setJobType}>

                              <Label className="block text-sm/6 font-medium dark:text-white">Job Type</Label>

                              <div className="relative mt-2">
                                   <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                             {JobType.length > 0 && <img alt="" src={JobType[0]?.avatar} className="size-5 shrink-0 rounded-full" />}
                                             <span className="block truncate">{JobType.length > 0 ? JobType.map((p) => p.name).join(", ") : "Select Fields"}</span>
                                        </span>
                                        <HiMiniChevronUpDown
                                             aria-hidden="true"
                                             className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                   </ListboxButton>

                                   <ListboxOptions
                                        transition
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                   >
                                        {Jobtypes.map((type) => (
                                             <ListboxOption
                                                  key={type.id}
                                                  value={type}
                                                  onClick={() => handleSelect(type)}
                                                  className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                             >
                                                  <div className="flex items-center">
                                                       <img alt="" src={type.avatar} className="size-5 shrink-0 rounded-full" />
                                                       <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{type.name}</span>
                                                  </div>

                                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                                       <FaCheck aria-hidden="true" className="size-5" />
                                                  </span>
                                             </ListboxOption>
                                        ))}
                                   </ListboxOptions>
                              </div>

                         </Listbox>

                    </div>

                    <div className='w-full'>

                         <Listbox value={selectEmpType} onChange={setSelectEmpType}>

                              <Label className="block text-sm/6 font-medium dark:text-white">Employment Type</Label>

                              <div className="relative mt-2">
                                   <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                             <img alt="" src={selectEmpType.avatar} className="size-5 shrink-0 rounded-full" />
                                             <span className="block truncate">{selectEmpType.name}</span>
                                        </span>
                                        <HiMiniChevronUpDown
                                             aria-hidden="true"
                                             className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                   </ListboxButton>

                                   <ListboxOptions
                                        transition
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                   >
                                        {EmpType.map((type) => (
                                             <ListboxOption
                                                  key={type.id}
                                                  value={type}
                                                  className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                             >
                                                  <div className="flex items-center">
                                                       <img alt="" src={type.avatar} className="size-5 shrink-0 rounded-full" />
                                                       <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{type.name}</span>
                                                  </div>

                                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                                       <FaCheck aria-hidden="true" className="size-5" />
                                                  </span>
                                             </ListboxOption>
                                        ))}
                                   </ListboxOptions>
                              </div>

                         </Listbox>

                    </div>

               </div>

               {/* JOB LOCATION DETAILS */}
               <div className='flex items-center gap-6 mt-6'>

                    <div className='w-full'>
                         <Listbox value={selectedCountry} onChange={handleCountryChange}>
                              <Label className="block text-sm/6 font-medium dark:text-white"> Country </Label>
                              <div className="relative mt-2">
                                   <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                             <img alt="" src={selectedCountry.flag} className="size-5 shrink-0 rounded-full" />
                                             <span className="block truncate">{selectedCountry.name}</span>
                                        </span>
                                        <HiMiniChevronUpDown
                                             aria-hidden="true"
                                             className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                   </ListboxButton>

                                   <ListboxOptions
                                        transition
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                   >
                                        {countries.map((location, i) => (
                                             <ListboxOption
                                                  key={location.id}
                                                  value={location}
                                                  className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                             >
                                                  <div className="flex items-center">
                                                       <img alt="" src={location.flag} className="size-5 shrink-0 rounded-full" />
                                                       <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{location.name}</span>
                                                  </div>

                                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                                       <FaCheck aria-hidden="true" className="size-5" />
                                                  </span>
                                             </ListboxOption>
                                        ))}
                                   </ListboxOptions>
                              </div>
                         </Listbox>
                    </div>

                    <div className='w-full'>
                         <Listbox value={selectedState} onChange={handleStateChange}>
                              <Label className="block text-sm/6 font-medium dark:text-white"> State </Label>
                              <div className="relative mt-2">
                                   <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                             <img alt="" src="https://img.icons8.com/?size=100&id=nJnRKYQXLlJx&format=png&color=000000" className="size-5 shrink-0 rounded-full" />
                                             <span className="block truncate">{selectedState?.name}</span>
                                        </span>
                                        <HiMiniChevronUpDown
                                             aria-hidden="true"
                                             className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                   </ListboxButton>

                                   <ListboxOptions
                                        transition
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                   >
                                        <ListboxOption
                                             key={0}
                                             value={{ id: 0, name: "Select State", cities: [] }}
                                             // disabled={true}
                                             className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-700 select-none data-focus:bg-gray-100  data-focus:outline-hidden"
                                        >
                                             <div className="flex items-center">
                                                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">Select State</span>
                                             </div>

                                        </ListboxOption>
                                        {states.map((location, i) => (
                                             <ListboxOption
                                                  key={location.id}
                                                  value={location}
                                                  className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                             >
                                                  <div className="flex items-center">
                                                       <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{location.name}</span>
                                                  </div>

                                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                                       <FaCheck aria-hidden="true" className="size-5" />
                                                  </span>
                                             </ListboxOption>
                                        ))}
                                   </ListboxOptions>
                              </div>
                         </Listbox>
                    </div>

                    <div className='w-full'>
                         <Listbox value={selectedCity} onChange={setSelectedCity}>
                              <Label className="block text-sm/6 font-medium dark:text-white"> City </Label>
                              <div className="relative mt-2">
                                   <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                             <img alt="" src={assets.city_img} className="size-5 shrink-0 rounded-full" />
                                             <span className="block truncate">{selectedCity}</span>
                                        </span>
                                        <HiMiniChevronUpDown
                                             aria-hidden="true"
                                             className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                   </ListboxButton>

                                   <ListboxOptions
                                        transition
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                   >
                                        <ListboxOption
                                             key={0}
                                             value={"Select City"}
                                             // disabled={true}
                                             className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-700 select-none data-focus:bg-gray-100  data-focus:outline-hidden"
                                        >
                                             <div className="flex items-center">
                                                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">Select City</span>
                                             </div>

                                        </ListboxOption>

                                        {cities && cities.map((location, i) => (
                                             <ListboxOption
                                                  key={i}
                                                  value={location}
                                                  className="group relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                             >
                                                  <div className="flex items-center">
                                                       <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{location}</span>
                                                  </div>

                                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                                       <FaCheck aria-hidden="true" className="size-5" />
                                                  </span>
                                             </ListboxOption>
                                        ))}
                                   </ListboxOptions>
                              </div>
                         </Listbox>
                    </div>

               </div>

               <div className='flex mt-8 items-start gap-8'>
                    {/* <div className="input-box w-full flex flex-col">
                         <label className="block text-sm/6 font-medium text-gray-900" htmlFor="">Salary</label>
                         <input className='border-2 w-full mt-1 py-2 outline-none px-3 text-sm rounded focus:ring-3 focus:ring-blue-200 focus:border-blue-300 border-gray-300' type="text" placeholder='Enter Salary' />
                    </div> */}

                    <Box sx={{ width: "75%" }}>

                         <label className="block mb-2 text-sm/6 font-medium dark:text-white" htmlFor="">Salary</label>

                         <div className='flex items-center'>

                              <div className=''>
                                   <label className=" font-medium dark:text-white" htmlFor="">₹ </label>
                                   <Input
                                        value={value[0]}
                                        className='bg-white'
                                        size="small"
                                        name='start'
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                             step: 1000,
                                             min: MIN,
                                             max: MAX,
                                             type: 'number',
                                             'aria-labelledby': 'input-slider',
                                        }}
                                   />
                              </div>

                              <label className="mx-5 font-medium dark:text-white" htmlFor="">To </label>

                              <div className='flex items-center gap-2'>
                                   <label className="font-medium dark:text-white" htmlFor="">₹ </label>
                                   <Input
                                        value={value[1]}
                                        size="small"
                                        name='end'
                                        className='bg-white'
                                        onChange={handleInputChange2}
                                        onBlur={handleBlur}
                                        inputProps={{
                                             step: 1000,
                                             min: MIN,
                                             max: MAX,
                                             type: 'number',
                                             'aria-labelledby': 'input-slider',
                                        }}
                                   />
                              </div>

                         </div>

                         <Slider
                              getAriaLabel={() => 'Temperature range'}
                              value={value}
                              onChange={handleChange}
                              valueLabelDisplay="auto"
                              getAriaValueText={valuetext}
                              disableSwap
                              shiftStep={30}
                              step={1000}
                              min={MIN}
                              max={MAX}
                         />

                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography
                                   variant="body2"
                                   onClick={() => setValue(prev => {
                                        const newArray = [...prev]; // Copy old array
                                        newArray[0] = MIN; // Change second element
                                        return newArray; // Update state
                                   })}
                                   sx={{ cursor: 'pointer' }}
                              >
                                   {MIN} min
                              </Typography>
                              <Typography
                                   variant="body2"
                                   onClick={() => setValue(prev => {
                                        const newArray = [...prev]; // Copy old array
                                        newArray[1] = MAX; // Change second element
                                        return newArray; // Update state
                                   })}
                                   sx={{ cursor: 'pointer' }}
                              >
                                   {MAX} max
                              </Typography>
                         </Box>

                    </Box>

                    <div className='flex flex-col w-full justify-center'>
                         <label className="mb-1.5 block text-sm/6 font-medium dark:text-white" htmlFor="">Last Date To Apply</label>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                   className='date-picker bg-white rounded'
                                   // label="Last Date To Apply"
                                   viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                   }}
                              />
                         </LocalizationProvider>

                    </div>

               </div>


               <div className='flex items-center justify-center mt-10 mb-8'>
                    <hr className='outline outline-gray-400 border-none w-full' />
                    <h2 className='text-gray-500 font-semibold text-lg px-4 text-nowrap'>Contact Info</h2>
                    <hr className='outline outline-gray-400 border-none w-full' />
               </div>

               <div className='flex items-center gap-4 mt-4'>
                    <div className="input-box w-full flex flex-col">
                         <label className="block text-sm/6 font-medium dark:text-white" htmlFor="">Email Address</label>
                         <input value={Email} onChange={(e) => setEmail(e.target.value)} className='bg-white border-2 mt-1 py-2 outline-none px-3 text-sm rounded focus:ring-3 focus:ring-blue-200 focus:border-blue-300 border-gray-300' type="text" placeholder='Enter Company Email Address' />
                    </div>
                    <div className="input-box w-full flex flex-col">
                         <label className="block text-sm/6 font-medium dark:text-white" htmlFor="">Contact Number</label>
                         <input value={MobileNo} onChange={(e) => setMobileNo(e.target.value)} className='bg-white border-2 mt-1 py-2 outline-none px-3 text-sm rounded focus:ring-3 focus:ring-blue-200 focus:border-blue-300 border-gray-300' type="text" placeholder='Enter Contact Number' />
                    </div>
               </div>

               <div className="input-box mt-6 flex flex-col">
                    <label className="block text-sm/6 font-medium dark:text-white" htmlFor="">Address</label>
                    <textarea value={Address} onChange={(e) => setAddress(e.target.value)} rows={5} className='bg-white border-2 mt-1 py-1.5 min-h-[100px] outline-none px-3 text-sm rounded focus:ring-3 focus:ring-blue-200 focus:border-blue-300 border-gray-300' type="text" placeholder='Type Company Address Here...' />
               </div>

               {/* <Button text={"Post Job"} onClick={handleSubmit} className='mt-5 w-full py-2 bg-primary text-white font-semibold text-lg rounded-lg focus:ring-4 focus:outline focus:outline-white focus:ring-blue-300 duration-200 hover:bg-primary-hover' /> */}
               <Button variant='contained' onClick={handleSubmit} >Post job</Button>

          </div>

     );
}

export default AddJob;
