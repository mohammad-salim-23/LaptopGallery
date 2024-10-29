import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShopLayout = ({ items = [], title = "Products" }) => {
  const [sortOrder, setSortOrder] = useState(""); 

  // Function to handle sorting based on selected order
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return parseInt(a.price) - parseInt(b.price);
    } else if (sortOrder === "highToLow") {
      return parseInt(b.price) - parseInt(a.price);
    }
    return 0; 
  });

  return (
    <div className='p-6 bg-base-200 my-10'>
      <div className="flex">
        {/* Sidebar menu */}
        <div className="w-64 min-h-screen bg-white">
          <ul className="menu">
            {/* Sidebar content  */}
          </ul>
        </div>
        
        <div className="flex-1 p-6">
          {/* Sorting Navbar */}
          <div className="navbar bg-base-100 rounded-lg p-4 justify-between">
            <div>
              <p className='text-xl'>{title}</p>
            </div>
            <div className='flex gap-2'>
              <p className='text-xl'>Sort By:</p>
              <select 
                className="select select-ghost w-1/2 max-w-xs" 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option disabled value="">Default</option>
                <option value="lowToHigh">Price Low To High</option>
                <option value="highToLow">Price High To Low</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {sortedItems?.map((data) => (
             <Link to={`/productDetails/${data._id}`}> <div key={data._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
             <img src={data.image} alt={data.model} className="w-full h-40 object-cover" />
             <div className="p-4">
               <h3 className="text-lg font-bold mb-2">{data.brand} - {data.model}</h3>
               <p className="text-gray-700">Processor: {data.processor}</p>
               <p className="text-gray-700">RAM: {data.ram}</p>
               <p className="text-gray-700">Storage: {data.storage}</p>
               <p className="text-gray-700">Graphics: {data.graphics}</p>
               <p className="text-gray-700">OS: {data.os}</p>
               <p className="text-xl font-semibold mt-4">{data.price}</p>
              
             </div>
           </div></Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
