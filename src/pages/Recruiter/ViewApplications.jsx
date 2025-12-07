
import React, { useRef, useEffect, useState } from 'react';
import { assets, viewApplicationsPageData } from '../../assets/assets';
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


const ViewApplications = () => {

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
               <GridToolbarContainer className='flex justify-between relative items-center my-2'>
                    {/* <GridToolbarExport /> */}
                    <h1 className='text-xl font-semibold pl-5'>All Applications</h1>

                    <div className='flex items-center px-4 gap-4 relative'>
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
               field: "name",
               headerName: "Name",
               headerClassName: "custom-header",
               cellClassName: "flex items-center",
               renderCell: (params) => {
                    return <div className='flex items-center gap-3'>
                         <img className='w-6 h-6' src={params.row.imgSrc} alt="" />
                         <span>{params.row.name}</span>
                    </div>
               },
               width: 300
          },
          {
               field: "jobTitle",
               headerName: "jobTitle",
               flex: 1,
               cellClassName: "name-column--cell",
               headerClassName: "custom-header",
          },
          {
               field: "location",
               headerName: "Location",
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
                    <span>{moment.unix(params.row.date).fromNow()}</span>
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
               width: 200,
               filterable: false,
               disableColumnMenu: true,
               renderCell: (params) => (
                    <strong className='flex justify-center items-center gap-1'>
                         <Button
                              variant="contained"
                              size="small"
                              style={{ backgroundColor: "#05df72", fontSize : "10px" }}
                              tabIndex={params.hasFocus ? 0 : -1}
                         >
                              Accept
                         </Button>
                         <Button
                              variant="contained"
                              size="small"
                              style={{ backgroundColor: "#ff6467", fontSize : "10px" }}
                              tabIndex={params.hasFocus ? 0 : -1}
                         >
                              Reject
                         </Button>
                    </strong>
               ),
          }
     ]

     return (

          <div className="container mx-auto p-4 w-full custom-scrollbar" >

               {/* <input type="search" value={Search} onChange={(e) => setSearch(e.target.value)} className='w-full py-2 px-6 border border-gray-200' placeholder='search here...' /> */}

               <div className='bg-white shadow-lg'>
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
                              rows={viewApplicationsPageData}
                              columns={columns}
                              paginationMode={"client"}
                              className='custom-scrollbar min-h-[500px]'
                              checkboxSelection
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
                                   height : 620,
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

               </div>
          </div>
     );
}

export default ViewApplications;


// import React, { useRef, useEffect, useState, useMemo } from 'react';
// import { assets, viewApplicationsPageData } from '../../assets/assets';
// import DataTable from "react-data-table-component";
// import { Button, Checkbox } from '@mui/material';
// import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
// import { PiDownloadSimpleBold } from "react-icons/pi";
// import { MdDelete } from "react-icons/md";
// import moment from "moment";
// import TextField from '@mui/material/TextField';

// const columns1 = [
//      {
//           name: "image",
//           label: "Profile Picture",
//           options: {
//                customBodyRender: (value) => (
//                     <img src={value} alt="Profile" style={{ width: 50, height: 50, borderRadius: "50%" }} />
//                ),
//           },
//      },
//      {
//           name: "name",
//           label: "Name",
//      },
//      {
//           name: "jobTitle",
//           label: "JobTitle",
//      },
//      {
//           name: "location",
//           label: "Location",
//      }
// ];

// const customStyles = {
//      headCells: {
//           style: {
//                backgroundColor: "#4B5563",  // Header background color
//                color: "white",  // Header text color
//                fontSize: "15px",
//                // fontWeight: "bold",
//                // textAlign: "center",
//           },
//      },
//      // cells: {
//      //      style: {
//      //           fontSize: "14px",
//      //           textAlign: "center",
//      //      },
//      // },
//      rows: {
//           highlightOnHoverStyle: {
//                backgroundColor: 'rgb(230, 244, 244)',
//                borderBottomColor: '#ddd',
//                // borderRadius: '25px',
//                outline: '1px solid #FFFFFF',
//           },
//           style: {
//                minHeight: "42px",
//                fontSize: "11px",
//                "&:nth-of-type(odd)": {
//                     backgroundColor: "#fff", // Alternating row color
//                },
//                "&:nth-of-type(even)": {
//                     backgroundColor: "#f8f9fa", // Row background color
//                },
//           },
//      },
// };


// const ViewApplications = () => {

//      const [Search, setSearch] = useState();
//      const searchRef = useRef(null);
//      const [data, setData] = React.useState(viewApplicationsPageData);

//      let filteredData;
//      const RunFilter = () => {
//           filteredData = searchRef.current && searchRef.current.value
//                ? viewApplicationsPageData.filter((row) =>
//                     row.name.replace(/\s/g, "").toLowerCase().includes(searchRef.current.value.replace(/\s/g, "").toLowerCase()),
//                     viewApplicationsPageData.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle))
//                )
//                : viewApplicationsPageData;
//      }

//      // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
//      function convertArrayOfObjectsToCSV(array) {
//           let result;

//           const columnDelimiter = ',';
//           const lineDelimiter = '\n';
//           const keys = Object.keys(data[0]);

