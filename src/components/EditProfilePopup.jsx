import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import Select from './UI/Select';
import { Button, stepLabelClasses } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import SearchBox from './UI/SearchBox';
import { countries } from '../assets/assets';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SmallLoader from './SmallLoader';
import SearchBox2 from './UI/SearchBox2';
import { images } from '../assets/images';

const EditProfilePopup = ({ pageNo, setpageNo, handleEditProfileClose, showEditProfilebox }) => {

     const [school, setschool] = useState([]);

     const colleges = [
          {
               name: "Gujarat University",
               location: "Ahmedabad",
               image: images.gujarat_university
          },
          {
               name: "Maharaja Sayajirao University of Baroda",
               location: "Vadodara",
               image: images.sayajirao_university
          },
          {
               name: "Sardar Vallabhbhai National Institute of Technology",
               location: "Surat",
               image: images.sardarpatel_university
          },
          {
               name: "Indian Institute of Management Ahmedabad",
               location: "Ahmedabad",
               image: images.IIMA_logo
          },
          {
               name: "Nirma University",
               location: "Ahmedabad",
               image: images.nirma_university
          },
          {
               name: "Dhirubhai Ambani Institute of Information and Communication Technology",
               location: "Gandhinagar",
               image: images.dhirubhai_college_logo
          },
          {
               name: "Pandit Deendayal Energy University",
               location: "Gandhinagar",
               image: images.Pandit_Deendayal_Energy_University_logo
          },
          {
               name: "CEPT University",
               location: "Ahmedabad",
               image: images.CEPT_University_logo
          },
          {
               name: "Gujarat Technological University",
               location: "Ahmedabad",
               image: images.gujarat_technological_university
          },
          {
               name: "Saurashtra University",
               location: "Rajkot",
               image: images.saurashtra_university
          }
     ];

     const courses = [
          "Bachelor of Computer Application - BCA",
          "Bachelor of Technology - B.Tech",
          "Bachelor of Science in Information Technology - BSc IT",
          "Bachelor of Business Administration - BBA",
          "Bachelor of Commerce - B.Com",
          "Bachelor of Arts - BA",
          "Bachelor of Science - BSc",
          "Bachelor of Engineering - BE",
          "Bachelor of Computer Science - BCS",
          "Bachelor of Pharmacy - B.Pharm",
          "Bachelor of Architecture - B.Arch",
          "Bachelor of Fine Arts - BFA",
          "Bachelor of Design - B.Des",
          "Bachelor of Social Work - BSW",
          "Bachelor of Hotel Management - BHM"
     ];

     const fieldsOfStudy = [
          // Science & Technology
          "Computer Science",
          "Information Technology",
          "Software Engineering",
          "Data Science",
          "Artificial Intelligence",
          "Cybersecurity",
          "Web Development",
          "Cloud Computing",
          "Machine Learning",
          "Blockchain",
          "Electrical Engineering",
          "Mechanical Engineering",
          "Civil Engineering",
          "Aerospace Engineering",
          "Biomedical Engineering",
          "Chemical Engineering",
          "Environmental Science",
          "Robotics",
          "Nanotechnology",
          "Astronomy",
          "Physics",
          "Mathematics",
          "Biotechnology",
          "Genetics",
          "Bioinformatics",
          "Neuroscience",
          "Pharmaceutical Sciences",
          "Medical Science",
          "Forensic Science",
          "Geology",
          "Marine Biology",
          "Zoology",
          "Ecology",
          "Meteorology",
          "Agriculture",

          // Business & Management
          "Business Administration",
          "Marketing",
          "Finance",
          "Accounting",
          "Economics",
          "Entrepreneurship",
          "Human Resource Management",
          "Supply Chain Management",
          "International Business",
          "Hospitality Management",
          "Tourism Management",
          "Real Estate Management",

          // Arts & Humanities
          "History",
          "Philosophy",
          "Linguistics",
          "Literature",
          "Political Science",
          "Sociology",
          "Psychology",
          "Anthropology",
          "Archaeology",
          "Cultural Studies",
          "Theology",
          "Fine Arts",
          "Performing Arts",
          "Music",
          "Graphic Design",
          "Interior Design",
          "Fashion Design",

          // Health & Medicine
          "Nursing",
          "Dentistry",
          "Pharmacy",
          "Physical Therapy",
          "Public Health",
          "Nutrition",
          "Veterinary Science",
          "Occupational Therapy",
          "Radiology",
          "Sports Science",

          // Social Sciences & Law
          "Law",
          "Criminology",
          "International Relations",
          "Public Administration",
          "Social Work",
          "Urban Planning",
          "Gender Studies",

          // Education & Teaching
          "Education",
          "Early Childhood Education",
          "Special Education",
          "Educational Technology",
          "Curriculum Development",
          "Linguistics & Language Teaching",

          // Miscellaneous
          "Library Science",
          "Journalism",
          "Mass Communication",
          "Film Studies",
          "Photography",
          "Ethics",
          "Game Development",
          "Sports Management",
          "Culinary Arts",
          "Astrobiology"
     ];

     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


     const [states, setStates] = useState([]);
     const [cities, setcities] = useState([]);


     const [isloading, setisloading] = useState(false);
     const [isOpenMenu, setisOpenMenu] = useState(false);

     const [selectedCountry, setselectedCountry] = useState("");
     const [selectedState, setselectedState] = useState("");
     const [selectedCity, setselectedCity] = useState("");
     const [selectedSchoole, setselectedSchoole] = useState("");



     // States for Add New Education
     const [selectedNewCollege, setselectedNewCollege] = useState("");
     const [selectedCourse, setselectedCourse] = useState("");
     const [selectedStudyFiled, setSelectedStudyFiled] = useState("");
     const [startYear, setStartYear] = useState("");
     const [startMonth, setStartMonth] = useState("");
     const [endYear, setEndYear] = useState("");
     const [endMonth, setEndMonth] = useState("");
     const [activities, setActivities] = useState("");
     const [desctiption, setDesctiption] = useState("");


     const handlePageChange = (no) => {
          setisloading(true);
          setTimeout(() => {
               setpageNo(no);
               setisloading(false);
          }, 2000);
     }

     useEffect(() => {

          if (selectedCountry !== "") {
               setselectedState("");
               const stateArr = countries.find(country => country.name === selectedCountry);
               setStates(stateArr.states)
          } else {
               setselectedState("");
          }

     }, [selectedCountry])

     useEffect(() => {

          setselectedCity("");

          if (selectedState !== "" && selectedState !== "No") {
               const cityArr = states.find(state => state.name === selectedState);
               setcities(cityArr.cities)
          }

     }, [selectedState])


     // Handle Add Education Button Click
     const handleAddEducation = () => {

          console.log("selectedNewCollege", selectedNewCollege);
          console.log("selectedCourse", selectedCourse);
          console.log("selectedStudyFiled", selectedStudyFiled);
          console.log("startYear", startYear);
          console.log("startMonth", startMonth);
          console.log("endYear", endYear);
          console.log("endMonth", endMonth);
          console.log("activities", activities);
          console.log("desctiption", desctiption);

          school.push(selectedNewCollege);
          console.log(school)

     }

     return (

          <div className={`fixed bg-white flex flex-col shadow-2xl z-10 top-1/2 left-1/2 -translate-x-1/2  w-[800px] max-h-[90%] overflow-hidden rounded duration-500 ${showEditProfilebox ? "-translate-y-1/2 opacity-100 pointer-events-auto" : "-translate-y-[375px] pointer-events-none opacity-0"} `}>

               <div className='flex justify-between items-center px-6 py-4 bg-[#FAFAFA] border-b border-b-gray-300'>

                    <h2 className='text-xl font-semibold'>{pageNo == 2 ? "Add Education" : "Edit Profile"}</h2>
                    <IoMdClose onClick={handleEditProfileClose} className='bg-black text-white h-10 w-10 text-lg p-2 rounded hover:bg-primary cursor-pointer duration-300' />

               </div>


               {isloading &&
                    <div className='flex items-center justify-center min-h-[350px]'>
                         <div className='w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'></div>
                    </div>
               }

               {!isloading &&
                    pageNo == 1
                    ? (

                         <div className='flex flex-col overflow-y-auto gap-6 p-8 pb-40'>

                              <div className='flex flex-col '>

                                   <label htmlFor="fullname" className="input-label">Full Name</label>

                                   <input
                                        type="text"
                                        // onChange={(e) => handleChange(e)}
                                        // value={formData.fullname}
                                        name='fullname'
                                        id="fullname"
                                        placeholder='Enter Your Full Name'
                                        className='input-field'
                                   // className='bg-gray-50 text-sm rounded-xs px-4 text-[#222] py-4 border border-gray-200 focus:outline focus:outline-primary '
                                   />

                                   <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Name is Required</span>

                              </div>

                              <div className='flex gap-4'>

                                   <div className='flex w-full flex-col '>

                                        <label htmlFor="email" className="input-label">Email</label>

                                        <input
                                             type="email"
                                             // onChange={(e) => handleChange(e)}
                                             // value={formData.fullname}
                                             name='email'
                                             id="email"
                                             placeholder='Enter Your Email Address'
                                             className='input-field'
                                        // className='bg-gray-50 text-sm rounded-xs px-4 text-[#222] py-4 border border-gray-200 focus:outline focus:outline-primary '
                                        />

                                        <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Email is Required</span>

                                   </div>

                                   <div className='flex w-full flex-col '>

                                        <label htmlFor="number" className="input-label">Phone Number</label>

                                        <input
                                             type="text"
                                             // onChange={(e) => handleChange(e)}
                                             // value={formData.fullname}
                                             name='number'
                                             id="number"
                                             placeholder='Enter Your Full Name'
                                             className='input-field'
                                        // className='bg-gray-50 text-sm rounded-xs px-4 text-[#222] py-4 border border-gray-200 focus:outline focus:outline-primary '
                                        />

                                        <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Phone Number is Required</span>

                                   </div>

                              </div>

                              <div className='flex'>

                                   <div className='flex w-full flex-col '>

                                        <label htmlFor="" className="input-label">Gender</label>

                                        <div className='flex items-center gap-3'>
                                             <div className="radio-btn">
                                                  <input type="radio" name="gender" id="male" className="hidden" defaultChecked />
                                                  <label htmlFor="male" className='flex items-center justify-center border border-gray-400 text-sm px-6 py-2 bg-white hover:bg-blue-400 hover:text-white duration-300 rounded cursor-pointer ' >Male</label>
                                             </div>
                                             <div className="radio-btn">
                                                  <input type="radio" name="gender" id="female" className="hidden" />
                                                  <label htmlFor="female" className='flex items-center justify-center border border-gray-400 text-sm px-6 py-2 bg-white hover:bg-blue-400 hover:text-white duration-300 rounded cursor-pointer ' >Female</label>
                                             </div>
                                             <div className="radio-btn">
                                                  <input type="radio" name="gender" id="other" className="hidden" />
                                                  <label htmlFor="other" className='flex items-center justify-center border border-gray-400 text-sm px-6 py-2 bg-white hover:bg-blue-400 hover:text-white duration-300 rounded cursor-pointer ' >Other</label>
                                             </div>
                                        </div>

                                        <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Name is Required</span>

                                   </div>

                                   <div className='flex flex-col w-full justify-center'>
                                        <label className="input-label mb-1" htmlFor="">Date of Birth</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                             <DateTimePicker
                                                  className='date-picker bg-white '
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

                              <h1 className="mt-4 font-semibold font-roboto text-2xl" >Education</h1>

                              <div className='flex flex-col '>

                                   <label htmlFor="fullname" className="input-label">Schoole</label>

                                   {/* <Select
                                        label={"Please Select Schoole"}
                                        isOpenMenu={isOpenMenu}
                                        schoole={schoole}
                                        setisOpenMenu={setisOpenMenu}
                                        selectedSchoole={selectedSchoole}
                                        setselectedSchoole={setselectedSchoole}
                                   /> */}

                                   <SearchBox
                                        label={"Enter Schoole"}
                                        id={"schoole"}
                                        name={"schoole"}
                                        className='shadow-xs'
                                        inputClassName="!py-3.5 !bg-[#FCFCFC] text-sm "
                                        selectedValue={selectedSchoole}
                                        setSelectedValue={setselectedSchoole}
                                        values={school}
                                   />


                                   {/* <Select label={"Please Select Schoole"} isOpenMenu={isOpenMenu2} schoole={schoole} setisOpenMenu={setisOpenMenu2} selectedSchoole={selectedSchoole2} setselectedSchoole={setselectedSchoole2} /> */}

                                   <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Name is Required</span>

                                   <Button variant="text" onClick={() => handlePageChange(2)} startIcon={<FaPlus />} className='!w-fit !pr-6 !pl-3 !mt-3 !font-semibold'>Add Education</Button>

                              </div>


                              <h1 className="mt-4 font-semibold font-roboto text-2xl" >Location</h1>


                              <div className='flex w-full flex-col '>

                                   <label htmlFor="country" className="input-label">Country</label>

                                   {/* <SearchBox label={"Enter Country"} id={"country"} name={"country"} className='shadow-xs' inputClassName="!py-3.5 !bg-gray-50 " selectedValue={selectedCountry} setSelectedValue={setselectedCountry} values={countries.map(country => country.name)} /> */}
                                   <SearchBox2 label={"Enter Country"} id={"country"} name={"country"} className='shadow-xs' inputClassName="!py-3.5 !bg-gray-50 " selectedValue={selectedCountry} setSelectedValue={setselectedCountry} values={countries.map(country => ({ name: country.name }))} />

                                   <span className={`${countries.filter(country => country.name.toLowerCase() === selectedCountry.toLowerCase()).length > 0 ? "hidden" : selectedCountry == "No" ? "visible" : "hidden"} text-sm text-red-500 ml-1 mt-0.5 `} >Please Select Country</span>

                              </div>

                              {selectedCountry !== "" && <div className='flex w-full flex-col '>

                                   <label htmlFor="state" className="input-label">State</label>

                                   {/* <SearchBox label={"Enter State"} id={"state"} name={"state"} className='shadow-xs' inputClassName="!py-3.5 !bg-gray-50 " selectedValue={selectedState} setSelectedValue={setselectedState} values={states.map(state => state.name)} /> */}
                                   <SearchBox2 label={"Enter State"} id={"state"} name={"state"} className='shadow-xs' inputClassName="!py-3.5 !bg-gray-50 " selectedValue={selectedState} setSelectedValue={setselectedState} values={states.map(state => ({ name: state.name }))} />

                                   <span className={`${states.filter(state => state.name.toLowerCase() === selectedState.toLowerCase()).length > 0 ? "hidden" : selectedState == "No" ? "visible" : "hidden"} text-sm text-red-500 ml-1 mt-0.5 `} >Please Select City</span>

                              </div>}

                              {selectedState !== "" && <div className='flex w-full flex-col '>

                                   <label htmlFor="city" className="input-label">City</label>

                                   {/* <SearchBox label={"Enter City"} id={"city"} name={"city"} className='shadow-xs' inputClassName="!py-3.5 !bg-gray-50 " selectedValue={selectedCity} setSelectedValue={setselectedCity} values={cities} /> */}
                                   <SearchBox2 label={"Enter City"} id={"city"} name={"city"} className='shadow-xs' inputClassName="!py-3.5 !bg-gray-50 " selectedValue={selectedCity} setSelectedValue={setselectedCity} values={cities.map(city => ({ name: city }))} />

                                   <span className={`${cities.filter(city => city.toLowerCase() === selectedCity.toLowerCase()).length > 0 ? "hidden" : selectedCity == "No" ? "visible" : "hidden"} text-sm text-red-500 ml-1 mt-0.5 `} >Please Select City</span>

                              </div>}

                              {/* <button className='border px-4 py-2' onClick={() => console.log(`Country : ${selectedCountry}\nState : ${selectedState} \nCity : ${selectedCity}`)}>State</button> */}
                              <button className='border px-4 py-2' onClick={() => console.log(schoole)}>State</button>



                              <div className='flex flex-col '>

                                   <label htmlFor="address" className="input-label">Address</label>

                                   <textarea
                                        // onChange={(e) => handleChange(e)}
                                        // value={formData.address}
                                        rows={5}
                                        name='address'
                                        id="address"
                                        placeholder='Enter Your Address Here'
                                        className='input-field'
                                   // className='bg-gray-50 text-sm rounded-xs px-4 text-[#222] py-4 border border-gray-200 focus:outline focus:outline-primary '
                                   />

                                   <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Address is Required</span>

                              </div>

                         </div>

                    )
                    :
                    pageNo == 2 && (

                         <div className='flex min-h-[450px] flex-col z-10 overflow-y-auto gap-6 p-8'>

                              {/* <div className='flex flex-col '>

                                   <label htmlFor="fullname" className="input-label">Full Name</label>

                                   <input
                                        type="text"
                                        // onChange={(e) => handleChange(e)}
                                        // value={formData.fullname}
                                        name='fullname'
                                        id="fullname"
                                        placeholder='Enter Your Full Name'
                                        className='input-field'
                                   // className='bg-gray-50 text-sm rounded-xs px-4 text-[#222] py-4 border border-gray-200 focus:outline focus:outline-primary '
                                   />

                                   <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Name is Required</span>

                              </div> */}

                              <div className='flex w-full flex-col '>

                                   <label htmlFor="college" className="input-label">College</label>

                                   {/* <SearchBox label={"Enter Country"} id={"country"} name={"country"} className='shadow-xs' inputClassName="!py-3.5 !bg-gray-50 " selectedValue={selectedCountry} setSelectedValue={setselectedCountry} values={countries.map(country => country.name)} /> */}
                                   <SearchBox2
                                        id={"college"}
                                        name={"college"}
                                        className='shadow-xs'
                                        inputClassName="!py-3.5"
                                        label={"Enter College"}
                                        values={colleges}
                                        showIcon={true}
                                        selectedValue={selectedNewCollege}
                                        setSelectedValue={setselectedNewCollege}
                                        maxHeight={200}
                                   />

                                   {/* <span className={`${countries.filter(country => country.name.toLowerCase() === selectedCountry.toLowerCase()).length > 0 ? "hidden" : selectedCountry == "No" ? "visible" : "hidden"} text-sm text-red-500 ml-1 mt-0.5 `} >Please Select Country</span> */}

                              </div>

                              <div className='flex w-full flex-col '>

                                   <label htmlFor="course" className="input-label">Degree</label>

                                   <SearchBox label={"Enter Course"} id={"course"} name={"course"} className='shadow-xs' inputClassName="!py-3.5 !bg-[#FCFCFC] text-sm " selectedValue={selectedCourse} setSelectedValue={setselectedCourse} values={courses} />


                                   {/* <span className={`${countries.filter(country => country.name.toLowerCase() === selectedCountry.toLowerCase()).length > 0 ? "hidden" : selectedCountry == "No" ? "visible" : "hidden"} text-sm text-red-500 ml-1 mt-0.5 `} >Please Select Country</span> */}

                              </div>

                              <div className='flex w-full flex-col '>

                                   <label htmlFor="field" className="input-label">Field of Study</label>

                                   <SearchBox label={"Enter Field"} id={"field"} name={"field"} className='shadow-none' inputClassName="!py-3.5 !bg-[#FCFCFC] text-sm " selectedValue={selectedStudyFiled} setSelectedValue={setSelectedStudyFiled} values={fieldsOfStudy} />
                                   {/* <span className={`${countries.filter(country => country.name.toLowerCase() === selectedCountry.toLowerCase()).length > 0 ? "hidden" : selectedCountry == "No" ? "visible" : "hidden"} text-sm text-red-500 ml-1 mt-0.5 `} >Please Select Country</span> */}

                              </div>



                              <div className='flex items-end gap-4'>

                                   <div className='flex w-full flex-col '>

                                        <label htmlFor="stMonth" className="input-label">Start Date</label>

                                        <SearchBox label={"Enter Month"} id={"stMonth"} name={"stMonth"} className='shadow-none' inputClassName="!py-3.5 !bg-[#FCFCFC] text-sm " selectedValue={startMonth} setSelectedValue={setStartMonth} values={months} />

                                   </div>

                                   <div className='flex w-full flex-col '>

                                        <SearchBox label={"Enter Year"} id={"stYear"} name={"stYear"} className='shadow-none' inputClassName="!py-3.5 !bg-[#FCFCFC] text-sm " selectedValue={startYear} setSelectedValue={setStartYear} values={Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - 100 + (i + 1)).toString()).reverse()} />

                                   </div>

                              </div>

                              <div className='flex items-end gap-4'>

                                   <div className='flex w-full flex-col '>

                                        <label htmlFor="endMonth" className="input-label">End Date (Expected)</label>

                                        <SearchBox label={"Enter Month"} id={"endMonth"} name={"endMonth"} className='shadow-none' inputClassName="!py-3.5 !bg-[#FCFCFC] text-sm " selectedValue={endMonth} setSelectedValue={setEndMonth} values={months} />

                                   </div>

                                   <div className='flex w-full flex-col '>

                                        <SearchBox label={"Enter Year"} id={"endYear"} name={"endYear"} className='shadow-none' inputClassName="!py-3.5 !bg-[#FCFCFC] text-sm " selectedValue={endYear} setSelectedValue={setEndYear} values={Array.from({ length: 110 }, (_, i) => (new Date().getFullYear() - 100 + (i + 1)).toString()).reverse()} />

                                   </div>

                              </div>

                              <div className='flex flex-col '>

                                   <label htmlFor="Activities" className="input-label">Activities and societies</label>

                                   <textarea
                                        onChange={(e) => setActivities(e.target.value)}
                                        value={activities}
                                        rows={3}
                                        name='Activities'
                                        id="Activities"
                                        placeholder='Enter Activities and societies Here....'
                                        className='input-field'
                                   />

                                   <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Activities is Required</span>

                              </div>

                              <div className='flex flex-col '>

                                   <label htmlFor="Description" className="input-label">Description</label>

                                   <textarea
                                        onChange={(e) => setDesctiption(e.target.value)}
                                        value={desctiption}
                                        rows={5}
                                        name='Description'
                                        id="Description"
                                        placeholder='Enter Description Here....'
                                        className='input-field'
                                   // className='bg-gray-50 text-sm rounded-xs px-4 text-[#222] py-4 border border-gray-200 focus:outline focus:outline-primary '
                                   />

                                   <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Description is Required</span>

                              </div>


                              <Button variant='contained' onClick={handleAddEducation}>College</Button>


                         </div>

                    )

               }

               <div className='flex justify-end items-center gap-2 px-6 py-3 bg-[#FAFAFA] ring-2 ring-gray-100 border-t border-t-gray-300'>

                    <Button variant='contained' color='error' disabled={isloading} >Cancel</Button>
                    <Button variant='contained' disabled={isloading} >Save</Button>

               </div>

          </div>

     );

}

export default EditProfilePopup;
