import React from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { div } from 'framer-motion/client';
import { MdCompareArrows } from 'react-icons/md';
import CartButton from '../ReUseComponents/CartButton';
import DetailsTab from './DetailsTab';
import { Toaster } from 'react-hot-toast';


const ProductsDetails = () => {
    const { id } = useParams();
    const [products, refetch] = useProducts();

   
    const product = products.find(p => p._id === id);

   
    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
       <div className='my-10'>
          <div><Toaster
             position="top-right"/></div>
         <div className="max-w-4xl mx-auto p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg mt-10">
                {/* Product Image */}
                <div className="flex justify-center items-center">
                    <img 
                        src={product.image} 
                        alt={product.model} 
                        className="w-full h-80 object-cover rounded-lg shadow-md"
                    />
                </div>
                
                {/* Product Details */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.model}</h1>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Brand:</span> {product.brand}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Processor:</span> {product.processor}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">RAM:</span> {product.ram}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Storage:</span> {product.storage}</p>
                    {product.camera && (
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Camera:</span> {product.camera}
                        </p>
                    )}
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Display:</span> {product.display}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Color:</span> {product.color}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Operating System:</span> {product.os}</p>
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Status:</span> {product.status}</p>
                    <p className="text-xl font-semibold text-blue-600">Price: {product.price}</p>
                   
                        <div className='flex justify-between'>
                        <div className='my-4  '><CartButton  prodId={product._id} ></CartButton></div>
                        <div className='my-4'>  <button className=' bg-gray-800 text-white rounded-lg p-2 flex justify-center items-center' > <span><MdCompareArrows /> </span>Compare</button></div>
                        </div>
                       
             
           
                       
                       
                </div>
            </div>
        </div>
        <div>
            <DetailsTab  reviewId ={product._id} productDescription = {product.description}></DetailsTab>
        </div>
       
       </div>
    );
};

export default ProductsDetails;
