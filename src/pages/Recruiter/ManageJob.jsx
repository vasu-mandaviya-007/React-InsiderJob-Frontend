
import React, { useContext, useEffect, useState } from 'react';
import { manageJobsData } from '../../assets/assets';
import { Box, Button, IconButton, Popover, MenuItem } from '@mui/material';
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";


import {
     DataGrid,
     GridToolbarContainer, GridToolbarExport,
     GridToolbarColumnsButton,
     GridToolbarFilterButton,
     GridToolbarDensitySelector,
     GridToolbarQuickFilter 
} from "@mui/x-data-grid";
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import api_paths from "../../config/apis";



const ManageJob = () => {

     const {IsLoading, setIsLoading} = useContext(AppContext);

     const [jobs, setJobs] = useState([]);

     useEffect(() => {
          const fetchJobs = async () => {
               try {
                    setIsLoading(true);
                    const token = localStorage.getItem("JobPortalAuthToken");

                    if (!token) {
                         console.error("No token found");
                         return;
                    }

                    const response = await axios.get(api_paths.companyJobList, {
                         headers: {
                              "Content-Type": "application/json",
                              // "Authorization": `Bearer ${token}`,
                              "token": token
                         },
                    });

                    setJobs(response.data.jobsData); // Assuming the API returns job data
                    setIsLoading(false);
               } catch (error) {
                    console.error("Error fetching jobs:", error);
               }
          };

          fetchJobs();
     }, []);

     const [menuPosition, setMenuPosition] = useState(null);

     const handleClick = (event) => {
          setMenuPosition({
               mouseX: event.currentTarget.getBoundingClientRect().left,
               mouseY: event.currentTarget.getBoundingClientRect().bottom
          });
     };

     const handleClose = () => {
          setMenuPosition(null);
     };

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
               width: 70,
               headerClassName: "custom-header",
          },
          {
               field: "title",
               headerName: "jobTitle",
               // flex: 1,
               width : 250,
               cellClassName: "name-column--cell",
               headerClassName: "custom-header",
          },
          {
               field: "City",
               headerName: "Location",
               flex: 1,
               cellClassName: "name-column--cell",
               headerClassName: "custom-header",
          },
          {
               field: "Category",
               headerName: "Category",
               flex: 1,
               cellClassName: "name-column--cell",
               headerClassName: "custom-header",
          },
          {
               field: "date",
               headerName: "Date",
               width: 150,
               cellClassName: "date-box",
               headerClassName: "custom-header",
               renderCell: (params) => (
                    <span>{moment(params.row.date).format("ll")}</span>
               )
          },
          {
               field: "Action",
               headerName: "Action",
               headerAlign: "center",
               align: "center",
               cellClassName: "flex items-center  py-2",
               headerClassName: "custom-header",
               sortable: false,
               width: 130,
               filterable: false,
               disableColumnMenu: true,
               renderCell: (params) => (
                    <strong className='flex justify-center items-center gap-1'>
                         <button className='action-btn p-2 bg-green-200 hover:bg-green-300 focus:ring-2 focus:ring-green-300 focus:outline-1 focus:outline-green-400 rounded text-green-600'>
                              <IoEye />
                         </button>
                         <button className='action-btn p-2 bg-blue-200 hover:bg-blue-300 focus:ring-2 focus:ring-blue-300 focus:outline-1 focus:outline-blue-400 rounded text-blue-600'>
                              <FaPencilAlt />
                         </button>
                         <button className='action-btn p-2 bg-red-200 hover:bg-red-300 focus:ring-2 focus:ring-red-300 focus:outline-1 focus:outline-red-400 text-red-600 text-[14px] rounded'>
                              <MdDelete />
                         </button>
                    </strong>
               ),
          }
     ]

     return (

          <div className="container mx-auto p-4 w-full custom-scrollbar" >

               {/* <input type="search" value={Search} onChange={(e) => setSearch(e.target.value)} className='w-full py-2 px-6 border border-gray-200' placeholder='search here...' /> */}

               <button onClick={()=>console.log(jobs)}>Jobs Data</button>

               <h1 className='text-[20px] font-semibold mb-2'>Manage Jobs</h1>

               <div className='bg-white dark:bg-dark-table-bg shadow-lg rounded-lg'>
                    <Box
                         m={"0"}
                         p={"10px"}
                         sx={{
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
                                   paddingLeft : "10px" // CSS property for right alignment
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
                                   color : "var(--tw-bg)"
                              },
                              "& .MuiDataGrid-columnHeaderCheckbox": {
                                   backgroundColor: "#4B5563", // Change this color as needed
                              },
                         }}
                    >
                         <DataGrid
                              rows={jobs.map((job,index) =>({
                                   ...job,
                                   id : index+1
                              }))}
                              columns={columns}
                              // getRowId={(row) => row._id} 
                              paginationMode={"client"}
                              className='custom-scrollbar min-h-[500px]'
                              checkboxSelection
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
                              disableSelectionOnClick
                         // disableColumnSelector
                         />
                    </Box>

               </div>
          </div>
     );
}

export default ManageJob;
