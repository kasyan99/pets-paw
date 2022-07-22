import React from "react";
import loader from '../../assets/loader.svg'

const Preloader: React.FC = () => {
   return (
      <div className='preloader'>
         <img src={loader} alt="loading" />
      </div>
   )
}

export default Preloader