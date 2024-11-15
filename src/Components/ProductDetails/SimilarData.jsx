
const SimilarData = ({ product }) => {
    return (
        <div className="w-80 h-[500px] p-4 bg-white shadow-md rounded-xl hover:shadow-xl mt-6 md:mt-3 lg:mt-0 flex flex-col">
            <a href={`/productDetails/${product._id}`}>
                <img
                    src={product.images.img1 || "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
                    className="rounded-xl h-52 duration-1000 hover:scale-105"
                    alt={product.title}
                />
            </a>
            <div className="p-2 flex-grow flex flex-col">
                <a href={`/productDetails/${product._id}`}>
                    <span className="text-xl hover:underline hover:cursor-pointer mb-2">
                        {product.title}
                    </span>
                </a>
                <div className="flex items-center">
                    <ul className="list-disc ml-4 mt-2">
                        <li><span className="text-gray-600">Model -</span> {product.model || "N/A"}</li>
                        <li><span className="text-gray-600">Brand -</span> {product.brand || "N/A"}</li>
                    </ul>
                </div>
                <div className="text-xl font-semibold mt-2">
                    <p className="text-rose-600 p-1 rounded-lg hover:text-primary text-center">
                        <span className="font-semibold">Price:</span> {product.price || "N/A"}
                    </p>
                </div>
            </div>
            {/* Button at the bottom */}
            <div className="mt-auto">
                <a href={`/productDetails/${product._id}`}>
                    <div className="btn hover:outline text-[16px] bg-primary hover:bg-transparent text-white hover:text-black text-center py-2 rounded-lg">
                        View Details
                    </div>
                </a>
            </div>
        </div>

    );
};

export default SimilarData;