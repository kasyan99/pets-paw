import React from "react";
import loader from '../../assets/loader.svg'

const Preloader = () => {
   return (
      <div className='preloader'>
         <img src={loader} alt="loading" />
      </div>
   )
}

export default Preloader