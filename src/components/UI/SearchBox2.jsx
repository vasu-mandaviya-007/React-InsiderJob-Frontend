import React, { useEffect, useRef, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import default_uni_logo from "../../assets/university_logo.png";

const SearchBox2 = ({ id, name, className = "", inputClassName = "", label = "Search Anything", selectedValue, setSelectedValue, values, showIcon = false, maxHeight = 255 }) => {

     const resultContainerRef = useRef(null);
     const selectedItemRef = useRef(null);

     const [input, setinput] = useState("");

     const [selectedIcon, setselectedIcon] = useState("");

     const [showResult, setshowResult] = useState(false);

     const [result, setresult] = useState([]);

     const [selectedIndex, setSelectedIndex] = useState(null);

     useEffect(() => {

          const handleClickOutside = (event) => {
               if (!event.target.closest(".search-result-box")) {
                    if (!event.target.closest(`#${id}`)) {
                         setshowResult(false);
                         setinput("")
                         setSelectedIndex(null)
                    }
               }
          };

          document.addEventListener("click", handleClickOutside);
          return () => document.removeEventListener("click", handleClickOutside);
     }, []);

     useEffect(() => {
          if (selectedItemRef.current && resultContainerRef.current) {
               const container = resultContainerRef.current;
               const target = selectedItemRef.current;

               // Get target position relative to the container
               const targetPosition = target.offsetTop;

               // Scroll the container div to the target + 100px offset
               container.scrollTo({ top: targetPosition - 120 });
          }
     }, [selectedIndex]);

     useEffect(() => {

          const icon = values.find(value => value.name === selectedValue)
          if (icon !== undefined) {
               setselectedIcon(icon?.image);
          }

     }, [selectedValue]);

     const handleSearch = (e) => {

          const input = e.target.value;
          setinput(input);

          const equal = values.filter(value => value?.name.toLowerCase() === input.toLowerCase());

          if (equal.length > 0) {
               setSelectedValue(equal[0].name);
               setinput(equal[0].name);
          }

          // if (input !== "") {
          setresult(values.filter((keyword) => {
               return keyword?.name.toLowerCase().includes(input.toLowerCase()) || input === ""
          }))
          // } else {
          //      setresult([]);
          //      setSelectedValue("");
          // }
     }

     const handleKeyDown = (e) => {
          if (e.key === "ArrowDown") {
               e.preventDefault();
               setSelectedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, result.length - 1)));
          } else if (e.key === "ArrowUp") {
               e.preventDefault();
               setSelectedIndex((prevIndex) => (prevIndex === null ? result.length - 1 : Math.max(prevIndex - 1, 0)));
          } else if (e.key === "Enter" && selectedIndex !== null) {
               // setinput(result[selectedIndex].name);
               setinput("");
               setshowResult(false);
               setSelectedValue(result[selectedIndex].name);
               setshowResult(false);
               setSelectedIndex(null);
          }
     }

     const handleFocus = (e) => {

          setshowResult(true);

          setresult(values.filter((keyword) => {
               return keyword?.name.toLowerCase().includes(input.toLowerCase()) || input === ""
          }))

          const index = values.findIndex(value => value.name.toLowerCase() === selectedValue.toLowerCase());

          setSelectedIndex(index);
          // if(index !== 0 && index !== -1){
          // }

     }

     const handleResultClick = (value, i) => {

          setinput("");
          setSelectedIndex(i);
          setSelectedValue(value);
          setshowResult(false);

     }

     return (

          <div onKeyDown={handleKeyDown} className={`${className} relative custome-select-searchbox shadow text-[#444] bg-white rounded `} >

               <div className='flex items-center relative'>

                    {
                         selectedIcon !== "" && showIcon &&
                         <img src={selectedIcon} className=' absolute left-3 h-8 w-8' />
                    }

                    <input
                         value={selectedValue !== "No" ? selectedValue : ""}
                         id={id}
                         name={name}
                         type="text"
                         readOnly={true}
                         onFocus={handleFocus}
                         onClick={() => setshowResult(true)}
                         placeholder={label}
                         className={`${inputClassName} text-[#444] w-full text-sm py-4 ${selectedIcon !== "" && showIcon ? "pl-14" : ""} px-5 focus:border focus:border-blue-500 bg-[#FCFCFC] outline-none rounded border border-gray-300 `}
                         autoComplete="off"
                    />

               </div>

               {showResult &&

                    <div className='py-2 absolute top-[110%] w-full z-2 search-result-box bg-white 0 shadow-2xl border border-[#eee] '>

                         <div className='relative px-4 py-2 text-gray-500'>
                              <FaMagnifyingGlass className='absolute top-1/2 -translate-y-1/2 left-7 ' />
                              <input
                                   type="search"
                                   value={input}
                                   onChange={handleSearch}
                                   autoComplete='new-password'
                                   placeholder='Search Here..'
                                   className='border border-gray-300 focus:border-gray-400 pl-10 pr-4 py-2.5 rounded outline-none w-full'
                              />
                         </div>

                         <ul ref={resultContainerRef} style={{ maxHeight: `${maxHeight}px` }} className={`overflow-y-auto text-sm px-4 `} >
                              {
                                   result.map((value, i) => {
                                        return (
                                             <li
                                                  ref={i === selectedIndex ? selectedItemRef : null}
                                                  onClick={() => handleResultClick(value?.name, i)}
                                                  key={i}
                                                  className={` flex items-center gap-3 rounded-[3px] py-3 px-2.5 hover:!bg-[#e9f3ff]  ${value.name === selectedValue ? "!bg-[#e1e1e1]" : ""} ${i === selectedIndex ? "!bg-[#e9f3ff]" : ""} cursor-pointer `}
                                             >
                                                  {
                                                       showIcon &&
                                                       <img src={value?.image} className='h-6 w-6' />
                                                  }
                                                  {value?.name}
                                             </li>
                                        )
                                   })
                              }
                         </ul>

                    </div>
               }

          </div>

     );

}

export default SearchBox2;
