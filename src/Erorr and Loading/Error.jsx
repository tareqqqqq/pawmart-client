import React from 'react';
import errorImgPage from '../assets/error-404.png'

const Error = () => {
    return (
        <div>
           <div className="flex flex-col items-center justify-center  text-center bg-base-100 my-5">
            
      
      <figure>
        <img className='mx-auto' src={errorImgPage} alt="" />
      </figure>
      
        </div> 
        </div>
    );
};

export default Error;