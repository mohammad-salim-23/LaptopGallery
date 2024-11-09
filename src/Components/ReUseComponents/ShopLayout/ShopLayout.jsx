import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartButton from '../CartButton';
import { CiFilter } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai"; // Importing cross icon
import { DiGitCompare } from 'react-icons/di';

const ShopLayout = ({ items = [], title = "Products" }) => {
  const [sortOrder, setSortOrder] = useState("");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedOs, setSelectedOs] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const isAccessory = selectedSubcategory.includes("Laptop Accessories") || selectedSubcategory.includes("Mobile Accessories");
  const itemsPerPage = 8;

  const filteredItems = items.filter(item =>
    (!inStockOnly || item.status) &&
    (selectedBrand.length === 0 || selectedBrand.includes(item.brand)) &&
    (isAccessory || selectedRam.length === 0 || selectedRam.includes(item.ram)) &&
    (isAccessory || selectedStorage.length === 0 || selectedStorage.includes(item.storage)) &&
    (isAccessory || selectedOs.length === 0 || selectedOs.includes(item.os)) &&
    (isAccessory || selectedProcessor.length === 0 || selectedProcessor.includes(item.processor)) &&
    (selectedSubcategory.length === 0 || selectedSubcategory.includes(item.subCategory))
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleFilter = (setter, value) => setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) startPage = Math.max(1, endPage - (maxVisiblePages - 1));
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  return (
    <div className="p-6 bg-base-200 my-24">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Sidebar - Desktop and larger */}
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out 
          ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:flex md:flex-col mt-20 md:mt-0  lg:mt-0 overflow-auto`}>

          {/* Cross button inside the drawer when open */}
          {sidebarVisible && (
            <button
              onClick={() => setSidebarVisible(false)}
              className="absolute top-4 right-4 p-2 text-xl text-black"
            >
              <AiOutlineClose className='border border-blue-400  text-3xl rounded-2xl' />
            </button>
          )}

          <div className="p-4">
            <h2>Availability</h2>
            <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)} />
            <label>In Stock</label>
          </div>
          {/* Filter sections */}
          {[{
            title: "Brand", options: [...new Set(items.map(item => item.brand))], state: selectedBrand, setter: setSelectedBrand
          }, {
            title: "RAM", options: isAccessory ? [] : [...new Set(items.map(item => item.ram))], state: selectedRam, setter: setSelectedRam
          }, {
            title: "Storage", options: isAccessory ? [] : [...new Set(items.map(item => item.storage))], state: selectedStorage, setter: setSelectedStorage
          }, {
            title: "Processor", options: isAccessory ? [] : [...new Set(items.map(item => item.processor))], state: selectedProcessor, setter: setSelectedProcessor
          }].map(({ title, options, state, setter }) => options.length > 0 && (
            <div key={title} className="p-4">
              <h2>{title}</h2>
              {options.map(option => (
                <div key={option}>
                  <input type="checkbox" onChange={() => toggleFilter(setter, option)} checked={state.includes(option)} />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4">
          <div className="navbar flex flex-col md:flex-row gap-2 bg-base-100 rounded-lg md:p-4 justify-between">
            <button className="md:hidden" onClick={() => setSidebarVisible(!sidebarVisible)}>
              <CiFilter /> Filtering
            </button>
            <p className='text-xl hidden md:block'>{title}</p>
            <div className='flex-row gap-2'>
              <p>Sort By:</p>
              <select className="select select-ghost w-full sm:w-1/2 max-w-xs border border-gray-400" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option disabled value="">Default</option>
                <option value="lowToHigh">Price Low To High</option>
                <option value="highToLow">Price High To Low</option>
              </select>
            </div>
          </div>

          {/* Card design */}
          <div className='container mx-auto px-4'>
            <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-4">
              {paginatedItems.map(data => (
                <div key={data._id} className="w-full bg-white shadow-lg rounded-lg flex flex-col">
                  <Link to={`/productDetails/${data._id}`} className="block">
                    <img src={data.image} alt={data.model} className="w-full h-80 object-cover mb-2" />
                  </Link>
                  {/* Fixed height for content area */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <Link to={`/productDetails/${data._id}`}>
                        <h3 className="text-xl hover:underline hover:cursor-pointer mb-2">
                          {data.title}
                        </h3>
                      </Link>
                      <div className="flex items-center">
                        <ul className="list-disc ml-4">
                          <li><span className="text-gray-600">Model -</span> {data.model || "N/A"}</li>
                          <li><span className="text-gray-600">Brand -</span> {data.brand || "N/A"}</li>
                        </ul>
                      </div>
                      <div className="mt-2">
                        <p className="border text-rose-600 p-1 rounded-lg font-semibold">
                          <span className="font-semibold">Price:</span> {data.price || "N/A"}
                        </p>
                        <p className="border text-gray-500 p-1 rounded-lg font-semibold mt-1">
                          <span className="font-semibold">Regular Price:</span>
                          <span className="line-through"> {data.regularPrice || "N/A"}</span>
                        </p>
                      </div>
                    </div>
                    {/* Buttons container */}
                    <div className="flex gap-4 mt-4 justify-between">
                      <NavLink to={`/productDetails/${data._id}`} className="btn text-[16px] bg-primary text-white py-2 px-4 rounded-lg hover:bg-transparent hover:text-primary border border-primary">
                        See More
                      </NavLink>
                      <CartButton prodId={data._id} className="btn text-[16px] bg-primary text-white py-2 px-4 rounded-lg hover:bg-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            <button onClick={handlePreviousPage} className={`px-4 py-2 text-white bg-primary rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentPage === 1}>
              <GrPrevious />
            </button>
            {getPageNumbers().map(pageNumber => (
              <button key={pageNumber} onClick={() => handlePageClick(pageNumber)} className={`px-4 py-2 ${currentPage === pageNumber ? "bg-primary text-white" : "bg-white text-black"} border border-gray-400 rounded`}>
                {pageNumber}
              </button>
            ))}
            <button onClick={handleNextPage} className={`px-4 py-2 text-white bg-primary rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentPage === totalPages}>
              <GrNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
