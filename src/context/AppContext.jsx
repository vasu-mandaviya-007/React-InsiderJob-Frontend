import { useEffect, useState } from "react";
import { createContext } from "react";
import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react"
import api_paths from "../config/apis";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

     const { getToken } = useAuth();

     const [userData, setuserData] = useState("");
     const [DarkMode, setDarkMode] = useState(false);
     const [IsLoading, setIsLoading] = useState(false);
     const [searchFilter, setsearchFilter] = useState({
          title: "",
          location: ""
     });
     const [showRecruiterLogin, setshowRecruiterLogin] = useState(false);
     const [Role, setRole] = useState("");
     const [IsSearched, setIsSearched] = useState(false);
     const [Jobs, setJobs] = useState([]);


     // States for Recruiter Side
     const [companyData, setcompanyData] = useState("");


     const FetchJobsData = async () => {

          // setJobs(jobsData);

          fetch(api_paths.GetAllJobs, {
               method: "POST"
          })
               .then((res) => res.json())
               .then((data) => setJobs(data.jobs))

          if (localStorage.getItem("JobPortalAuthToken")) {
               setRole("recruiter");
          } else {
               setRole("user");
          }

     }

     const FetchUserData = async () => {

          try {

               const token = await getToken();

               if (token) {

                    const response = await axios.post(
                         api_paths.UserData,
                         { data: "example data" },
                         {
                              headers: {
                                   Authorization: `Bearer ${token}`
                              }
                         }
                    )

                    if (response.data.success) {

                         setuserData(response.data.userData)

                    }
               }


          } catch (err) {

               console.error(err);
               toast.error("Error")

          }

     };

     const FetchCompanyData = async () => {

          const token = localStorage.getItem("JobPortalAuthToken");

          try {
               if (token) {

                    const response = await axios.post(
                         api_paths.CompanyData,
                         {},
                         {
                              headers: {
                                   'Content-Type': 'application/json',
                                   "token": token
                              }
                         }
                    )

                    if (response.data.success) {

                         setcompanyData(response.data.company);
                         
                    }
               }
          } catch (e) {

               console.log(e);

          } finally {

               setTimeout(() => {
                    setIsLoading(false);
               }, 1000);

          }



     }

     useEffect(() => {

          setIsLoading(true);

          if (localStorage.getItem("JobPortalAuthToken")) {
               setRole("recruiter");
          } else {
               setRole("user");
          }

          if (Role === "user") {

               FetchJobsData();

               FetchUserData();

               setTimeout(() => {
                    setIsLoading(false);
               }, 1000);

          }

          if (Role === "recruiter") {
               FetchCompanyData();
          }


     }, [Role])


     const value = {
          searchFilter, setsearchFilter,
          IsSearched, setIsSearched,
          Jobs, setJobs,
          showRecruiterLogin, setshowRecruiterLogin,
          Role, setRole,
          DarkMode, setDarkMode,
          IsLoading, setIsLoading,
          userData, setuserData,
          companyData, setcompanyData
     }

     return (<AppContext.Provider value={value}>
          {props.children}
     </AppContext.Provider>)

}


