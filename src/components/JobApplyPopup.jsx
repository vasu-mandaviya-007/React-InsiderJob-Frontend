import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaCloudArrowUp, FaCross, FaXmark } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdClose, MdDelete, MdDownload } from 'react-icons/md';
import { assets } from '../assets/assets';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCheck } from 'react-icons/fa';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import api_paths from "../config/apis";

const JobApplyPopup = ({ showApplyBox, setshowApplyBox, companyId, JobId }) => {

     const { user } = useUser();
     const { getToken } = useAuth();

     const [resume, setresume] = useState(null);
     const [step, setStep] = useState(0);
     const [progress, setprogress] = useState(0);
     const [Dragging, setDragging] = useState(false);

     const [FileIcon, setFileIcon] = useState();
     const [UploadPregress, setUploadPregress] = useState(0);

     const [formData, setformData] = useState({
          fullname: "",
          email: "",
          message: ""
     });


     useEffect(() => {

          formData.fullname = "";
          formData.email = "";
          formData.message = "";
          setStep(0);
          setresume(null);
          setprogress(0);
          setFileIcon(fileIcons.default);

          if (user) {
               formData.fullname = user?.fullName || "";
               formData.email = user.emailAddresses[0].emailAddress || "";
          }
     }, [user, JobId])


     const handleBack = () => {
          setStep(0);
          setprogress(0);
     }

     const handleNext = () => {

          const fullname = document.getElementById("fullname");
          const email = document.getElementById("email");

          if (formData.fullname === "") {

               const span = fullname.parentElement.querySelector("span");

               if (span) {
                    if (fullname.value === "") {
                         span.classList.remove("hidden");
                         fullname.style.outline = "1px solid red";
                    } else {
                         span.classList.add("hidden");
                         fullname.style.outline = "";
                    }
               }

          } else if (formData.email == "") {

               const span = email.parentElement.querySelector("span");

               if (span) {
                    if (email.value === "") {
                         span.classList.remove("hidden");
                         email.style.outline = "1px solid red";
                    } else {
                         span.classList.add("hidden");
                         email.style.outline = "";
                    }
               }

          } else {
               setStep(1)
               setprogress(50);
          }


     }

     const handleSendApplication = async () => {

          if (resume !== null) {

               console.log("JobId : ", JobId);
               console.log("companyId : ", companyId);

               const data = new FormData(); 
               data.append("fullname", formData.fullname);
               data.append("email", formData.email);
               data.append("message", formData.message);
               data.append("image", resume);
               data.append("companyId", companyId);
               data.append("jobId", JobId);

               const token = await getToken();

               const response = await axios.post(api_paths.JobApplyUrl,
                    data,
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "multipart/form-data",
                         }
                    }
               );

               if (response.data.success) {
                    toast.success("Applied Successfully")
               }
               else {
                    toast.error(response.data?.message || "Job Applied Failed");
                    console.log(response.data);
               }

               // const imgSrc = `data:${result.image.mimetype};base64,${result.image.data}`;
               // console.log(imgSrc);

               // console.log("FormData : ", formData);
               // console.log("Resume : ", resume);

          } else {

               const resume_error = document.getElementsByClassName("resume-error")[0];
               resume_error.style.height = "60px";

          }

     }


     const fileIcons = {
          "image": assets.image_icon, // You can replace with image URLs
          "pdf": assets.pdf_icon,
          "doc": assets.doc_Icon,
          "xls": "📊",
          "zip": "🗂️",
          "default": "📁"
     };

     const getFileType = (filename) => {

          const ext = filename.split(".").pop().toLowerCase();
          if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
          if (["pdf"].includes(ext)) return "pdf";
          if (["doc", "docx"].includes(ext)) return "doc";
          if (["xls", "xlsx"].includes(ext)) return "xls";
          if (["zip", "rar"].includes(ext)) return "zip";
          return "default";

     }

     const handleDragOver = (e) => {
          e.preventDefault();
          e.currentTarget.classList.replace("bg-blue-50", "bg-blue-100");
          setDragging(true);
     };

     const handleDragLeave = (e) => {
          e.currentTarget.classList.replace("bg-blue-100", "bg-blue-50");
          setDragging(false);
     };

     const handleSetFile = (selectedFile) => {

          const resume_error = document.getElementsByClassName("resume-error")[0];
          resume_error.style.height = "0px";

          setresume(selectedFile);

          const fileType = getFileType(selectedFile.name);
          setFileIcon(fileIcons[fileType] || fileIcons.default);

          let progressValue = 0;

          const progressInterval = setInterval(() => {
               progressValue += Math.ceil(Math.random() * 20);
               if (progressValue >= 100) {
                    clearInterval(progressInterval);
                    setUploadPregress(100); // Ensure it stops exactly at 100
               } else {
                    setUploadPregress(progressValue);
               }
          }, 300);

     }

     const handleDrop = (e) => {

          e.preventDefault();

          const droppedFile = e.dataTransfer.files[0]; // Get the first file

          if (droppedFile) {
               handleSetFile(droppedFile);
          }

     };


     const handleFileChange = (e) => {

          const selectedFile = e.target.files[0];

          if (selectedFile) {

               handleSetFile(selectedFile);

          }
     };


     const handleChange = (e) => {

          setformData({ ...formData, [e.target.name]: e.target.value })

          const span = e.target.parentElement.querySelector("span");

          if (span) {
               if (e.target.value === "") {
                    span.classList.remove("hidden");
                    e.target.style.outline = "1px solid red";
               } else {
                    span.classList.add("hidden");
                    e.target.style.outline = "";
               }
          }

     }

     const handleDeleteFile = () => {

          setresume(null);
          setUploadPregress(0)
          setFileIcon(fileIcons.default);

     }

     return (

          <div className={`absolute z-10 top-12 left-1/2 -translate-x-1/2  w-[600px] overflow-auto rounded duration-500 ${showApplyBox ? "translate-y-0 pointer-events-auto opacity-100" : "-translate-y-[100px] pointer-events-none opacity-0"} `}>

               <div className='flex justify-between items-center px-6 py-4 bg-[#FAFAFA] border-b border-b-gray-300'>

                    <h2 className='text-xl font-semibold'>Apply For This Job </h2>
                    <IoMdClose onClick={() => setshowApplyBox(false)} className='bg-black text-white h-10 w-10 text-lg p-2 rounded hover:bg-primary cursor-pointer duration-300' />

               </div>

               <div className='w-full flex items-center px-4 pt-4 bg-white gap-3'>

                    <div className='bg-gray-200 h-3 w-full rounded-full p-0.5 overflow-hidden'>
                         <div style={{ width: `${progress}%` }} className={`bg-blue-500 h-full rounded-full duration-500 `} ></div>
                    </div>
                    <span>{progress}%</span>

               </div>

               <div className="relative transition-all bg-transparent overflow-hidden">

                    <div className={` bg-white p-8 w-full duration-600 ${step == 1 ? "-translate-y-full" : "translate-y-0"} `}>

                         <div className='flex flex-col'>

                              <label htmlFor="fullname" className="text-gray-700 text-sm mb-1.5 w-fit">Full Name</label>

                              <input
                                   type="text"
                                   onChange={(e) => handleChange(e)}
                                   value={formData.fullname}
                                   name='fullname'
                                   id="fullname"
                                   placeholder='Enter Your Full Name'
                                   className='bg-gray-50 text-sm rounded-xs px-4 text-[#222] py-4 border border-gray-200 focus:outline focus:outline-primary '
                              />

                              <span className='hidden text-sm text-red-500 ml-1 mt-0.5 '>Name is Required</span>

                         </div>

                         <div className='mt-5 flex flex-col'>

                              <label htmlFor="email" className="text-gray-700 text-sm mb-1.5 w-fit">Email Address</label>

                              <input
                                   type="text"
                                   onChange={(e) => handleChange(e)}
                                   value={formData.email}
                                   name='email'
                                   id="email"
                                   placeholder='Enter E-mail Address'
                                   className='bg-gray-50 text-sm rounded-xs px-4 py-4 border border-gray-200 focus:outline focus:outline-primary '
                              />

                              <span className='hidden text-sm text-red-500 ml-1 mt-0.5'>Email is Required</span>

                         </div>

                         <div className='mt-5 flex flex-col'>

                              <label htmlFor="message" className="text-gray-700 text-sm mb-1.5 w-fit">Message</label>

                              <textarea
                                   onChange={(e) => handleChange(e)}
                                   value={formData.message}
                                   rows={7}
                                   placeholder='Message To the Employeer...'
                                   name="message"
                                   id="message"
                                   className='bg-gray-50 text-sm rounded-xs px-4 py-4 border border-gray-200 focus:outline focus:outline-primary '
                              />

                         </div>

                         <div className='flex items-center justify-end my-4 mt-8 gap-2'>

                              <Button onClick={handleNext} variant='contained' endIcon={<FaArrowAltCircleRight />} className='w-30'>Next</Button>

                         </div>

                    </div>

                    <div className={`absolute bg-white w-full duration-600 p-8 top-0 left-0 ${step == 1 ? "translate-y-0" : "-translate-y-full"} `}>

                         <div className='mt-1'>

                              <div className='relative flex items-center justify-center mb-8'>
                                   <Button variant="contained" onClick={handleBack} className='!absolute left-0 !text-xl !px-5'>{<FaArrowAltCircleLeft />}</Button>
                                   <h2 className='text-lg font-semibold'>Upload Resume</h2>
                              </div>

                              <div className='resume-error h-0 flex items-center justify-between duration-300 text-red-500 bg-red-200 w-full overflow-hidden  px-4 '>
                                   Resume is required
                                   <MdClose className='text-xl cursor-pointer' onClick={(e) => e.currentTarget.parentElement.style.height = "0px"} />
                              </div>

                              <div
                                   onDrop={handleDrop}
                                   onDragOver={handleDragOver}
                                   onDragLeave={handleDragLeave}
                                   className='mt-1 flex flex-col items-center justify-center p-10 border-3 border-dotted border-blue-300 bg-blue-50 rounded-lg '>
                                   {/* <img src={cloudimg} alt="" /> */}
                                   <FaCloudArrowUp className='text-8xl text-gray-300' />
                                   <div className=' flex flex-col items-center justify-center'>
                                        <p className='font-semibold'>Drag And Drop or <label htmlFor="resume" className="text-primary font-semibold cursor-pointer underline ml-1">Browse</label> </p>
                                        <p className='text-black/40 text-sm'>Supported Formate : PDF,DOCX,DOC MaxSize: 50MB</p>
                                        <input type="file" accept='.pdf,image,.docx' onChange={handleFileChange} className='hidden' id='resume' />
                                   </div>
                              </div>

                              {resume !== null &&
                                   <div className='relative flex my-2 bg-gray-100 items-center justify-between shadow overflow-hidden px-3 py-2.5 w-full'>
                                        <div className='flex items-center w-full gap-3'>
                                             <img src={FileIcon} className='h-10' alt="" />
                                             {/* <span>{FileIcon}</span> */}
                                             <div className='flex flex-col w-full'>
                                                  <p className='text-sm font-medium text-gray-800 w-[80%] overflow-hidden text-ellipsis whitespace-nowrap '>{resume.name}</p>
                                                  <div className={`flex ${UploadPregress == 100 ? "h-0 delay-500 opacity-0" : "h-4 opacity-100"} duration-500 overflow-hidden items-center gap-2 `}>
                                                       <div className='w-[90%] bg-gray-200 h-1.5 p-[1px] rounded-full'>
                                                            <p style={{ width: `${UploadPregress}%` }} className='bg-primary h-full duration-500 rounded-full'></p>
                                                       </div>
                                                       <span className="text-xs" >{UploadPregress !== 100 ? <FaXmark className='text-rose-500 text-xl cursor-pointer' /> : <FaCheck className='text-base text-green-500' />}</span>
                                                  </div>
                                                  <span className='text-xxs text-gray-500'>
                                                       {
                                                            UploadPregress !== 100
                                                                 ? UploadPregress + "% done"
                                                                 : ((resume.size / 1024) / 1024).toFixed(2) >= 1 ? ((resume.size / 1024) / 1024).toFixed(2) + " MB" : (resume.size / 1024).toFixed(2) + " KB"
                                                       }
                                                  </span>
                                             </div>
                                        </div>

                                        <div style={{ width: `${UploadPregress}%` }} className={`absolute h-full ${UploadPregress < 100 && UploadPregress > 0 ? "opacity-50 z-10" : "opacity-0 z-0"} top-0 left-0 bg-green-300 duration-700 `}>

                                        </div>

                                        {/* {resume.name.split(".").pop() === "txt" ? "text" : "non text"} */}
                                        <div className={`absolute ${UploadPregress == 100 ? "delay-500 right-4" : "-right-full"} duration-500 flex items-center gap-2`}>
                                             <a href={URL.createObjectURL(resume)} download={resume.name}>
                                                  <MdDownload className="text-4xl rounded-full text-gray-700 bg-gray-200 p-2 cursor-pointer" />
                                             </a>
                                             <MdDelete onClick={handleDeleteFile} className="text-2xl text-rose-500 cursor-pointer" />
                                        </div>
                                        {/* <IoMdClose onClick={() => setresume("")} className="text-xl cursor-pointer" /> */}
                                   </div>
                              }

                              {/* {resume !== "" &&
                                   <div className='flex my-2 bg-blue-100 items-center gap-2 border border-gray-300 px-4 py-2 w-fit'>
                                        {resume.name}
                                        {resume.name.split(".").pop() === "txt" ? "text" : "non text"}
                                        <IoMdClose onClick={() => setresume("")} className="text-xl cursor-pointer" />
                                   </div>
                              }
                              <div className="flex items-center gap-2">
                                   <label htmlFor="resume" className="mt-1.5 flex items-center gap-2 bg-dark-primary hover:bg-primary cursor-pointer duration-300 rounded w-fit text-nowrap px-4 py-2.5 text-white"><FaDownload />Upload Resume</label>
                                   <input type="file" onChange={(e) => setresume(e.target.files[0])} className='hidden' id='resume' />
                                   <p className="text-sm text-gray-400">
                                        Upload your CV/resume or any other relevant file. Max. file size: 50 MB.
                                   </p>
                              </div> */}
                         </div>

                         <Button onClick={handleSendApplication} variant='contained' className="w-full h-12 !mt-8 !mb-4">Send Application</Button>

                    </div>

               </div>

          </div>

     );

}

export default JobApplyPopup;
