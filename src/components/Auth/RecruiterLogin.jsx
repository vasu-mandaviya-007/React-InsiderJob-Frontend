import React, { useContext, useEffect, useRef, useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { validate, ValidateEmail, ValidatePass, ValidateUsername } from './ValidateData';
// import {RotatingLines} from "react-loader-spinner"
import { TbLoader } from "react-icons/tb";

import Input from "../UI/Input";
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import Swal from 'sweetalert2';
import api_paths from '../../config/apis';
import { assets } from '../../assets/assets';
import { IoMdClose, IoMdLogIn, IoMdSend } from "react-icons/io";
import { Button } from '@mui/material';


const RecruiterLogin = () => {

     const {showRecruiterLogin, setshowRecruiterLogin, Role, setRole, } = useContext(AppContext);
     const [isLoading, setIsLoading] = useState(false)

     const navigator = useNavigate();
     const [currState, setcurrState] = useState("Sign Up");

     const username = useRef(null);
     const email = useRef(null);
     const password = useRef(null);
     const errorbox = useRef([]);
     const labels = useRef([]);

     const [passVisible, setpassVisible] = useState(false);
     const [formData, setformData] = useState({
          username: "",
          email: "",
          password: ""
     });

     const [IsFormFilled, setIsFormFilled] = useState(false);
     const [Image, setImage] = useState();

     // useEffect(() => {

     //      document.body.style.overflowY = "hidden";
     //      return () => {
     //           document.body.style.overflowY = "unset";
     //      }

     // }, []);

     const handleChange = (e) => {
          setformData({ ...formData, [e.target.name]: e.target.value });
     }

     const handleSubmit = async () => {

          try {

               // let { username, email, password } = formData;
               setIsLoading(true) 

               const Data = new FormData();
               Data.append('image', Image);

               // Append state data
               Object.entries(formData).forEach(([key, value]) => {
                    Data.append(key, value);
               });

               let response = await fetch(api_paths.companyRegister, {
                    method: "POST",
                    headers: {
                         // Accept: 'application/data',
                         // 'Content-Type': 'application/json',
                    },
                    body: Data,
               })

               let result = await response.json();

               setIsLoading(false);

               if (result?.success) {
                    // navigator("/chat");
                    console.log("Response", result)
                    toast.success(result.message);

                    window.localStorage.setItem("JobPortalAuthToken", result.token);

                    setshowRecruiterLogin(false);
                    navigator("/dashbord");
                    setRole("recruiter");

               }
               else {
                    console.log("Result Error : ", result);
                    toast.error(result?.message);
               }

          } catch (error) {
               // setLoading(false);
               console.log("Login Page Error : ", error);
               toast.error("Sign Up Failed");
          }

     }

     const handleNext = async () => {

          if (currState === "Sign Up") {

               const Errors = [errorbox.current[0], errorbox.current[1], errorbox.current[2]];
               const Labels = [labels.current[0], labels.current[1], labels.current[2]];

               if (!validate([username.current, email.current, password.current], Errors, Labels)) {

                    setIsFormFilled(true);

               }

          }
          else {

               const Errors = [errorbox.current[1], errorbox.current[2]];
               const Labels = [labels.current[1], labels.current[2]];

               if (!validate([email.current, password.current], Errors, Labels)) {

                    // setLoading(true);

                    try {

                         let { email, password } = formData;

                         let response = await fetch(api_paths.companyLogin, {
                              method: "POST",
                              headers: {
                                   Accept: 'application/json',
                                   'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ email: email, password: password }),
                         })

                         let result = await response.json();

                         // setLoading(false);

                         if (result.success) {

                              console.log(result.token);
                              window.localStorage.setItem("JobPortalAuthToken", result.token);


                              await Swal.fire({
                                   title: "Login Successful",
                                   text: "Redirection to home page...",
                                   icon: "success",
                                   timer: 3000,
                                   limit: 1,
                                   timerProgressBar: true,
                              })

                              window.location.replace("/recruiter");
                              // navigator("/dashbord/home");

                         }
                         else {

                              console.log("Not Success : ", result.error);
                              console.log("Not Success : ", result.message);
                              toast.error(result.error);

                         }

                    } catch (error) {
                         // setLoading(false);
                         console.log("Error: " + error);
                         toast.error("Sign Up Failed");
                    }

                    // setLoading(false);

               }

          }

     }

     const handleNext2 = () => {
          setRole("recruiter");
          navigator("/dashbord")
     }

     return (

          <div className={` ${showRecruiterLogin ? "z-20 opacity-100" : "-z-10 opacity-0"} duration-500 fixed bg-stone-900/30 backdrop-blur-xs  auth-container`}>

               {/* <div className='fixed  w-full h-full top-0 leading-0'></div> */}

               <div className={`${showRecruiterLogin ? "translate-y-0 z-20 opacity-100" : "-translate-y-[100px] -z-10 opacity-0"} duration-500 `}>
                    {
                         IsFormFilled
                              ?
                              <div className='form-container relative'>

                                   <div onClick={() => setshowRecruiterLogin(false)} className='absolute text-xl top-0 right-0 p-2 hover:text-white rounded-tr-md duration-200 hover:bg-red-500 bg-gray-200 cursor-pointer '>
                                        <IoMdClose />
                                   </div>

                                   <h1>Profile Upload</h1>

                                   <div className='flex items-center justify-center mb-5'>
                                        <label className='cursor-pointer max-h-[250px] overflow-scroll' htmlFor="image">
                                             <img className='w-[200px] overflow-scroll' src={Image ? URL.createObjectURL(Image) : assets.upload_area} alt="" />
                                             <input accept='.jpg, .jpeg, .png,.avif' onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                                        </label>
                                   </div>

                                   <Button variant='contained' size='large' className='py-3!' disabled={isLoading} endIcon={isLoading ? <TbLoader className='text-gray-400 animate-spin'/> : <IoMdLogIn/>} onClick={handleSubmit}>
                                        {currState} 
                                   </Button>

                              </div>
                              :
                              <div className="form-container relative">

                                   <h1>Recruiter {currState}</h1>

                                   <div onClick={() => setshowRecruiterLogin(false)} className='absolute text-xl top-0 right-0 p-2 hover:text-white rounded-tr-md duration-200 hover:bg-red-500 bg-gray-200 cursor-pointer '>
                                        <IoMdClose />
                                   </div>

                                   {
                                        currState === "Sign Up"
                                             ?
                                             <div className="input-box">

                                                  <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>
                                                  <Input
                                                       type="text"
                                                       value={formData.username}
                                                       name="username"
                                                       placeholder={""}
                                                       inputRef={username}
                                                       onKeyUp={() => ValidateUsername(username.current, errorbox.current[0], labels.current[0])}
                                                       onChange={handleChange}
                                                       spellCheck={false}
                                                  />

                                                  <label ref={(e) => (labels.current[0] = e)} htmlFor="username" className='floating-label'>Enter Username</label>

                                                  <div ref={(e) => (errorbox.current[0] = e)} className="error username-error"> <i className="material-icons">info_outline</i> invalid username </div>

                                             </div>
                                             :
                                             <></>
                                   }

                                   <div className="input-box">

                                        <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                                        <Input
                                             type="email"
                                             value={formData.email}
                                             name="email"
                                             placeholder={""}
                                             inputRef={email}
                                             onKeyUp={() => ValidateEmail(email.current, errorbox.current[1], labels.current[1])}
                                             onChange={handleChange}
                                             spellCheck={false}
                                        />

                                        <label ref={(e) => (labels.current[1] = e)} htmlFor="email" className='floating-label'>Enter Email</label>

                                        <div ref={(e) => (errorbox.current[1] = e)} className="error email-error"> <i className="material-icons">info_outline</i> </div>

                                   </div>

                                   <div className="input-box"> 

                                        <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                                        <Input
                                             type={passVisible ? "text" : "password"}
                                             value={formData.password}
                                             name="password"
                                             placeholder={""}
                                             inputRef={password}
                                             onKeyUp={() => ValidatePass(password.current, errorbox.current[2], labels.current[2])}
                                             onChange={handleChange}
                                        />

                                        <label ref={(e) => (labels.current[2] = e)} htmlFor="password" className='floating-label'>Enter password</label>

                                        <i className={`fa-regular fa-eye${passVisible ? "" : "-slash"} eye-icon`} onClick={() => setpassVisible(!passVisible)}></i>

                                        <div ref={(e) => (errorbox.current[2] = e)} className="error pass-error"><i className="material-icons">info_outline</i> invalid password</div>

                                   </div>

                                   <Button variant='contained' size='large' className='py-3!' disabled={isLoading} endIcon={isLoading ? <TbLoader className='text-gray-400 animate-spin'/> : <IoMdLogIn/>} onClick={handleNext}>
                                        {currState} 
                                   </Button>

                                   <div className="form-link">

                                        {
                                             currState === "Sign Up"
                                                  ? <p>already have an account ? <span onClick={() => setcurrState("Login")} >Login</span> </p>
                                                  : <p>Do not have an account ? <span onClick={() => setcurrState("Sign Up")} >Create Account</span> </p>
                                        }

                                   </div>

                                   <div className="line"></div>

                                   <div className="media-options">

                                        <div href="/" className="field google">

                                             <img src={assets.google_logo} alt="" className="google-img" />
                                             <span>Google</span>

                                        </div>

                                        <div href="/" className="field facebook">

                                             <i className='fa-brands fa-facebook facebook-icon'></i>
                                             <span>Facebook</span>

                                        </div>

                                   </div>

                              </div>
                    }
               </div>

          </div>

     );

}

export default RecruiterLogin;

