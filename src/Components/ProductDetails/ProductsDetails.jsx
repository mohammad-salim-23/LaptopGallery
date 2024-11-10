import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import CartButton from '../ReUseComponents/CartButton';
import DetailsTab from './DetailsTab';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useCompare from '../../hooks/useCompare';
import { DiGitCompare } from "react-icons/di";
import { FaStar } from 'react-icons/fa'
import Rating from 'react-rating';
import SimilarData from './SimilarData';
import Loader from '../Shared/Loader/Loader';
import { PulseLoader } from 'react-spinners';


const ProductsDetails = () => {
    const { id } = useParams();
    const [products, refetch, isPending] = useProducts();
    const { user } = useAuth();
    const product = products.find(p => p._id === id);
    const axiosSecure = useAxiosSecure();
    const date = new Date();
    const compareDate = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    const [compare] = useCompare();


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


    const similarProducts = products.filter(
        p => p.type === product.type && p._id !== product._id
    ).slice(0, 4);


    // console.log(similarProducts)

    if (isPending) {
        return <div className='flex justify-center h-[100vh] items-center'><PulseLoader
            color={'#2C3E50'}
            loading={true}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        /></div>
    }


    if (!product) {
        return <div className='text-center my-10 text-2xl font-bold'>Product not found.</div>;
    }



    return (
        <div className='mx-auto container my-10 p-4'>
            <div className="flex flex-col md:flex-row justify-around gap-8">

                {/* Left Side */}
                <div className="w-full md:w-1/2">

                    {/* Product Image */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.model}</h1>
                        <div className="flex gap-4 mb-4 flex-col md:flex-row">

                            {/* Rating Display */}
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-600 mr-2">Rating:</span>
                                <Rating
                                    initialRating={4}
                                    readonly
                                    emptySymbol={<FaStar className="text-gray-300" />}
                                    fullSymbol={<FaStar className="text-yellow-500" />}
                                />
                            </div>
                        </div>
                        <img
                            src={product.image}
                            alt={product.model}
                            className="w-full  object-cover rounded-lg  h-full duration-1000 hover:scale-105"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 lg:mt-20 md:14 mt-6">
                    <div className="">

                        <p className="text-2xl mb-2">{product.title}</p>
                        {product.type === "accessories" ? (
                            <>
                                <div className='flex gap-4'>
                                    {/* SKU Display */}
                                    <div className='flex flex-wrap gap-2'>
                                        <p className="border hover:border-primary text-gray-600 p-1 rounded-lg hover:text-primary">
                                            <span className="font-semibold">SKU:</span> {product.productSKU}
                                        </p>
                                    </div>
                                    {/* Status */}
                                    <div className='flex flex-wrap gap-2'>
                                        <p className="border hover:border-primary text-gray-600 p-1 rounded-lg hover:text-primary">
                                            <span className="font-semibold">Status:</span> {product.status}
                                        </p>
                                    </div>
                                    {/* Brand */}
                                    <div className='flex flex-wrap gap-2'>
                                        <p className="border hover:border-primary text-gray-600 p-1 rounded-lg hover:text-primary">
                                            <span className="font-semibold">Brand:</span> {product.brand}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-xl mb-2 mt-3"><span className="font-bold">Quick Overview</span></p>
                                <ul className='list-disc ml-10'>
                                    <li><span className="text-gray-600">Model -</span> {product.model || "N/A"}</li>
                                    <li><span className="text-gray-600">Brand -</span> {product.brand || "N/A"}</li>
                                    <li><span className="text-gray-600">Color -</span> {product.color || "N/A"}</li>
                                    <li><span className="text-gray-600">Warranty -</span> {product.warranty || "N/A"}</li>
                                </ul>

                            </>
                        ) : (
                            <>
                                <div className='flex flex-wrap gap-4'>
                                    {/* SKU Display */}
                                    <div className='flex flex-wrap gap-2'>
                                        <p className="border hover:border-primary text-gray-600 p-1 rounded-lg hover:text-primary">
                                            <span className="font-semibold">SKU:</span> {product.productSKU}
                                        </p>
                                    </div>
                                    {/* Status */}
                                    <div className='flex flex-wrap gap-2'>
                                        <p className="border hover:border-primary text-gray-600 p-1 rounded-lg hover:text-primary">
                                            <span className="font-semibold">Status:</span> {product.status}
                                        </p>
                                    </div>
                                    {/* Brand */}
                                    <div className='flex flex-wrap gap-2'>
                                        <p className="border hover:border-primary text-gray-600 p-1 rounded-lg hover:text-primary">
                                            <span className="font-semibold">Brand:</span> {product.brand}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-xl mb-2 mt-3"><span className="font-bold">Quick Overview</span></p>

                                <ul className='list-disc ml-10'>
                                    <li><span className="text-gray-600">Model -</span> {product.model || "N/A"}</li>
                                    <li><span className="text-gray-600">Brand -</span> {product.brand || "N/A"}</li>
                                    <li><span className="text-gray-600">RAM -</span> {product.ram || "N/A"}</li>
                                    <li><span className="text-gray-600">Storage -</span> {product.storage || "N/A"}</li>
                                    <li><span className="text-gray-600">Color -</span> {product.color || "N/A"}</li>
                                    <li><span className="text-gray-600">Operating System -</span> {product.os || "N/A"}</li>
                                    <li><span className="text-gray-600">Display -</span> {product.display || "N/A"}</li>
                                    <li><span className="text-gray-600">Warranty -</span> {product.warranty || "N/A"}</li>
                                </ul>
                            </>
                        )}

                        <div className='flex gap-4 mt-4'>
                            {/* Price */}
                            <div className='text-xl font-semibold flex flex-wrap mt-2'>
                                <p className="border hover:border-primary text-rose-600 p-1 rounded-lg hover:text-primary">
                                    <span className="font-semibold">Price:</span> {product.price || "N/A"}
                                </p>
                            </div>
                            {/* Regular Price */}
                            <div className='text-xl font-semibold flex flex-wrap mt-2'>
                                <p className="border text-gray-500 p-1 rounded-lg">
                                    <span className="font-semibold">Regular Price:</span><span className='line-through'> {product.regularPrice || "N/A"}</span>
                                </p>
                            </div>
                        </div>

                        <div className='flex gap-4 mt-6'>
                            <div>
                                <CartButton prodId={product._id} />
                            </div>

                            <div>
                                <NavLink onClick={handleCompare} className="btn hover:outline text-[16px] bg-primary hover:bg-transparent text-white hover:text-black">
                                    <DiGitCompare className='text-xl' />
                                    Compare
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <DetailsTab reviewId={product._id} productDescription={product.description} />
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r bg-primary rounded-full my-8"></div>

            <h1 className='pl-4 text-xl md:text-2xl uppercase'>Related Products</h1>
            <div className="grid border-t-2 mt-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center p-4">
                {
                    similarProducts.map(product => (
                        <SimilarData key={product._id} product={product} />
                    ))
                }
            </div>

        </div>
    );
};

export default ProductsDetails;