//           result = '';
//           result += keys.join(columnDelimiter);
//           result += lineDelimiter;

//           array.forEach(item => {
//                let ctr = 0;
//                keys.forEach(key => {
//                     if (ctr > 0) result += columnDelimiter;

//                     result += item[key];

//                     ctr++;
//                });
//                result += lineDelimiter;
//           });

//           return result;
//      }

//      // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
//      function downloadCSV(array) {
//           const link = document.createElement('a');
//           let csv = convertArrayOfObjectsToCSV(array);
//           if (csv == null) return;

//           const filename = 'export.csv';

//           if (!csv.match(/^data:text\/csv/i)) {
//                csv = `data:text/csv;charset=utf-8,${csv}`;
//           }

//           link.setAttribute('href', encodeURI(csv));
//           link.setAttribute('download', filename);
//           link.click();
//      }


//      const Export = ({ onExport }) => {
//           return (
//                <Button
//                     style={{ backgroundColor: "#2979ff", fontSize: "12px", color: "white" }}
//                     onClick={e => onExport(e.target.value)}
//                     startIcon={<PiDownloadSimpleBold />}
//                >
//                     Export
//                </Button>
//           )
//      };

//      const columns = [
//           {
//                name: "#",
//                selector: row => row.id,
//                sortable: true,
//                width: "70px",
//           },
//           {
//                name: "UserName",
//                selector: row => row.name,
//                cell: row => (
//                     <div className='flex items-center gap-3'>
//                          <img className='w-8 h-8' src={row.imgSrc} alt="" />
//                          {row.name},
//                     </div>
//                ),
//                sortable: true,
//                width: "250px",
//           },
//           {
//                name: "Job Title",
//                selector: row => row.jobTitle,
//                sortable: true,
//                width: "160px"
//           },
//           {
//                name: "Location",
//                selector: row => row.location,
//                sortable: true,
//                // width: "auto"
//           },
//           {
//                name: "Date",
//                selector: row => row.date,
//                sortable: true,
//                cell: row => (
//                     <span>{moment.unix(row.date).fromNow()}</span>
//                )
//                // width: "auto"
//           },
//           {
//                name: "Resume",
//                selector: row => <a className='bg-blue-100 border border-blue-200 text-blue-600 px-3 py-1 rounded inline-flex gap-2 items-center' href="" target='_blank'>
//                     Resume <img src={assets.resume_download_icon} alt="" />
//                </a>,
//                // center: "true",
//                sortable: false,
//           },
//           {
//                name: "Action",
//                selector: row => <div className='flex gap-1 items-center'>
//                     <Button
//                          variant="contained"
//                          size="small"
//                          style={{ backgroundColor: "#15b565", fontSize: "11px", padding: "4px" }}
//                          tabIndex={row.hasFocus ? 0 : -1}
//                     >
//                          Accept
//                     </Button>
//                     <Button
//                          variant="contained"
//                          size="small"
//                          style={{ backgroundColor: "#ff3a3e", fontSize: "11px", padding: "4px" }}
//                          tabIndex={row.hasFocus ? 0 : -1}
//                     >
//                          Reject
//                     </Button>
//                </div>,
//                center: "true",
//                width: "200px",
//                sortable: false,

//           },
//      ]

//      const [selectedRows, setSelectedRows] = React.useState([]);
//      const [toggleCleared, setToggleCleared] = React.useState(false);

//      const handleRowSelected = React.useCallback(state => {
//           setSelectedRows(state.selectedRows);
//      }, []);

//      const contextActions = useMemo(() => {
//           const handleDelete = () => {
//                if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
//                     setToggleCleared(!toggleCleared);
//                     setData(differenceBy(data, selectedRows, 'title'));
//                }
//           };

//           return (
//                <Button key="delete" onClick={handleDelete} startIcon={<MdDelete style={{ fontSize: "19px" }} />} style={{ backgroundColor: 'red', color: "white", padding: "6px 15px" }}>
//                     Delete
//                </Button>
//           );
//      }, [data, selectedRows, toggleCleared]);

//      const actionsMemo = <Export onExport={() => downloadCSV(data)} />;
//      const actionsMemo2 = useMemo(() => <Button key="button" startIcon={<MdDelete />} style={{ backgroundColor: 'red', color: "white", padding: "6px 15px" }}>
//           Delete
//      </Button>, []);

//      const isRowSelected = (row) => selectedRows.some(selected => selected.id === row.id);

//      // Custom checkbox component
//      const CustomCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
//           return (
//                <Checkbox ref={ref} {...rest} size='small' />
//           );
//      });

//      const customSortIcon = ({ sortDirection }) => {
//           if (!sortDirection) return <FaSort className='text-white' color="white" />;
//           if (sortDirection === 'asc') return <FaSortUp className='text-white' color="black" />;
//           return <FaSortDown className='text-white' color="black" />;
//      };

//      const tableRef = useRef(null);

