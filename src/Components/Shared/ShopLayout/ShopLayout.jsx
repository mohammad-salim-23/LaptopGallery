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
  const brands = [...new Set(items?.map(item => item.brand))];
  const ram= [...new Set(items?.map(item => item.ram))];
  const storage = [...new Set(items?.map(item => item.storage))];

  // just for laptops
  const os = [...new Set(items?.map(item => item.os))];
  const processor = [...new Set(items?.map(item => item.processor))];
// console.log(brands)
// console.log(processor)
  return (
    <div className='p-6 bg-base-200 my-10'>
      <div className="flex">
        {/* Sidebar menu */}
         {/*Availability  content */}
        <div className="w-64  min-h-screen p-4 bg-white rounded-lg flex flex-col">
          
           <div className=" p-4 ">
  <div tabIndex={0} role="button" className="cursor-pointer">Availability</div>
  <div className="divider"></div>
  <ul tabIndex={0} className=" p-2">
    <div className="flex  items-center gap-4">
    <div className=""><input type="checkbox" name="Instock"  /> 
      </div>
      <div>
     <span>In Stock</span>
     </div>
    </div>
  
    <div className="flex  items-center gap-2">
    <div className="gap-2"><input type="checkbox" name="Outstock"  /> 
     </div> <div>
     <span>Out Of Stock</span>
     </div>
    </div>
    
  </ul>
</div>

 {/*Brand  content */}
 <div className=" p-4">
  <div tabIndex={0} role="button" className="cursor-pointer">Brand</div>
  <div className="divider"></div>
      
  <ul tabIndex={0} className=" p-2  gap-4">
    {brands.map((item, index) => (
      <div className="flex items-center gap-4" key={index}>
        <div className="">
          <input type="checkbox" name={item} />
        </div>
        <div>
          <span>{item}</span>
        </div>
      </div>
    ))}
  </ul>
       
 </div>
 {/*ram  content */}
 <div className=" p-4">
  <div tabIndex={0} role="button" className="cursor-pointer">Ram</div>
  <div className="divider"></div>
      
  <ul tabIndex={0} className=" p-2  gap-4">
    {ram.map((item, index) => (
      <div className="flex items-center gap-4" key={index}>
        <div className="">
          <input type="checkbox" name={item} />
        </div>
        <div>
          <span>{item}</span>
        </div>
      </div>
    ))}
  </ul>
       
 </div>
 {/*storage  content */}
 <div className=" p-4">
  <div tabIndex={0} role="button" className="cursor-pointer">Storage</div>
  <div className="divider"></div>
      
  <ul tabIndex={0} className=" p-2  gap-4">
    {storage.map((item, index) => (
      <div className="flex items-center gap-4" key={index}>
        <div className="">
          <input type="checkbox" name={item} />
        </div>
        <div>
          <span>{item}</span>
        </div>
      </div>
    ))}
  </ul>
       
 </div>
  {/*  OS and Processor  */}
 
              <div className="p-4">
                <div tabIndex={0} role="button" className="cursor-pointer">Operating System</div>
                <div className="divider"></div>
                <ul tabIndex={0} className="p-2 gap-4">
                  {os.map((item, index) => (
                    <div className="flex items-center gap-4" key={index}>
                      <div className="">
                        <input type="checkbox" name={item} />
                      </div>
                      <div>
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="p-4">
                <div tabIndex={0} role="button" className="cursor-pointer">Processor</div>
                <div className="divider"></div>
                <ul tabIndex={0} className="p-2 gap-4">
                  {processor.map((item, index) => (
                    <div className="flex items-center gap-4" key={index}>
                      <div className="">
                        <input type="checkbox" name={item} />
                      </div>
                      <div>
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
           

        </div>
       
        
        <div className="flex-1 px-4 ">
          {/* Sorting Navbar */}
          <div className="navbar bg-base-100 rounded-lg p-4 justify-between">
            <div>
              <p className='text-xl'>{title}</p>
            </div>
            <div className='flex gap-2'>
              <p className='text-xl'>Sort By:</p>
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
             <Link to={`/productDetails/${data._id}`}> <div key={data._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
             <img src={data.image} alt={data.model} className="w-full h-40 object-cover" />
             <div className="p-4">
               <h3 className="text-lg font-bold mb-2">{data.brand} - {data.model}</h3>
               <p className="text-gray-700">Processor: {data.processor}</p>
               <p className="text-gray-700">RAM: {data.ram}</p>
               <p className="text-gray-700">Storage: {data.storage}</p>
               <p className="text-gray-700">Graphics: {data.graphics}</p>
               <p className="text-gray-700">OS: {data.os}</p>
               <div className='border border-gray-300 my-4'></div>
               <p className="text-xl font-semibold mt-4 text-center text-red-600">{data.price}</p>
               <div className='border border-gray-300 my-4'></div>
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