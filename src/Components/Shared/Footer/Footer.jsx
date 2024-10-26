import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-5 my-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Company Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">Company</h2>
          <ul>
            <li><Link to="/about">About Us</Link></li>
           
            <li><Link to="/delivery">Delivery Policy</Link></li>

            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">Customer Service</h2>
          <ul>
            <li><Link to="/support">Support Center</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/returns">Return Policy</Link></li>
          </ul>
        </div>

        {/* My Account Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">My Account</h2>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
             
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <img src="/icons/twitter.png" alt="Twitter" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img src="/icons/instagram.png" alt="Instagram" />
            </a>
          </div>
        </div>
        
      </div>
      <div className="text-center text-gray-500 mt-8">
        © 2024 Your Company Name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
