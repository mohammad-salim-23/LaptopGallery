import usePayments from "../../../../hooks/usePayments";
import React, { useState } from "react";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import Search from "../../../../Components/Shared/NavBar/Search";
const AllPayment = () => {
    const [payment] = usePayments();
    const [activePayment, setActivePayment] = useState(null);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);


    // console.log(payment)

    // Pagination calculations
    const totalPages = Math.ceil(payment.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPayment = payment.slice(startIndex, startIndex + itemsPerPage);

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

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

    return (
        <div className="md:container md:mx-auto md:p-4">

            <h2 className="text-2xl font-semibold my-10 text-gray-700 flex justify-center items-center">
                ----Payment History----
            </h2>
            <div className="overflow-x-auto lg:flex justify-center space-y-4 gap-4">
                {payment?.length === 0 ? (
                    <div className="text-center my-4 lg:w-[60%]">
                        <h3 className="text-lg font-semibold">
                            No products found for your orders.
                        </h3>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full table-auto border border-gray-300">
                            {/* Table Head */}
                            <thead className="bg-base-200 text-gray-600">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        User Email
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        Product
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        Status
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        Total Amount
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {currentPayment.map((order, orderIndex) => {
                                    const numberOfProducts = order.cart.length;

                                    return (
                                        <React.Fragment key={`order-${orderIndex}`}>
                                            {order.cart.map((product, productIndex) => (
                                                <tr key={`product-${productIndex}`}>
                                                    {productIndex === 0 && (
                                                        <td
                                                            rowSpan={numberOfProducts}
                                                            className="border border-gray-300 px-4 py-2 text-center"
                                                        >
                                                            {order.cusEmail}
                                                        </td>
                                                    )}
                                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                                        {product.model} ({product.brand})
                                                    </td>

                                                    <td className={`border border-gray-300 px-4 py-2 text-center font-bold ${order.paidStatues ? 'text-green-500' : 'text-red-500'}`}>
                                                        {order.paidStatues ? (
                                                            <>
                                                                <div className='flex ml-10'>
                                                                    Paid
                                                                    <FcOk className='mt-1 ml-2' />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className='flex ml-10'>
                                                                    Failed
                                                                    <FcCancel className="mt-1 ml-1" />
                                                                </div>
                                                            </>

                                                        )}
                                                    </td>
                                                    {productIndex === 0 && (
                                                        <>
                                                            <td
                                                                rowSpan={numberOfProducts}
                                                                className="border border-gray-300 px-4 py-2 text-center"
                                                            >
                                                                {order.totalAmount} BDT
                                                            </td>
                                                            <th
                                                                rowSpan={numberOfProducts}
                                                                className="border border-gray-300 px-4 py-2 text-center"
                                                            >
                                                                <button
                                                                    className="rounded-lg btn py-2 px-4 border bg-primary text-white hover:text-black"
                                                                    onClick={() => setActivePayment(order)}
                                                                >
                                                                    Details
                                                                </button>
                                                            </th>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
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

            {/* Modal */}
            {activePayment && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

                    {/* Modal Content */}
                    <div className="relative w-[90%] md:w-[700px] bg-white rounded-lg shadow-lg z-20">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                            <div>

                            </div>
                            <button
                                onClick={() => setActivePayment(null)}
                                className="text-gray-500 text-2xl hover:text-red-600 transition-transform transform hover:scale-110"
                                aria-label="close"
                            >
                                ❌
                            </button>
                        </div>


                        <div className="p-6 space-y-4">
                            {/* Customer Info */}
                            <h3 className="text-3xl text-center font-semibold text-gray-800">
                                Payment Details
                            </h3>
                            <div className="space-y-2">
                                <h4 className="text-lg font-medium text-gray-700">
                                    Customer Information
                                </h4>
                                <p className="text-sm text-gray-600">
                                    <strong>Name:</strong> {activePayment.cusName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Email:</strong> {activePayment.cusEmail}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Phone:</strong> {activePayment.cusPhone}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Address:</strong> {activePayment.streetAddress},{" "}
                                    {activePayment.district}, {activePayment.division} -{" "}
                                    {activePayment.zipCode}
                                </p>
                            </div>

                            {/* Order Info */}
                            <div className="space-y-2">
                                <h4 className="text-lg font-medium text-gray-700">
                                    Order Information
                                </h4>
                                <p className="text-sm text-gray-600">
                                    <strong>Transaction ID:</strong> {activePayment.transactionId}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Date:</strong> {activePayment.date}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Total Amount:</strong> {activePayment.totalAmount} BDT
                                </p>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-2">
                                <h4 className="text-lg font-medium text-gray-700">
                                    Products
                                </h4>
                                <ul className="text-sm text-gray-600 list-disc pl-6">
                                    {activePayment.cart.map((product, index) => (
                                        <li key={index}>
                                            {product.model} ({product.brand}) - {product.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPayment;
