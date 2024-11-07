import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../CartButton';
import { CiFilter } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";

const ShopLayout = ({ items = [], title = "Products" }) => {
  // State management for filters, sorting, and pagination
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

  // Derived variables
  const isAccessory = selectedSubcategory.includes("Laptop Accessories") || selectedSubcategory.includes("Mobile Accessories");
  const itemsPerPage = 6;

  // Filter items based on selected filters
  const filteredItems = items.filter(item =>
    (!inStockOnly || item.status) &&
    (selectedBrand.length === 0 || selectedBrand.includes(item.brand)) &&
    (isAccessory || selectedRam.length === 0 || selectedRam.includes(item.ram)) &&
    (isAccessory || selectedStorage.length === 0 || selectedStorage.includes(item.storage)) &&
    (isAccessory || selectedOs.length === 0 || selectedOs.includes(item.os)) &&
    (isAccessory || selectedProcessor.length === 0 || selectedProcessor.includes(item.processor)) &&
    (selectedSubcategory.length === 0 || selectedSubcategory.includes(item.subCategory))
  );

  // Apply sorting to filtered items
  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  // Pagination variables
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Utility functions
  const toggleFilter = (setter, value) => setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Pagination numbers
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
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-30 w-64 bg-white transform md:translate-x-0 transition-transform duration-300 ease-in-out md:flex md:relative md:flex-col`}>
          <div className="p-4">
            <h2>Availability</h2>
            <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)} />
            <label>In Stock</label>
          </div>
          {/* Filter sections */}
          {[{
            title: "Subcategory", options: [...new Set(items.map(item => item.subCategory))], state: selectedSubcategory, setter: setSelectedSubcategory
          }, {
            title: "Brand", options: [...new Set(items.map(item => item.brand))], state: selectedBrand, setter: setSelectedBrand
          }, {
            title: "RAM", options: isAccessory ? [] : [...new Set(items.map(item => item.ram))], state: selectedRam, setter: setSelectedRam
          }, {
            title: "Storage", options: isAccessory ? [] : [...new Set(items.map(item => item.storage))], state: selectedStorage, setter: setSelectedStorage
          }, {
            title: "Operating System", options: isAccessory ? [] : [...new Set(items.map(item => item.os))], state: selectedOs, setter: setSelectedOs
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
              <select className="select select-ghost w-1/2 max-w-xs border border-gray-400" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option disabled value="">Default</option>
                <option value="lowToHigh">Price Low To High</option>
                <option value="highToLow">Price High To Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {paginatedItems.map(data => (
              <div key={data._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                <Link to={`/productDetails/${data._id}`}>
                  <img src={data.image} alt={data.model} className="w-full h-40 object-cover" />
                </Link>
                <div className="p-4">
                  <Link to={`/productDetails/${data._id}`}>
                    <h3 className="text-lg font-bold mb-2 hover:text-red-500 hover:underline">{data.brand} - {data.model}</h3>
                  </Link>
                  {title === "Accessories" ? (
                    <>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">Sub-Category:</span> {data.subCategory}</p>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">SKU:</span> {data.productSKU}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">Processor:</span> {data.processor}</p>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">RAM:</span> {data.ram}</p>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">Storage:</span> {data.storage}</p>
                    </>
                  )}
                  <p className="text-xl font-semibold mt-4 text-center text-red-600">{data.price}</p>
                  <CartButton prodId={data._id} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            <button onClick={handlePreviousPage} className={`px-4 py-2 text-white bg-primary rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentPage === 1}>
              <GrPrevious />
            </button>
            {getPageNumbers().map(number => (
              <button key={number} onClick={() => handlePageClick(number)} className={`px-4 py-2 text-white rounded ${number === currentPage ? "bg-primary" : "bg-gray-300"}`}>
                {number}
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
