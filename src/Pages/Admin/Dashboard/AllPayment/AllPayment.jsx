import usePayments from "../../../../hooks/usePayments";
import React, { useState } from 'react';
const AllPayment = () => {
    const [payment] = usePayments();
    const [activeComplain, setActiveComplain] = useState(null);

    return (
        <div className="md:container md:mx-auto md:p-4">
            <h2 className="text-2xl font-semibold my-10 text-gray-700 flex justify-center items-center">----Orders----</h2>
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
                                    <th className="border border-gray-300 px-4 py-2 text-center">Transaction ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Product</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Total Amount</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Date</th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {payment.map((order, orderIndex) => {
                                    const numberOfProducts = order.cart.length;

                                    return (
                                        <React.Fragment key={`order-${orderIndex}`}>
                                            {order.cart.map((product, productIndex) => (
                                                <tr key={`product-${productIndex}`}>
                                                    {productIndex === 0 && (
                                                        <td rowSpan={numberOfProducts} className="border border-gray-300 px-4 py-2 text-center">
                                                            {order.transactionId}
                                                        </td>
                                                    )}
                                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                                        {product.model} ({product.brand})
                                                    </td>
                                                    <td className={`border border-gray-300 px-4 py-2 text-center font-bold ${order.paidStatues ? 'text-green-500' : 'text-red-500'}`}>
                                                        {order.paidStatues ? "Paid" : "Unpaid"}
                                                    </td>
                                                    {productIndex === 0 && (
                                                        <>
                                                            <td rowSpan={numberOfProducts} className="border border-gray-300 px-4 py-2 text-center">
                                                                {order.totalAmount} BDT
                                                            </td>
                                                            <td rowSpan={numberOfProducts} className="border border-gray-300 px-4 py-2 text-center">
                                                                {/* {date} */}
                                                            </td>
                                                        </>
                                                    )}

                                                    <th>
                                                        <button className="btn btn-ghost border border-black hover:bg-primary" onClick={() => setActiveComplain(order)}>details</button>
                                                    </th>
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

            {/* Modal */}
            {activeComplain && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm animate-fadeIn "></div>
                    <div className="relative w-[900px] bg-white text-black rounded-2xl border-none shadow-lg z-20 animate-fadeIn">

                        <div className="text-3xl mt-4 text-center font-bold">Complain Details</div>

                        <div className="p-6">
                            <p className="mb-4">Dear Admin,</p>
                            {/* <p>{activeComplain.complainDescription}</p> */}
                            <div className="mt-6">
                                {/* <h1>{activeComplain.customerName}</h1> */}
                                {/* <p>{activeComplain.customerEmail}</p> */}
                                {/* <h1>Date: {activeComplain.submitDate}</h1> */}
                                {/* <h2>Time: {activeComplain.submitTime}</h2> */}
                            </div>
                        </div>

                        <button
                            onClick={() => setActiveComplain(null)}
                            aria-label="close"
                            className="absolute top-5 text-xl right-5   p-2 rounded-2xl   text-gray-500   transition-transform transform hover:scale-110"
                        >
                            ❌
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPayment;