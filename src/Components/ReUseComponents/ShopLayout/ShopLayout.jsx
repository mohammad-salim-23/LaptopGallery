import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../CartButton';
import { CiFilter } from "react-icons/ci";

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

  const isAccessory = selectedSubcategory.includes("Laptop Accessories") || selectedSubcategory.includes("Mobile Accessories");

  const sortedItems = [...items]
    .filter(item =>
      (!inStockOnly || item.status) &&
      (selectedBrand.length === 0 || selectedBrand.includes(item.brand)) &&
      (isAccessory || selectedRam.length === 0 || selectedRam.includes(item.ram)) &&
      (isAccessory || selectedStorage.length === 0 || selectedStorage.includes(item.storage)) &&
      (isAccessory || selectedOs.length === 0 || selectedOs.includes(item.os)) &&
      (isAccessory || selectedProcessor.length === 0 || selectedProcessor.includes(item.processor)) &&
      (selectedSubcategory.length === 0 || selectedSubcategory.includes(item.subCategory))
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
  const subcategories = [...new Set(items.map(item => item.subCategory))];
  const ram = [...new Set(items.map(item => item.ram))];
  const storage = [...new Set(items.map(item => item.storage))];
  const os = [...new Set(items.map(item => item.os))];
  const processor = [...new Set(items.map(item => item.processor))];

  return (
    <div className="p-6 bg-base-200 my-24">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-30 w-64 bg-white transform md:translate-x-0 transition-transform duration-300 ease-in-out md:flex md:relative md:flex-col`}>
          <div className="p-4">
            <h2>Availability</h2>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(prev => !prev)}
            />
            <label>In Stock</label>
          </div>

          <div className="p-4">
            <h2>Subcategory</h2>
            {subcategories.map((subcat, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter(setSelectedSubcategory, subcat)}
                  checked={selectedSubcategory.includes(subcat)}
                />
                <label>{subcat}</label>
              </div>
            ))}
          </div>

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

          {!isAccessory && (
            <>
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
            </>
          )}
        </div>

        <div className="flex-1 px-4">
          <div className="navbar flex flex-col md:flex-row gap-2 bg-base-100 rounded-lg md:p-4 justify-between">
            <button className="md:hidden" onClick={() => setSidebarVisible(!sidebarVisible)}>
              <CiFilter /> Filtering
            </button>
            <p className='text-xl hidden md:block'>{title}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {sortedItems.map((data) => (
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


                  {/* Conditional Display */}
                  {title === "Accessories" ? (
                    <>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">Sub-Category:</span> {data.subCategory}</p>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">SKU:</span> {data.productSKU}</p>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">Stock:</span> {data.stock}</p>

                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">Processor:</span> {data.processor}</p>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">RAM:</span> {data.ram}</p>
                      <p className="text-gray-600 mb-2"><span className="font-semibold">Storage:</span> {data.storage}</p>

                      <p className="text-gray-600 mb-2"><span className="font-semibold">Display:</span> {data.display}</p>


                    </>
                  )}

                  <div className='border border-gray-300 my-4'></div>
                  <p className="text-xl font-semibold mt-4 text-center text-red-600">{data.price} BDT</p>
                  <div className='my-4'><CartButton prodId={data._id} ></CartButton></div>
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
