import React, { useState } from 'react';
import { FiLoader } from "react-icons/fi";
const Buttons = ({ text, onClick, className = "flex justify-center gap-2 items-center" }) => {
     const [isLoading, setisLoading] = useState(true)
     return (
          <div>

               <button className={className} disabled onClick={onClick}>
                    {text}
                    <FiLoader className='text-lg font-bold animate-spin' />
               </button>

          </div>
     );
}

export default Buttons;
