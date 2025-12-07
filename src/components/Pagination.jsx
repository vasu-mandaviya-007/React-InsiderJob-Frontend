import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";


const Pagination = ({ indexOfLastProduct, setindexOfLastProduct, indexOfFirstProduct, setindexOfFirstProduct, jobLength, filteredJobs }) => {

     const [currentPage, setcurrentPage] = useState(1);
     const [ItemPerPage, setItemPerPage] = useState(6);

     const totalPages = Math.ceil(filteredJobs.length / ItemPerPage);

     // Get current page products
     useEffect(() => {

          setindexOfLastProduct(currentPage * ItemPerPage);
          setindexOfFirstProduct(indexOfLastProduct - ItemPerPage);

     },[indexOfFirstProduct,indexOfLastProduct, currentPage, ItemPerPage])

     // Handle Next and Prev
     const nextPage = () => {
          if (currentPage < totalPages) setcurrentPage(currentPage + 1);
     };

     const prevPage = () => {
          if (currentPage > 1) setcurrentPage(currentPage - 1);
     };

     // Handle items per page change
     const handleItemsPerPageChange = (e) => {
          setItemPerPage(Number(e.target.value));
          setcurrentPage(1); // Reset to first page when changing items per page
     };

     const maxPageButtons = 5; // Adjust how many page numbers to show

     const getPageNumbers = () => {
          let pages = [];
          const startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
          const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

          if (startPage > 2) pages.push("..."); // Ellipsis before middle pages

          for (let i = startPage; i <= endPage; i++) {
               pages.push(i);
          }

          if (endPage < totalPages - 1) pages.push("..."); // Ellipsis after middle pages

          return pages;
     };

     return (

          <div>
               {
                    jobLength > 0 && (

                         <div className='flex items-center justify-between space-x-2 mt-10 border border-gray-200 px-4 py-2.5 shadow'>

                              <div className='flex items-center gap-3 text-gray-500 text-sm'>
                                   <div className='flex items-center'>
                                        item per page
                                        <select className='ml-2 px-1 py-0.5 focus:outline focus:outline-blue-400 rounded border' value={ItemPerPage} onChange={handleItemsPerPageChange} name="" id="">
                                             {[6, 12, 18, 24].map((num) => (
                                                  <option key={num} value={num}>
                                                       {num}
                                                  </option>
                                             ))}
                                        </select>
                                   </div>
                                   <span>
                                        Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, jobLength)} of {jobLength}
                                   </span>
                              </div>

                              <div className='flex gap-2'>

                                   <button onClick={prevPage} disabled={currentPage === 1} className='disabled:text-gray-400'><FaAngleLeft /></button>

                                   {/* {
                                   Array.from({ length: totalPages }).map((job, i) => {
                                        return <button key={i} onClick={() => setcurrentPage(i + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === i + 1 ? "bg-blue-100 text-blue-500" : "text-gray-500 hover:bg-gray-100"}`}>{i + 1}</button>
                                   })
                              } */}

                                   {/* First Page */}
                                   {totalPages >= 1 && (
                                        <button onClick={() => setcurrentPage(1)} className={`w-9 h-9 flex items-center justify-center border border-gray-300 rounded ${currentPage === 1 ? "bg-blue-100 text-blue-500" : "text-gray-500 hover:bg-gray-100"}`}>1</button>
                                   )}

                                   {/* Dynamic Middle Pages */}
                                   {getPageNumbers().map((page, i) => (
                                        <button
                                             key={i}
                                             onClick={() => typeof page === "number" && setcurrentPage(page)}
                                             className={`w-9 h-9 flex items-center justify-center border border-gray-300 rounded ${currentPage === page ? "bg-blue-100 text-blue-500" : "text-gray-500 hover:bg-gray-100"}`}
                                             disabled={page === "..."}
                                        >
                                             {page}
                                        </button>
                                   ))}

                                   {/* Last Page */}
                                   {totalPages > 1 && (
                                        <button onClick={() => setcurrentPage(totalPages)} className={`w-9 h-9 flex items-center justify-center border border-gray-300 rounded ${currentPage === totalPages ? "bg-blue-100 text-blue-500" : "text-gray-500 hover:bg-gray-100"}`}>{totalPages}</button>
                                   )}


                                   <button onClick={nextPage} disabled={currentPage === totalPages} className='disabled:text-gray-400'><FaAngleRight /></button>

                              </div>

                         </div>

                    )
               }
          </div>
     );
}

export default Pagination;
