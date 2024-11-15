import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-end items-center pb-10 overflow-hidden"
      style={{
        backgroundImage: `url('https://i.ibb.co/bdppy7z/error-colored-isometric-composition-signs-tools-materials-solving-problems-errors-computer-vector-il.jpg')`,
        backgroundSize: 'contain', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center">
        <Link to="/">
          <button className="btn btn-wide bg-amber-400 text-black border border-black">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
