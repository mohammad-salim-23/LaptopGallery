import React from 'react'
import useProducts from '../../../hooks/useProducts'
import { Link, NavLink } from 'react-router-dom'
import CartButton from '../../../Components/ReUseComponents/CartButton'

const FeaturedCard = () => {
    const [product] = useProducts();
    const products = product.slice(1, 9)
    return (
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-4">
            {products.map(data => (
                <div key={data._id} className="w-full bg-white shadow-lg rounded-lg flex flex-col border">
                    <Link to={`/productDetails/${data._id}`} className="block">
                        <img src={data.image} alt={data.model} className="rounded-xl h-56 duration-1000 hover:scale-105 mb-2 mt-4 p-4" />
                    </Link>
                    {/* Fixed height for content area */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                            <Link to={`/productDetails/${data._id}`}>
                                <h3 className="text-primary text-xl hover:underline hover:cursor-pointer mb-2">
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
                                <p className="border text-rose-700 p-1 rounded-lg font-semibold">
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
                            <CartButton prodId={data._id} className="btn text-[16px] bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700" />
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default FeaturedCard
