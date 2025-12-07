import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { assets, viewApplicationsPageData, jobsApplied } from '../assets/assets';
import { AiOutlineDownload } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';



import { Box, colors, Button, Typography, useTheme } from '@mui/material';
import { Popover, MenuItem } from "@mui/material";
import moment from "moment";

import {
     DataGrid,
     GridToolbarContainer, GridToolbarExport,
     GridToolbarColumnsButton,
     GridToolbarFilterButton,
     GridToolbarDensitySelector,
     GridToolbarQuickFilter
} from "@mui/x-data-grid";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import api_paths from "../config/apis";

const Applications = () => {

     const { IsLoading, setIsLoading } = useContext(AppContext);

     const navigate = useNavigate();

     const { getToken } = useAuth();

     const [IsEdit, setIsEdit] = useState(false);
     const [Resume, setResume] = useState();

     const [allApplications, setallApplications] = useState([]);

     const fetchApplication = async () => {

          setIsLoading(true);

          const token = await getToken();

          const response = await axios.post(api_paths.getUserApplications,
               {},
               {
                    headers: {
                         Authorization: `Bearer ${token}`
                    }
               }
          )

          if (response.data.success) {
               setallApplications(response.data.applications);
               console.log(response.data.applications);
               setIsLoading(false);
          }

     }

     useEffect(() => {

          fetchApplication();

     }, [])

     const [menuPosition, setMenuPosition] = useState(null);

     const handleClick = (event) => {
          setMenuPosition({
               mouseX: event.currentTarget.getBoundingClientRect().left,
               mouseY: event.currentTarget.getBoundingClientRect().bottom
          });
     };

     const handleRowClick = (event) => {

          const jobId = event.row.JobId._id;
          navigate(`/apply-job/${jobId}`)

     }

     const handleClose = () => {
          setMenuPosition(null);
     };

     // function CustomToolbar() {
     //      return (
     //           <GridToolbarContainer className='flex justify-between relative items-center my-2'>
     //                {/* <GridToolbarExport /> */}
     //                <h1 className='text-xl font-semibold pl-5'>All Applications</h1>

     //                <div className='flex items-center px-4 gap-4 relative'>
     //                     <GridToolbarQuickFilter className='custome-search ' />

     //                     <button
     //                          onClick={handleClick}
     //                          className={`p-2.5 text-lg rounded-full hover:bg-blue-100 ${menuPosition !== null && "bg-blue-100 cursor-pointer"} `}
     //                     >
     //                          <BsThreeDotsVertical />
     //                     </button>

     //                     {/* Popover with exact positioning */}
     //                     <Popover
     //                          open={Boolean(menuPosition)}
     //                          onClose={handleClose}
     //                          anchorReference="anchorPosition"
     //                          anchorPosition={
     //                               menuPosition !== null
     //                                    ? { top: menuPosition.mouseY + 10, left: menuPosition.mouseX + 50 }
     //                                    : undefined
     //                          }
     //                          transformOrigin={{
     //                               vertical: "top",
     //                               horizontal: "right",
     //                          }}
     //                     >
     //                          <MenuItem style={{ width: "200px" }} className='menu-item' onClick={handleClose}>
     //                               <GridToolbarColumnsButton />
     //                          </MenuItem>
     //                          <MenuItem onClick={handleClose} className='menu-item'>
     //                               <GridToolbarFilterButton />
     //                          </MenuItem>
     //                          <MenuItem onClick={(e) => e.stopPropagation()} className='menu-item'>
     //                               <GridToolbarDensitySelector />
     //                          </MenuItem>
     //                          <MenuItem className='menu-item'>
     //                               <GridToolbarExport />
     //                          </MenuItem>
     //                     </Popover>

     //                </div>

     //           </GridToolbarContainer>
     //      );
     // }

     function CustomToolbar() {
          return (
               <GridToolbarContainer className='flex justify-between mb-2 relative items-center'>
                    {/* <GridToolbarExport /> */}
                    {/* <h1 className='text-xl font-semibold pl-5'>All Applications</h1> */}

                    <div className='flex items-center justify-between w-full px-0 gap-4 relative'>
                         <GridToolbarQuickFilter className='custome-search ' />

                         <button
                              onClick={handleClick}
                              className={`p-2.5 text-lg rounded-full hover:bg-blue-100 ${menuPosition !== null && "bg-blue-100 cursor-pointer"} `}
                         >
                              <BsThreeDotsVertical />
                         </button>

                         {/* Popover with exact positioning */}
                         <Popover
                              open={Boolean(menuPosition)}
                              onClose={handleClose}
                              anchorReference="anchorPosition"
                              anchorPosition={
                                   menuPosition !== null
                                        ? { top: menuPosition.mouseY + 10, left: menuPosition.mouseX + 50 }
                                        : undefined
                              }
                              transformOrigin={{
                                   vertical: "top",
                                   horizontal: "right",
                              }}
                         >
                              <MenuItem style={{ width: "200px" }} className='menu-item' onClick={handleClose}>
                                   <GridToolbarColumnsButton />
                              </MenuItem>
                              <MenuItem onClick={handleClose} className='menu-item'>
                                   <GridToolbarFilterButton />
                              </MenuItem>
                              <MenuItem onClick={(e) => e.stopPropagation()} className='menu-item'>
                                   <GridToolbarDensitySelector />
                              </MenuItem>
                              <MenuItem className='menu-item'>
                                   <GridToolbarExport />
                              </MenuItem>
                         </Popover>

                    </div>

               </GridToolbarContainer>
          );
     }

     const columns = [
          {
               field: "id",
               headerName: "ID",
               width: 90,
               align: "center",
               headerAlign: "center",
               headerClassName: "custom-header",
               // renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
          },
          {
               field: "companyName",
               headerName: "Company",
               headerClassName: "custom-header",
               cellClassName: "flex items-center",
               filterable: true,
               renderCell: (params) => {
                    return <div className='flex items-center gap-3'>
                         <img className='w-6 h-6' src={params.row.companyImg} alt="" />
                         <span>{params.row.companyName}</span>
                    </div>
               },
               width: 250
          },
          {
               field: "jobTitle",
               headerName: "Job Title",
               flex: 1,
               cellClassName: "name-column--cell",
               headerClassName: "custom-header",
               renderCell: (params) => { return params.row.jobTitle },
          },
          {
               field: "jobState",
               headerName: "Location",
               flex: 1,
               cellClassName: "name-column--cell",
               headerClassName: "custom-header",
               renderCell: (params) => { return params.row.jobState + ", " + params.row.jobCountry }
          },
          {
               field: "date",
               headerName: "Date",
               width: 150,
               cellClassName: "date-box",
               headerClassName: "custom-header",
               renderCell: (params) => (
                    <span>{`${moment(params.row.Date).fromNow(true)} ago`}</span>
               )
          },
          {
               field: "status",
               headerName: "Status",
               headerAlign: "center",
               align: "center",
               cellClassName: "flex items-center  py-2",
               headerClassName: "custom-header",
               sortable: false,
               width: 200,
               filterable: false,
               disableColumnMenu: true,
               renderCell: (params) => (
                    <div>
                         {
                              params.row.status === "accepted"
                                   ? <p className='flex items-center rounded-full px-10 bg-gradient-to-tr from-green-300 to-emerald-100 h-8'>Accepted</p>
                                   : params.row.status === "rejected"
                                        ? <p className='flex items-center rounded-full px-10  bg-gradient-to-tr from-rose-400 to-red-200 h-8'>Rejected</p>
                                        : <p className='flex items-center rounded-full px-10 bg-gradient-to-tr from-orange-300 to-yellow-100  h-8'>Pending</p>
                         }
                    </div>
               ),
          }
     ]

     return (

          <div className=' min-h-[65vh] px-20 py-10 bg-white 2xl:px-20 mx-auto'>

               <h2 className='text-xl font-semibold'>Your Resume</h2>

               <div className='flex gap-2 mb-6 mt-3'>
                    {
                         IsEdit
                              ? <>

                                   <label className='flex items-center' htmlFor="resumeUpload">
                                        <p className='cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 '>Select Resume</p>
                                        <input id='resumeUpload' onChange={(e) => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                                        <img className='cursor-pointer' src={assets.profile_upload_icon} alt="" />
                                   </label>
                                   <button className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>

                              </>
                              : <div className='flex flex-col w-full gap-2'>

                                   <div className='flex justify-between items-center shadow border border-neutral-200 rounded-sm px-4 py-4 bg-stone-50 w-full'>

                                        <div className='flex items-center justify-center gap-3'>

                                             <img className='w-9' src={assets.pdf_icon} alt="" />
                                             <div className='flex flex-col justify-center '>
                                                  <a href="./sample-corporate-resume.pdf" target='_blank'>
                                                       <p className='font-semibold'>Final Resume.pdf</p>
                                                  </a>
                                                  <span className='font-light text-gray-500 text-[14px]'>Uploaded on Jan 30, 2025</span>
                                             </div>

                                        </div>

                                        <div className='flex items-center gap-3'>
                                             <a href="./sample-corporate-resume.pdf" target='_blank'>
                                                  <button data-content="view" className='tool-trip bg-gray-100 rounded-full p-3 hover:bg-primary hover:text-white text-primary duration-200 '><SlSizeFullscreen /></button>
                                             </a>
                                             <a href="./sample-corporate-resume.pdf" download="resume.pdf" >
                                                  <button data-content="download" className='tool-trip bg-gray-100 rounded-full p-3 hover:bg-primary hover:text-white text-primary duration-200'><AiOutlineDownload /></button>
                                             </a>
                                             <button data-content="delete" className='tool-trip bg-gray-100 rounded-full p-3 hover:bg-primary hover:text-white text-primary duration-200'><RiDeleteBinLine /></button>
                                        </div>

                                   </div>

                                   <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 hover:bg-primary hover:text-white duration-200'>Edit</button>

                              </div>
                    }

               </div>

               <h2 className='text-2xl font-semibold mb-4'>Jobs Applied</h2>

               <div className='rounded-lg border-2 border-gray-300 overflow-hidden'>

                    {/* <table className=' w-full bg-white text-stone-600 '>

                         <thead>
                              <tr>
                                   <th className='py-4 px-8 border-b border-b-gray-300 text-left'>Company</th>
                                   <th className='py-4 px-4 border-b border-b-gray-300 text-left'>Job Title</th>
                                   <th className='py-4 px-4 border-b border-b-gray-300 text-left'>Location</th>
                                   <th className='py-4 px-4 border-b border-b-gray-300 text-left'>Date</th>
                                   <th className='py-4 px-4 border-b border-b-gray-300 text-left'>Status</th>
                              </tr>
                         </thead>

                         <tbody>
                              {
                                   jobsApplied.map((job, i) => {
                                        return true ? (
                                             <tr key={i}>
                                                  <td className='py-3 px-6 flex items-center gap-4 border-b border-b-gray-300 text-neutral-800'><img className='w-8 h-8' src={job.logo} alt="" />{job.company}</td>
                                                  <td className='py-2 px-4 border-b border-b-gray-300 '>{job.title}</td>
                                                  <td className='py-2 px-4 border-b border-b-gray-300 '>{job.location}</td>
                                                  <td className='py-2 px-4 border-b border-b-gray-300 '>{moment(job.date).format("ll")}</td>
                                                  <td className='py-2 px-4 border-b border-b-gray-300 '>
                                                       <span className={`px-4 py-1.5 block w-[80%] text-center rounded-full ${job.status === "Accepted" ? "bg-green-100" : job.status === "Rejected" ? "bg-red-100" : "bg-blue-100"}`} >{job.status}</span>
                                                  </td>
                                             </tr>
                                        ) : (null)
                                   })
                              }
                         </tbody>

                    </table> */}


                    {/* <input type="search" value={Search} onChange={(e) => setSearch(e.target.value)} className='w-full py-2 px-6 border border-gray-200' placeholder='search here...' /> */}

                    {/* <div className='bg-white shadow-lg'>

                         <Box
                              m={"0 0 0 0 "}
                              // minHeight={"560px"}
                              sx={{
                                   "& .custom-header": {
                                        backgroundColor: "#4B5563", // Gray-700
                                        color: "white",
                                        padding: "0 0 0 10px",
                                   },
                                   "& .date-box": {
                                        padding: "0 20px",
                                   },
                                   "& .MuiDataGrid-root": {
                                   },
                                   '& .MuiDataGrid-cell[data-field="id"]': { // Target cells of the 'amount' column
                                        textAlign: 'center', // CSS property for right alignment
                                   },
                                   '& .MuiDataGrid-columnHeader[data-field="id"]': { // Target header of 'amount'
                                        textAlign: 'center',
                                   },
                                   "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "#fff", // Custom background color (blue-800)
                                        fontSize: "14px",
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1000,
                                   },
                                   "& .MuiDataGrid-cell": {
                                        fontSize: "12px"
                                   },
                                   "& .MuiDataGrid-columnHeaderCheckbox": {
                                        backgroundColor: "#4B5563", // Change this color as needed
                                   },
                              }}
                         >
                              <DataGrid
                                   rows={allApplications}
                                   columns={columns}
                                   paginationMode={"client"}
                                   className='custom-scrollbar min-h-[500px]'
                                   disableRowSelectionOnClick
                                   slots={{
                                        toolbar: CustomToolbar,
                                   }}
                                   rowHeight={45}
                                   pageSizeOptions={[10, 25, 50, 100]}
                                   initialState={{
                                        pagination: {
                                             paginationModel: { pageSize: 10, page: 1 },
                                        }
                                   }}
                                   sx={{
                                        height: 620,
                                        // Remove focus/selection on cells
                                        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                                             outline: "none !important",
                                        },
                                        "& .MuiDataGrid-cell:active": {
                                             backgroundColor: "transparent !important",
                                        },

                                        // Remove focus/selection on column headers
                                        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
                                             outline: "none !important",
                                        },
                                        "& .MuiDataGrid-columnHeader:active": {
                                             backgroundColor: "none !important",
                                        },
                                   }}
                                   disableSelectionOnClick
                              // disableColumnSelector
                              />
                         </Box>

                    </div> */}


                    <div className='bg-white dark:bg-dark-table-bg shadow-lg rounded-lg'>
                         <Box
                              m={"0"}
                              p={"10px"}
                              sx={{
                                   "& .custom-id": {
                                        textAlign: "center",
                                   },
                                   "& .custom-header": {
                                        backgroundColor: "#4B5563", // Gray-700
                                        color: "white",
                                        padding: "0 0 0 10px",
                                   },
                                   "& .custom-header button": {
                                        color: "white",
                                   },
                                   "& .date-box": {
                                        padding: "0 20px",
                                   },
                                   "& .MuiDataGrid-root": {
                                        border: "none"
                                   },
                                   '& .MuiDataGrid-cell[data-field="id"]': { // Target cells of the 'amount' column
                                        paddingLeft: "10px" // CSS property for right alignment
                                   },
                                   "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "#fff", // Custom background color (blue-800)
                                        fontSize: "14px",
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1000,
                                   },
                                   "& .MuiDataGrid-cell": {
                                        fontSize: "12px",
                                        // color: "#4a5a6b"
                                        color: "var(--tw-bg)"
                                   },
                                   "& .MuiDataGrid-columnHeaderCheckbox": {
                                        backgroundColor: "#4B5563", // Change this color as needed
                                   },
                                   "& .MuiDataGrid-row:hover": {
                                        cursor: "pointer"
                                   }
                              }}
                         >
                              <DataGrid
                                   rows={
                                        allApplications.map((row, index) => ({ id: index + 1, ...row }))
                                   }
                                   columns={columns}
                                   // getRowId={(row) => row._id}
                                   paginationMode={"client"}
                                   className='custom-scrollbar min-h-[500px]'
                                   // checkboxSelection
                                   disableRowSelectionOnClick
                                   slots={{
                                        toolbar: CustomToolbar,
                                   }}
                                   rowHeight={47}
                                   columnHeaderHeight={48}
                                   pageSizeOptions={[10, 25, 50, 100]}
                                   initialState={{
                                        pagination: {
                                             paginationModel: { pageSize: 10, page: 1 },
                                        },
                                        sorting: {
                                             sortModel: [{ field: "id", sort: "asc" }], // Default sort by id
                                        }
                                   }}
                                   sx={{
                                        height: 620,
                                        // Remove focus/selection on cells
                                        "& .MuiDataGrid-columnSeparator": {
                                             display: "none",
                                        },
                                        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                                             outline: "none !important",
                                        },
                                        "& .MuiDataGrid-cell:active": {
                                             backgroundColor: "transparent !important",
                                        },

                                        // Remove focus/selection on column headers
                                        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
                                             outline: "none !important",
                                        },
                                        "& .MuiDataGrid-columnHeader:active": {
                                             backgroundColor: "none !important",
                                        },
                                   }}
                                   onRowClick={handleRowClick}
                              // disableSelectionOnClick
                              // disableColumnSelector
                              />
                         </Box>

                    </div>

               </div>

          </div>

     );

}

export default Applications;
