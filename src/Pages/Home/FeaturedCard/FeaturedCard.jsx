import React from 'react'
import useProducts from '../../../hooks/useProducts'
import { Link, NavLink } from 'react-router-dom'
import CartButton from '../../../Components/ReUseComponents/CartButton'

const FeaturedCard = () => {
    const [product] = useProducts();
    const laptops = product.filter(item => item.type === "laptop")
    const products = laptops.slice(1, 9)

    return (
        <div className="container mx-auto p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-6 mt-4 ">
            {products.map(data => (
                <div key={data._id} className="w-full py-4 bg-white shadow-lg rounded-lg flex flex-col border">
                    <Link to={`/productDetails/${data._id}`} className="block">
                        <img src={data.images.img1} alt={data.model} className="rounded-xl  h-40 lg:h-56  p-4 lg:p-2 lg:duration-1000 lg:hover:scale-105 mb-2" />
                    </Link>
                    {/* Fixed height for content area */}
                    < div className="flex-grow flex flex-col justify-between p-2" >
                        <div>
                            <Link to={`/productDetails/${data._id}`}>
                                <h3 className="text-[16px] font-semibold lg:text-xl hover:underline hover:cursor-pointer mb-2">
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
                        <div className="flex mt-4 gap-x-2">
                            <NavLink to={`/productDetails/${data._id}`}>
                                <button className="btn w-[60px] md:w-auto text-[10px] md:text-[12px] lg:text-[14px] bg-primary text-white py-1 md:py-2 px-2 md:px-4 rounded-lg hover:bg-transparent hover:text-primary border border-primary transition-all whitespace-nowrap">
                                    See More
                                </button>
                            </NavLink>
                            <CartButton prodId={data._id} />
                        </div>


                    </div>
                </div>
            ))}
        </div>

    )
}

export default FeaturedCard
