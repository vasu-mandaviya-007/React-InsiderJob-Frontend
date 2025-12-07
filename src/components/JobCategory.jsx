import React from 'react';
import CategoryBox from './CategoryBox';
import { assets } from '../assets/assets';

const JobCategory = () => {

     return (

          <div className='bg-[#fcfcfc] dark:bg-dark-secondary pb-14 px-16'>

               <div data-aos="fade-up" data-aos-once="false" data-aos-duration="1500" className="container p-8">

                    <h1 className='text-3xl font-bold text-center mt-5 dark:text-white mb-14'>Find Jobs By <span className='text-primary'>Category</span></h1>

                    <div className='grid grid-cols-4 gap-8'>

                         <CategoryBox category={"Finance"} hover_img={assets.financeHover} image={assets.finance} />
                         <CategoryBox category={"Technology"} hover_img={assets.technologyHover} image={assets.Technology} />
                         <CategoryBox category={"Agriculture"} hover_img={assets.agricultureHover} image={assets.Agriculture} />
                         <CategoryBox category={"Construction"} hover_img={assets.constructionHover} image={assets.Construction} />
                         <CategoryBox category={"Manufacturing"} hover_img={assets.manufacturingHover} image={assets.Manufacturing} />
                         <CategoryBox category={"Production"} hover_img={assets.productionHover} image={assets.Production} />
                         <CategoryBox category={"Transport"} hover_img={assets.transportHover} image={assets.Transport} />
                         <CategoryBox category={"Insurance"} hover_img={assets.insuranceHover} image={assets.Insurance} />

                    </div>

               </div>

          </div>

     );

}

export default JobCategory;