//      const CustomHeader = () => {
//           return <div className='flex justify-between items-center gap-3'>
//                <h2 className='text-nowrap text-[18px] font-bold'>All Applications</h2>
//                <div>
//                     <input type="text" ref={searchRef} onChange={RunFilter()} className='outline-none text-lg px-6 py-1 border border-gray-200' placeholder='search here...' />
//                     <button onClick={() => console.log(filteredData)}>Search</button>
//                     {actionsMemo}
//                </div>
//           </div>
//      }

//      const FilterComponent = ({ filterText, onFilter, onClear }) => (
//           <>
//                <TextField
//                     id="search"
//                     type="text"
//                     placeholder="Filter By Name"
//                     aria-label="Search Input"
//                     value={filterText}
//                     onChange={onFilter}
//                />
//                <Button type="button" onClick={onClear}>
//                     X
//                </Button>
//           </>
//      );

//      const [filterText, setFilterText] = React.useState('');
//      const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//      const filteredItems = viewApplicationsPageData.filter(
//           item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
//      );

//      const subHeaderComponentMemo = React.useMemo(() => {
//           const handleClear = () => {
//                if (filterText) {
//                     setResetPaginationToggle(!resetPaginationToggle);
//                     setFilterText('');
//                }
//           };

//           return (
//                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
//           );
//      }, [filterText, resetPaginationToggle]);

//      return (
//           <div className="container w-full h-full mx-auto p-4 relative" >


//                {/* <table className="w-full bg-white border border-gray-200 table-auto text-sm max-sm:text-sm" >

//                          <thead className='text-base'>
//                               <tr className='text-nowrap'>
//                                    <th className='py-4 px-4 text-left' >#</th>
//                                    <th className='py-4 px-4 text-left' >User Name</th>
//                                    <th className='py-4 px-4 text-left' >Job Title</th>
//                                    <th className='py-4 px-4 text-left' >Location</th>
//                                    <th className='py-4 px-4 text-left' >Resume</th>
//                                    <th className='py-4 px-4 text-left' >Action</th>
//                               </tr>
//                          </thead>

//                          <tbody className='px-4'>
//                               {filteredData.sort().map((application, index) => (
//                                    <tr key={index} className='text-gray-700 border-b border-b-gray-300 hover:bg-gray-100 text-nowrap px-5'>
//                                         <td className='py-2 px-4  text-left '>{index + 1}</td>
//                                         <td className='py-2 px-1text-center  flex items-center gap-3'>
//                                              <img className='w-8 h-8 rounded-full' src={application.imgSrc} alt="" />
//                                              <span>{application.name}</span>
//                                         </td>
//                                         <td className='py-2 px-4 '>{application.jobTitle}</td>
//                                         <td className='py-2 px-4 '>{application.location}</td>
//                                         <td className='py-2 px-4 '>
//                                              <a className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center' href="" target='_blank'>
//                                                   Resume <img src={assets.resume_download_icon} alt="" />
//                                              </a>
//                                         </td>
//                                         <td className=' text-left '>
//                                              <button className='px-4 py-1.5  bg-green-300 rounded font-semibold text-green-800 mr-1.5'>Accept</button>
//                                              <button className='px-4 py-1.5  bg-red-300 rounded font-semibold text-red-800'>Reject</button>
//                                         </td>
//                                    </tr>
//                               ))}
//                          </tbody>
//                     </table> */}


//                <div
//                     ref={tableRef}
//                     className='hidden-scrollbar overflow-y-auto grow overflow-x-auto border border-gray-200 shadow rounded-md bg-white'
//                >

//                     <DataTable
//                          title={<h2 className='text font-bold'>All Applications</h2>}
//                          // title={<CustomHeader />}
//                          // title={subHeaderComponentMemo}
//                          columns={columns}
//                          data={viewApplicationsPageData}
//                          customStyles={customStyles}
//                          selectableRows
//                          onSelectedRowsChange={handleRowSelected}
//                          selectableRowsComponent={CustomCheckbox} // Use custom checkbox
//                          selectableRowsComponentProps={{ className: 'custom-checkbox' }}
//                          contextActions={contextActions}
//                          clearSelectedRows={toggleCleared}
//                          pagination
//                          highlightOnHover
//                          pointerOnHover
//                          // actions={[actionsMemo2, actionsMemo]}
//                          conditionalRowStyles={[
//                               {
//                                    when: isRowSelected,
//                                    style: {
//                                         "&:nth-of-type(even)": {
//                                              backgroundColor: "#eee", // Alternating row color
//                                         },
//                                         "&:nth-of-type(odd)": {
//                                              backgroundColor: "#eee", // Row background color
//                                         }, // Selected row background color
//                                    },
//                               },
//                          ]}
//                          sortIcon={customSortIcon({})} // Apply custom icon
//                          defaultSortFieldId={1}
//                          responsive={true} // Ensure responsiveness
//                          overflowX="auto" // Enable horizontal scroll
//                          className='custom-scrollbar'
//                          fixedHeader
//                          fixedHeaderScrollHeight="500px"
//                          subHeader
//                          subHeaderComponent={subHeaderComponentMemo}
//                          persistTableHead
//                          paginationResetDefaultPage={resetPaginationToggle}
//                     >
//                     </DataTable>
//                </div>

//           </div>
//      );
// }

// export default ViewApplications;

