import { useState } from "react";
import Swal from "sweetalert2";
import useProductsType from "../../../../hooks/useProductsType";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const TotalAccessories = () => {
    const [productsTypes, isLoading, refetch] = useProductsType("accessories");
    const axiosPublic = useAxiosPublic();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Delete accessory data
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure you want to delete this accessory?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/products/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your accessory has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                });
            }
        });
    };

    // Pagination calculations
    const totalPages = Math.ceil(productsTypes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = productsTypes.slice(startIndex, startIndex + itemsPerPage);

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
    const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - (maxVisiblePages - 1));
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    if (isLoading) return <span className="loading loading-ring loading-lg text-red-400 text-center"></span>;

    return (
        <div className="mx-auto container">
            <h1 className="text-center text-3xl font-bold my-10">Total Accessories {productsTypes.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-[16px]">
                            <th>Image/Name</th>
                            <th>Model</th>
                            <th>ProductSKU</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product) => (
                            <tr key={product._id} className="border hover:bg-blue-200">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={product.image} alt={product.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>
                                            <div className="text-sm opacity-50">{product.brand}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-sm opacity-80 font-medium">{product.model}</td>
                                <td className="font-semibold">{product.productSKU}</td>
                                <td className="font-semibold">{product.status}</td>
                                <td className="font-semibold">{product.price}</td>
                                <td>
                                    <Link to={`/dashboard/totalAccessories/${product._id}`}>
                                        <FaRegEdit className="text-2xl cursor-pointer" />
                                    </Link>
                                </td>
                                <td>
                                    <TiDeleteOutline className="text-4xl cursor-pointer" onClick={() => handleDelete(product._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 text-white bg-primary rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {getPageNumbers().map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageClick(number)}
                        className={`px-4 py-2 rounded-full ${number === currentPage ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 text-white bg-primary rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TotalAccessories;
