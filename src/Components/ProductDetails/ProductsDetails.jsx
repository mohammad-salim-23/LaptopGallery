import React from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { MdCompareArrows } from 'react-icons/md';
import CartButton from '../ReUseComponents/CartButton';
import DetailsTab from './DetailsTab';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useCompare from '../../hooks/useCompare';

const ProductsDetails = () => {
    const { id } = useParams();
    const [products, refetch] = useProducts();
    const { user } = useAuth();   
    const product = products.find(p => p._id === id);
    const axiosSecure = useAxiosSecure();
    const date = new Date();
    const compareDate = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    const [compare] = useCompare();

    if (!product) {
        return <div>Product not found.</div>;
    }

    const handleCompare = () => {
        const info = {
            ...product,
            userEmail: user?.email,
            date: compareDate,
            time,
            prodId: id,
        };

        if (compare?.length > 4) {
            toast.error('You have reached the limit for adding items to Compare. Remove one to add another.');
        } else {
            axiosSecure.post('/compare', info)
                .then(res => {
                    if (res.status === 200) {
                        toast.success("Go to your profile to view the compared product.");
                        refetch();
                    } else {
                        toast.error("Failed to add item to Compare");
                    }
                });
        }
    };

    return (
       <div className='my-10'>
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
                    {product.type === "accessories" ? (
                        <>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Sub-Category:</span> {product.subCategory}</p>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">SKU:</span> {product.productSKU}</p>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Stock:</span> {product.stock}</p>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Status:</span> {product.status}</p>
                    <p className="text-xl font-semibold text-blue-600">Price: {product.price}</p>
                    <div className='flex justify-between'>
                        <div className='my-4'><CartButton prodId={product._id} /></div>
                        <div className='my-4'>  
                            <button onClick={handleCompare} className='bg-gray-800 text-white rounded-lg p-2 flex justify-center items-center'>
                             Add To Compare
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <DetailsTab reviewId={product._id} productDescription={product.description} />
        </div>
       </div>
    );
};

export default ProductsDetails;
