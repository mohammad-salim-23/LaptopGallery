import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-end items-center bg-cover bg-center pb-10"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/1vq0BmY/modern-vector-illustration-404-error-page-vector-website-electric-plug-socket-unplugged-599740-712.jpg')`,
      }}
    >
      <div className="text-center">
        <Link to="/">
          <button className="btn btn-wide  border border-yellow-500 text-white">
           Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
