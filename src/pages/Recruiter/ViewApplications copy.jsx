import React, { useRef, useEffect, useState } from 'react';
import { assets, viewApplicationsPageData } from '../../assets/assets';
import DataTable from "react-data-table-component";

import MUIDataTable from "mui-datatables";


const columns1 = [
     {
          name: "image",
          label: "Profile Picture",
          options: {
               customBodyRender: (value) => (
                    <img src={value} alt="Profile" style={{ width: 50, height: 50, borderRadius: "50%" }} />
               ),
          },
     },
     {
          name: "name",
          label: "Name",
     },
     {
          name: "jobTitle",
          label: "JobTitle",
     },
     {
          name: "location",
          label: "Location",
     }
];

const data = [
     ["John Doe", 28, "New York"],
     ["Jane Smith", 22, "Los Angeles"],
     ["Alice Brown", 35, "Chicago"]
];

const options = {
     filterType: "dropdown",
     responsive: "standard",
     rowsPerPage: 10,
     selectableRows: "multiple",
     elevation: 4,  // Shadow around the table
     onRowsDelete: (rowsDeleted) => console.log(rowsDeleted),
     customToolbar: () => <div>Custom Toolbar</div>,
};

const ViewApplications = () => {

     const [Search, setSearch] = useState("");

     const filteredData = Search
          ? viewApplicationsPageData.filter((row) =>
               row.name.replace(/\s/g, "").toLowerCase().includes(Search.replace(/\s/g, "").toLowerCase()),
               viewApplicationsPageData.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle))
          )
          : viewApplicationsPageData;

     const columns = [
          {
               name: "#",
               selector: row => row._id,
               sortable: true,
               width: "70px",
          },
          {
               name: "UserName",
               selector: row => <div className='flex items-center gap-3'>
                    <img className='w-8 h-8' src={row.imgSrc} alt="" />
                    {row.name},
               </div>,
               sortable: true,
               width: "250px"
          },
          {
               name: "Job Title",
               selector: row => row.jobTitle,
               sortable: true,

          },
          {
               name: "Location",
               selector: row => row.location,
               sortable: true,

          },
          {
               name: "Resume",
               selector: row => <a className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center' href="" target='_blank'>
                    Resume <img src={assets.resume_download_icon} alt="" />
               </a>,
               sortable: true,

          },
          {
               name: "Action",
               selector: row => <button>Hello</button>,
               sortable: true,

          },
     ]



     return (
          <div className="container mx-auto p-4" >

               {/* <input type="search" value={Search} onChange={(e) => setSearch(e.target.value)} className='w-full py-2 px-6 border border-gray-200' placeholder='search here...' /> */}
               <div className='w-full overflow-x-scroll'>

                    <table className="w-full bg-white border border-gray-200 table-auto text-sm max-sm:text-sm" >

                         <thead className='text-base'>
                              <tr className='text-nowrap'>
                                   <th className='py-4 px-4 text-left' >#</th>
                                   <th className='py-4 px-4 text-left' >User Name</th>
                                   <th className='py-4 px-4 text-left' >Job Title</th>
                                   <th className='py-4 px-4 text-left' >Location</th>
                                   <th className='py-4 px-4 text-left' >Resume</th>
                                   <th className='py-4 px-4 text-left' >Action</th>
                              </tr>
                         </thead>

                         <tbody className='px-4'>
                              {filteredData.sort().map((application, index) => (
                                   <tr key={index} className='text-gray-700 border-b border-b-gray-300 hover:bg-gray-100 text-nowrap px-5'>
                                        <td className='py-2 px-4  text-left '>{index + 1}</td>
                                        <td className='py-2 px-1text-center  flex items-center gap-3'>
                                             <img className='w-8 h-8 rounded-full' src={application.imgSrc} alt="" />
                                             <span>{application.name}</span>
                                        </td>
                                        <td className='py-2 px-4 '>{application.jobTitle}</td>
                                        <td className='py-2 px-4 '>{application.location}</td>
                                        <td className='py-2 px-4 '>
                                             <a className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center' href="" target='_blank'>
                                                  Resume <img src={assets.resume_download_icon} alt="" />
                                             </a>
                                        </td>
                                        <td className=' text-left '>
                                             <button className='px-4 py-1.5  bg-green-300 rounded font-semibold text-green-800 mr-1.5'>Accept</button>
                                             <button className='px-4 py-1.5  bg-red-300 rounded font-semibold text-red-800'>Reject</button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>

                    <div className='overflow-auto'>
                         <DataTable
                              columns={columns}
                              data={viewApplicationsPageData}
                              selectableRows
                              pagination
                              highlightOnHover
                              pointerOnHover
                              clearSelectedRows
                         >
                         </DataTable>
                    </div>

                    <MUIDataTable
                         title={"User List"}
                         data={viewApplicationsPageData}
                         columns={columns1}
                         options={options}
                    // sx={{
                    //      "& .MuiTableCell-head": {
                    //           backgroundColor: "#3f51b5", // Blue background for header
                    //           color: "white", // White text color
                    //           fontWeight: "bold", // Bold text
                    //      },
                    //      "& .MuiTableCell-body": {
                    //           backgroundColor: "#f4f6f8", // Light grey background for rows
                    //           fontSize: "14px", // Adjust font size for cells
                    //      },
                    //      "& .MuiTableRow-hover:hover": {
                    //           backgroundColor: "red", // Hover effect for rows
                    //      },
                    // }}
                    />



               </div>
          </div>
     );
}

export default ViewApplications;

