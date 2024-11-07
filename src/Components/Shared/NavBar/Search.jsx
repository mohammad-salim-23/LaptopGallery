import { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Search = () => {

    const [products] = useProducts();


    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((prod) =>
        prod.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // console.log(filteredProducts)

    const handleClick = () => {
      setSearchTerm("");
    };

    return (
        <div>
            <div className="hidden w-[400px] lg:flex">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full text-gray-500 pl-8 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute cursor-pointer inset-y-0 left-2 flex items-center text-gray-500">
                    <CiSearch size={18} />
                </span>
            </div>

            {searchTerm && (
                <div className="absolute top-full p-2 space-y-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-auto z-50">
                    {filteredProducts.length > 0 ? (
                        <>
                            {filteredProducts.map((result) => {
                                const truncateName = (brand, charLimit) => {
                                    if (brand.length > charLimit) {
                                        return brand.slice(0, charLimit) + "...";
                                    }
                                    return brand;
                                };

                                return (
                                    <Link
                                        to={`/productDetails/${result._id}`}
                                        key={result._id}
                                        className="flex justify-start items-center gap-4 ml-2 p-2 shadow-lg rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={handleClick}
                                    >
                                        <section className="w-1/3">
                                            <img
                                                src={result.image}
                                                alt={result.brand}
                                                className="w-full h-24 object-cover rounded-md"
                                            />
                                        </section>

                                        <section className="w-2/3 text-sm space-y-1">
                                            <p className="font-bold text-base">
                                                {truncateName(result.brand, 16)}{" "}
                                            </p>
                                            <p className="text-base font-semibold">
                                                {result.price} $
                                            </p>
                                            <p className="text-gray-600">{result.subCategory}</p>
                                            <p className="text-green-600">{result.price}</p>
                                        </section>
                                    </Link>
                                );
                            })}
                        </>
                    ) : (
                        <p className="text-gray-500 px-3 py-2">No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;