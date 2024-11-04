import React from 'react'
import useProducts from '../../../hooks/useProducts'
import { Link } from 'react-router-dom'
import CartButton from '../../../Components/ReUseComponents/CartButton'

const FeaturedCard = () => {
    const [product] = useProducts();
    const products = product.slice(1, 13)
    return (
        <div className='container mx-auto px-4 mt-10'>

            <h1 className='text-3xl'>Our Collection</h1>
            <div className='divider mb-10'></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {products?.map((data) => (
                    <div key={data._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <Link to={`/productDetails/${data._id}`}> <img src={data.image} alt={data.model} className="w-full h-40 object-cover" /></Link>
                        <div className="p-4">
                            <Link to={`/productDetails/${data._id}`}> <h3 className="text-lg font-bold mb-2 hover:text-red-500 hover:underline">{data.brand} - {data.model}</h3></Link>
                            <p className="text-gray-700">Processor: {data.processor}</p>
                            <p className="text-gray-700">RAM: {data.ram}</p>
                            <p className="text-gray-700">Storage: {data.storage}</p>

                            <p className="text-gray-700">OS: {data.os}</p>
                            <div className='border border-gray-300 my-4'></div>
                            <p className="text-xl font-semibold mt-4 text-center text-red-600">{data.price} BDT</p>
                            <div className='my-4'><CartButton prodId={data._id} ></CartButton></div>
                            <div className='border border-gray-300 my-4'></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center my-10'>
                <button className='btn px-8 bg-neutral text-white hover:bg-slate-900'>See All</button>
            </div>
        </div>
    )
}

export default FeaturedCard
