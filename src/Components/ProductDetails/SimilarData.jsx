
import { Link, NavLink } from "react-router-dom";

const SimilarData = ({ product }) => {
    return (
        <div>
            <div class="w-80 border h-[500px]  p-4 bg-white shadow-md rounded-xl hover:shadow-xl">
                <a href="#" className="">
                    <Link to={`/productDetails/${product._id}`}>
                        <img src={product.image || "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" } className="rounded-xl h-52 duration-1000 hover:scale-105" />
                    </Link>
                    <div class="p-2 w-72">
                        <Link to={`/productDetails/${product._id}`}>
                            <span class="text-indigo-500  text-xl hover:underline hover:cursor-pointer hover:text-indigo-600 mb-2">{product.title}</span>
                        </Link>
                        <div class="flex items-center">
                            <ul className='list-disc ml-4 mt-2'>
                                <li><span className="text-gray-600">Model -</span> {product.model || "N/A"}</li>
                                <li><span className="text-gray-600">Brand -</span> {product.brand || "N/A"}</li>
                            </ul>
                        </div>
                        {/* Price */}
                        <div className='text-xl  font-semibold   mt-2'>
                            <p className="  text-blue-600 p-1 rounded-lg hover:text-primary text-center">
                                <span className="font-semibold">Price:</span> {product.price || "N/A"}
                            </p>
                        </div>

                        {/* Button */}
                        <Link to={`/productDetails/${product._id}`}>
                            <div className='text-center mt-3'>
                                <div className='btn hover:outline text-[16px] bg-primary hover:bg-transparent text-white hover:text-black'>
                                    View Details
                                </div>
                            </div>
                        </Link>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default SimilarData;