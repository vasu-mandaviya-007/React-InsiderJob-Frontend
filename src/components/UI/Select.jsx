import React, { useEffect, useState } from 'react';
import "./Select.css"
import { hover, motion } from 'framer-motion';
import { FaAngleDown } from 'react-icons/fa6';


const Select = ({ label = "Please Select", isOpenMenu, setisOpenMenu, schoole, selectedSchoole, setselectedSchoole }) => {


     const [hovered, sethovered] = useState(null);

     const [position, setposition] = useState("bottom");

     const handleMenuOpen = (e) => {

          if (isOpenMenu) {
               sethovered(selectedSchoole);
               setisOpenMenu(false)
          } else {
               setisOpenMenu(true)

               const distanceFromBottom = window.innerHeight - e.clientY;
               const element = e.currentTarget;

               const Menu = element.parentElement.querySelector("div");

               const MenuHeight = Menu.offsetHeight;

               if (distanceFromBottom < MenuHeight) {
                    setposition("top");
               } else {
                    setposition("bottom");
               }

          }
     }

     const handleSelect = (index) => {
          setselectedSchoole(index);
          setisOpenMenu(false);
     }

     useEffect(() => {

          const handleClickOutside = (event) => {
               if (!event.target.closest(".custom-select")) {
                    setisOpenMenu(false);
                    sethovered(selectedSchoole);
               }
          };

          document.addEventListener("click", handleClickOutside);
          return () => document.removeEventListener("click", handleClickOutside);
     }, []);

     return (

          <div className='relative custom-select flex flex-col' >

               <button onClick={handleMenuOpen} className='border border-gray-300 text-[#333] focus:outline outline-blue-500 flex justify-between items-center px-4 py-3 '>
                    {selectedSchoole !== null ? schoole[selectedSchoole] : label}
                    <FaAngleDown />
               </button>

               {/* <div className='absolute top-full bg-white w-full' > */}
               {/* <motion.div
                    initial={{ height: 0, opacity: 0,translateY : "40px" }}
                    animate={{
                         height: isOpenMenu ? "auto" : 0,
                         translateY : isOpenMenu ? "0" : "40px",
                         opacity: isOpenMenu ? 1 : 0,
                         zIndex : isOpenMenu ? 999 : -10
                    }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden border border-gray-200 absolute w-full bg-white top-[110%] shadow"
               > */}

               <div className={`${isOpenMenu ? "translate-y-0 opacity-100 z-10" : "translate-y-3 opacity-0 -z-10"} duration-200 overflow-hidden border border-gray-200 absolute w-full bg-white ${position === "bottom" ? "top-[110%]" : "bottom-[110%]"}  shadow`}>

                    <ol className="p-0 bg-gray-50" >

                         <li
                              onMouseEnter={() => sethovered(null)}
                              onClick={() => handleSelect(null)}
                              className={`last:border-0 duration-200 ${selectedSchoole && hovered === null ? "bg-[#1976d2] text-white" : "bg-white"} ${hovered === null ? "!bg-[#1976d2] text-white" : ""} cursor-pointer border-b border-b-gray-200 px-3 text-gray-700 text-sm py-2.5  `}
                         >
                              {label}
                         </li>

                         {
                              schoole.map((schoole, index) => {
                                   return (
                                        <li
                                             key={index}
                                             onMouseEnter={() => sethovered(index)}
                                             onClick={() => handleSelect(index)}
                                             className={`last:border-0 duration-200 ${schoole === schoole[selectedSchoole] ? "bg-[#1976d2] text-white" : "bg-white"} ${hovered === index ? "!bg-[#1976d2] text-white" : ""} ${hovered !== index && selectedSchoole === index && "!bg-gray-400 text-white"} cursor-pointer border-b border-b-gray-200 px-3 text-gray-700 text-sm py-2.5  `}
                                        >
                                             {schoole}
                                        </li>
                                   )
                              })
                         }


                    </ol>


                    {/* <ol className="p-1 bg-gray-50" >
                         <li className=' hover:bg-[#1976d2] hover:text-white cursor-pointer border-b border-b-gray-200 px-3 text-gray-700 text-sm py-2.5  ' >option1</li>
                         <li className=' hover:bg-[#1976d2] hover:text-white cursor-pointer border-b border-b-gray-200 px-3 text-gray-700 text-sm py-2.5  ' >option2</li>
                         <li className=' hover:bg-[#1976d2] hover:text-white cursor-pointer border-b border-b-gray-200 px-3 text-gray-700 text-sm py-2.5  ' >option3</li>
                         <li className=' hover:bg-[#1976d2] hover:text-white cursor-pointer px-3 text-gray-700 text-sm py-2.5  ' >option4</li>
                    </ol> */}
                    {/* </motion.div> */}
               </div>


          </div >

     );

}

export default Select;
