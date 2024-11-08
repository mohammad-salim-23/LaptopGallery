import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineMail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-5">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h2 className="font-bold text-lg mb-4">Support</h2>
          <div className="contact-info-container space-y-4">
            {/* Contact Number Section */}
            <div className="border border-red-600 rounded-s-full rounded-e-full flex p-4 gap-4 items-center my-4">
              <div className="text-2xl flex justify-center items-center text-red-600">
                <IoMdCall />
              </div>
              <div className="border border-y-white h-full"></div>
              <div>
                <p className="text-gray-500">9 AM - 8 PM</p>
                <h3 className="text-red-600">
                  <a href="tel:01325798939" className="hover:underline">
                    01325798939
                  </a>
                </h3>
              </div>
            </div>

            {/* Email Section */}
            <div className="border border-red-600 rounded-s-full rounded-e-full flex p-4 gap-4 items-center">
              <div className="text-2xl flex justify-center items-center text-red-600">
                <MdOutlineMail />
              </div>
              <div className="border border-y-white h-full"></div>
              <div>
                <p className="text-gray-500">Email Us</p>
                <h3 className="text-red-600">
                  <a href="mailto:support@laptopgallery24.com" className="hover:underline">
                    support@laptopgallery24.com
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">Company</h2>
          <ul>
            <li className="my-8"><Link to="/about">About Us</Link></li>
            <li className="my-8"><Link to="/delivery">Delivery Policy</Link></li>
            <li className="my-8"><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">Customer Service</h2>
          <ul>
            <li className="my-8 hover:underline hover:text-red-500">  <a 
  href="https://wa.me/01325798939" 
  target="_blank" 
  rel="noreferrer"
>Support Center</a></li>
            <li className="my-8"><Link to="/faq">FAQ</Link></li>
            <li className="my-8"><Link to="/returns">Return Policy</Link></li>
          </ul>
        </div>

        {/* My Account Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">My Account</h2>
          <ul>
            <li className="my-8"><Link to="/login">Login</Link></li>
            <li className="my-8"><Link to="/registration">Register</Link></li>
            <li className="my-8"><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>
      </div>

      {/* Follow Us and Location Section */}
      <div className="container mx-auto p-8 flex flex-col md:flex-row justify-between items-start mt-8 text-sm">
        {/* Follow Us Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">Follow Us</h2>
          <div className="flex text-2xl space-x-4 mb-6">
            <a href="https://www.facebook.com/profile.php?id=100065289210056&mibextid=ZbWKwL" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a 
  href="https://wa.me/01325798939" 
  target="_blank" 
  rel="noreferrer"
>
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Location Section */}
        <div>
          <h2 className="font-bold text-lg mb-2">LapTop Gallery</h2>
          <p className="my-2">
            <span className="text-red-600 font-semibold flex">
              <IoLocationOutline />Shylet OutLet:
            </span>
            <a 
              href="https://maps.app.goo.gl/iMQSgiUeieT959G39" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              shop-no:23/2, 2nd floor, Kudratullah Market, BondorBazar
            </a>
          </p>
          <p className="my-2">
            <span className="text-red-600 font-semibold flex">
              <IoLocationOutline />Chittagong OutLet:
            </span>
            MohammodPur, MuradPur
          </p>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="text-center text-gray-500 mt-8">
        © 2024 Laptop Gallery. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
