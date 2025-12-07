import React from 'react';
import { RotatingLines } from "react-loader-spinner";
import { assets } from '../../assets/assets';


const Loader = () => {

     const styles = {
          loader: {
               position: 'fixed',
               top: '0',
               left: '0',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: '100%',
               // background: 'rgba(0,0,0,.5)',
               background: '#F4F2EE',
               // background: 'rgba(255,255,255,.7)',
               zIndex: '9999',
          }
     }

     return (

          <div className='fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-amber-200 z-[9999]' style={styles.loader}>
               {/* <h1 className='text-4xl uppercase flex font-bold text-blue-600'>
                    <p className='bg-blue-600  text-white flex justify-center items-center h-10 mr-1 w-10'>J</p> ob Portal   
               </h1> */}
               <img className='h-[60px]' src={assets.logo} alt="" />
               <div className='w-[200px] h-[3px] bg-gray-400 mt-4 overflow-hidden relative'>
                    <p className='absolute top-1/2 -translate-y-1/2 h-[100px] bg-blue-700 w-[100px] animate origin-left'></p>
               </div>
               {/* <RotatingLines
                    strokeColor=" rgb(57, 212, 255)"
                    strokeWidth="5"
                    animationDuration="0.90"
                    width="80"
                    visible={true}
               /> */}
          </div>

     );

}

export default Loader;
