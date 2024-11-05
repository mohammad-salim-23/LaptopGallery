import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../CartButton';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

const ShopLayout = ({ items = [], title = "Products" }) => {
  const [sortOrder, setSortOrder] = useState("");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedOs, setSelectedOs] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState([]);
  const [selectedType, setSelectedType] = useState([]); // Define selectedType here
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sorting and filtering function
  const sortedItems = [...items]
    .filter(item => 
      (!inStockOnly || item.stock) &&
      (selectedBrand.length === 0 || selectedBrand.includes(item.brand)) &&
      (selectedRam.length === 0 || selectedRam.includes(item.ram)) &&
      (selectedStorage.length === 0 || selectedStorage.includes(item.storage)) &&
      (selectedOs.length === 0 || selectedOs.includes(item.os)) &&
      (selectedProcessor.length === 0 || selectedProcessor.includes(item.processor)) &&
      (selectedType.length === 0 || selectedType.includes(item.type)) // Filter by type if defined
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  const toggleFilter = (setter, value) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const brands = [...new Set(items.map(item => item.brand))];
  const ram = [...new Set(items.map(item => item.ram))];
  const storage = [...new Set(items.map(item => item.storage))];
  const os = [...new Set(items.map(item => item.os))];
  const processor = [...new Set(items.map(item => item.processor))];
  const types = [...new Set(items.map(item => item.type))]; // Extract types if available

  return (
    <div className="p-6 bg-base-200 my-10">
       
      <div className="flex">
        <div className="w-64 min-h-screen p-4 bg-white rounded-lg">
          {/* Availability Filter */}
          <div className="p-4">
            <h2>Availability</h2>
            <input 
              type="checkbox" 
              checked={inStockOnly} 
              onChange={() => setInStockOnly(prev => !prev)} 
            />
            <label>In Stock</label>
          </div>
          
          {/* Brand Filter */}
          <div className="p-4">
            <h2>Brand</h2>
            {brands.map((brand, index) => (
              <div key={index}>
                <input 
                  type="checkbox" 
                  onChange={() => toggleFilter(setSelectedBrand, brand)} 
                  checked={selectedBrand.includes(brand)}
                />
                <label>{brand}</label>
              </div>
            ))}
          </div>

          {/* RAM Filter */}
          <div className="p-4">
            <h2>RAM</h2>
            {ram.map((ramOption, index) => (
              <div key={index}>
                <input 
                  type="checkbox" 
                  onChange={() => toggleFilter(setSelectedRam, ramOption)} 
                  checked={selectedRam.includes(ramOption)}
                />
                <label>{ramOption}</label>
              </div>
            ))}
          </div>

          {/* Storage Filter */}
          <div className="p-4">
            <h2>Storage</h2>
            {storage.map((storageOption, index) => (
              <div key={index}>
                <input 
                  type="checkbox" 
                  onChange={() => toggleFilter(setSelectedStorage, storageOption)} 
                  checked={selectedStorage.includes(storageOption)}
                />
                <label>{storageOption}</label>
              </div>
            ))}
          </div>

          {/* OS Filter */}
          <div className="p-4">
            <h2>Operating System</h2>
            {os.map((osOption, index) => (
              <div key={index}>
                <input 
                  type="checkbox" 
                  onChange={() => toggleFilter(setSelectedOs, osOption)} 
                  checked={selectedOs.includes(osOption)}
                />
                <label>{osOption}</label>
              </div>
            ))}
          </div>

          {/* Processor Filter */}
          <div className="p-4">
            <h2>Processor</h2>
            {processor.map((processorOption, index) => (
              <div key={index}>
                <input 
                  type="checkbox" 
                  onChange={() => toggleFilter(setSelectedProcessor, processorOption)} 
                  checked={selectedProcessor.includes(processorOption)}
                />
                <label>{processorOption}</label>
              </div>
            ))}
          </div>

          {/* Type Filter */}
          <div className="p-4">
            <h2>Type</h2>
            {types.map((typeOption, index) => (
              <div key={index}>
                <input 
                  type="checkbox" 
                  onChange={() => toggleFilter(setSelectedType, typeOption)} 
                  checked={selectedType.includes(typeOption)}
                />
                <label>{typeOption}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 px-4">
          <div className="navbar flex flex-col md:flex-row gap-2 bg-base-100 rounded-lg md:p-4 justify-between">
            <p className='text-xl'>{title}</p>
            <div className='flex-row gap-2'>
              <p>Sort By:</p>
              <select
                className="select select-ghost w-1/2 max-w-xs border border-gray-400"
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
              <div key={data._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                <Link to={`/productDetails/${data._id}`}>
                  <img src={data.image} alt={data.model} className="w-full h-40 object-cover" />
                </Link>
                <div className="p-4">
                  <Link to={`/productDetails/${data._id}`}>
                    <h3 className="text-lg font-bold mb-2 hover:text-red-500 hover:underline">
                      {data.brand} - {data.model}
                    </h3>
                  </Link>
                  <p className="text-gray-700">Processor: {data.processor}</p>
                  <p className="text-gray-700">RAM: {data.ram}</p>
                  <p className="text-gray-700">Storage: {data.storage}</p>
                  <p className="text-gray-700">OS: {data.os}</p>
                  <div className='border border-gray-300 my-4'></div>
                  <p className="text-xl font-semibold mt-4 text-center text-red-600">{data.price} BDT</p>
                  <div className='my-4'>
                    <CartButton prodId={data._id} />
                  </div>
                  <div className='border border-gray-300 my-4'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
