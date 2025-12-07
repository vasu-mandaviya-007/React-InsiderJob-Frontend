import React, { useEffect, useRef, useState } from 'react';


const SearchBox = ({ id, name, className = "", inputClassName = "", label = "Search Anything", selectedValue, setSelectedValue, values, maxHeight = 255 }) => {

     const resultContainerRef = useRef(null);
     const selectedItemRef = useRef(null);

     const [input, setinput] = useState(selectedValue);

     const [showResult, setshowResult] = useState(false);

     const [result, setresult] = useState([]);

     const [selectedIndex, setSelectedIndex] = useState(null);

     useEffect(() => {

          const handleClickOutside = (event) => {
               if (!event.target.closest(".search-result-box")) {
                    if (!event.target.closest(`#${id}`)) {
                         setshowResult(false);
                         setSelectedIndex(null)
                    }
               }
          };

          document.addEventListener("click", handleClickOutside);
          return () => document.removeEventListener("click", handleClickOutside);
     }, []);

     useEffect(() => {
          if (selectedItemRef.current && resultContainerRef.current) {
               selectedItemRef.current.scrollIntoView({ block: "nearest" });
          }
     }, [selectedIndex]);

     const handleSearch = (e) => {

          const input = e.target.value;
          setinput(input);

          const equal = values.filter(city => city.toLowerCase() === input.toLowerCase());

          if (equal.length > 0) {
               setSelectedValue(equal[0]);
               setinput(equal[0]);
          } else {
               setSelectedValue("No");
          }

          setresult(values.filter((keyword) => {
               return keyword.toLowerCase().includes(input.toLowerCase()) || input === "";
          }))

     }

     const handleKeyDown = (e) => {
          if (e.key === "ArrowDown") {
               setSelectedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, result.length - 1)));
          } else if (e.key === "ArrowUp") {
               setSelectedIndex((prevIndex) => (prevIndex === null ? result.length - 1 : Math.max(prevIndex - 1, 0)));
          } else if (e.key === "Enter" && selectedIndex !== null) {
               setinput(result[selectedIndex]);
               setSelectedValue(result[selectedIndex]);
               setshowResult(false);
               setSelectedIndex(null);
          }
     }

     const handleFocus = (e) => {
          setshowResult(true);
          handleSearch(e)
     }

     const handleResultClick = (value) => {
          setinput(value);
          setSelectedValue(value);
          setshowResult(false);
     }

     return (

          <div className={`${className} relative custome-select-searchbox shadow text-[#444] bg-white rounded `} >

               <input
                    value={input}
                    id={id}
                    name={name}
                    type="text"
                    onFocus={handleFocus}
                    onClick={() => setshowResult(true)}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    placeholder={label}
                    className={`${inputClassName} text-[#444] w-full py-4 px-5 focus:border focus:border-blue-500 outline-none bg-transparent rounded border border-gray-300 `}
                    autoComplete="off"
               />

               {result.length > 0 && showResult &&
                    <div className='py-2 search-result-box absolute top-full w-full z-10 bg-white border border-[#eee] '>

                         <ul ref={resultContainerRef} style={{ maxHeight: `${maxHeight}px` }} className={`overflow-y-auto text-sm px-2 `} >
                              {
                                   result.map((value, i) => {
                                        return <li ref={i === selectedIndex ? selectedItemRef : null} onClick={() => handleResultClick(value)} key={i} className={`rounded-[3px] py-3.5 px-2.5 hover:bg-[#e9f3ff] ${i === selectedIndex ? "bg-[#e9f3ff]" : ""} cursor-pointer `} >{value}</li>
                                   })
                              }
                         </ul>

                    </div>
               }

          </div>

     );

}

export default SearchBox;
