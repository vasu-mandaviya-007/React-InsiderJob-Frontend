// import dotenv from "dotenv"
// dotenv.config();

const backendPath = import.meta.env.VITE_BACKEND_URL;  

const api_paths = {

     UserData : `${backendPath}/api/users/userData`,
     getUserApplications : `${backendPath}/api/users/getUserJobApplication`,
     
     GetAllJobs : `${backendPath}/api/job/get-all-jobs`,
     JobApplyUrl : `${backendPath}/api/users/send-job-application`,
     
     CompanyData : `${backendPath}/api/company/companyData`,
     companyRegister : `${backendPath}/api/company/register`,
     companyLogin : `${backendPath}/api/company/login`,
     postNewJob : `${backendPath}/api/company/post-job`,
     companyJobList : `${backendPath}/api/company/list-jobs`,


}

export default api_paths;
