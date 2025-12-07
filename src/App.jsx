import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Recruiter/Navbar';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// import RecruiterLogin from './components/Auth/RecruiterLogin';
import RecruiterLogin from './components/Auth/RecruiterLogin';
import { AppContext } from './context/AppContext';
import RecruiterPage from './pages/Recruiter/RecruiterPage';
// import AddJob from './pages/Recruiter/AddJob';
import ManageJob from './pages/Recruiter/ManageJob';
import ViewApplications from './pages/Recruiter/ViewApplications';
import RecruiterHome from './components/Recruiter/RecruiterHome';
import Notification from './components/Recruiter/Notification';
import Setting from './components/Recruiter/Setting';
import Message from './components/Recruiter/Message'; 
import SmallLoader from './components/SmallLoader';
import Loader from './components/Loader/Loader';
import ProtectedRoute from './context/ProtectedRoutes';
import JobListing from './pages/JobListing';
import { Button } from '@mui/material';
import { FaAngleUp } from 'react-icons/fa6';
import AddJob from './pages/Recruiter/AddJob';
import Profile from './components/Profile';


AOS.init();

const App = () => {

     const { showRecruiterLogin, setshowRecruiterLogin, IsLoading, setIsLoading, Role, setRole } = useContext(AppContext);

     const [ScrollTop, setScrollTop] = useState(false);

     // useEffect(() => {

     //      setIsLoading(true);

     //      if (localStorage.getItem("JobPortalAuthToken")) {
     //           setRole("recruiter");
     //      }

     //      // setTimeout(() => {
     //           setIsLoading(false);
     //      // }, 2000);

     // }, [])

     useEffect(() => {

          const toggleScrollTop = () => {
               if (window.scrollY > 300) {
                    setScrollTop(true);
               } else {
                    setScrollTop(false);
               }
          }

          window.addEventListener("scroll", toggleScrollTop);
          return () => window.removeEventListener("scroll", toggleScrollTop);

     }, []);

     const ScrollToTop = () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }

     useEffect(() => {
          if (IsLoading) {
               document.body.style.overflow = "hidden"; // Disable scrolling
          } else {
               document.body.style.overflowY = "auto"; // Enable scrolling when loading is done
          }
     }, [IsLoading])

     return (

          <div>

               {/* <SmallLoader/> */}
               {IsLoading && <Loader />}


               <RecruiterLogin />

               <Routes>

                    <Route path="/recruiter" element={
                         <ProtectedRoute roles={['recruiter']} >
                              <RecruiterPage />
                         </ProtectedRoute>
                    } >
                         <Route path="" element={<RecruiterHome />} />
                         <Route path="add-job" element={<AddJob />} />
                         <Route path="manage-job" element={<ManageJob />} />
                         <Route path="view-applications" element={<ViewApplications />} />
                         <Route path="notification" element={<Notification />} />
                         <Route path="message" element={<Message />} />
                         <Route path="setting" element={<Setting />} />
                    </Route>

                    <Route path="/" element={
                         <ProtectedRoute roles={['user']} >
                              <Home />
                         </ProtectedRoute>
                    } >
                         <Route path="job-listing" element={<JobListing />} />
                         <Route path="apply-job/:id" element={<JobDetails />} />
                         <Route path="applications" element={<Applications />} />
                         <Route path="profile" element={<Profile />} />
                    </Route>

                    <Route path="*" element={
                         <div className='flex justify-center items-center flex-col min-h-[80vh]'>
                              <h1 className='text-[150px] text-blue-500'>404</h1>
                              <p className='font-bold'>PAGE NOT FOUND</p>
                         </div>
                    } />

               </Routes>

               {/* <Button variant="contained" onClick={ScrollToTop} className={`!fixed ${ScrollTop ? "!opacity-100 !pointer-events-auto !bottom-10" : "!opacity-0 !pointer-events-none !-bottom-10"} !duration-500 right-10 !p-0 !min-w-13 !min-h-13 !font-bold !text-xl `}>
                    <FaAngleUp />
               </Button> */}

               <button onClick={ScrollToTop} className={`!fixed bg-blue-500 ${ScrollTop ? "!pointer-events-auto !bottom-10" : "!pointer-events-none -bottom-20"} !duration-500 rounded-lg flex items-center justify-center text-white right-10 !p-0 !min-w-13 z-10 !min-h-13 !font-bold !text-xl `}>
                    <FaAngleUp />
               </button>

               {Role === "user" && <Footer />}

          </div>

     );

}

export default App;
