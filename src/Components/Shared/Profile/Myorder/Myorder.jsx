import React from 'react';
import usePayments from '../../../../hooks/usePayments';
import useAuth from '../../../../hooks/useAuth';
import { FcCancel, FcOk } from "react-icons/fc";

const Myorder = () => {
    const [payment] = usePayments();
    const { user } = useAuth();
    const date = new Date().toLocaleDateString();

    // Filter payments for the current user by email
    const myPayments = payment?.filter(p => p.cusEmail === user?.email);

    // console.log(myPayments); // Debugging step to check data structure

    return (
        <div className="md:container md:mx-auto md:p-4">
            <h2 className="text-2xl font-semibold my-10 text-gray-700 flex justify-center items-center">----Orders----</h2>
            <div className="overflow-x-auto lg:flex justify-center space-y-4 gap-4">
                {myPayments?.length === 0 ? (
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
                                {myPayments.map((order, orderIndex) => {
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
                                                                    Unpaid
                                                                    <FcCancel className="mt-1 ml-1" />
                                                                </div>
                                                            </>

                                                        )}
                                                    </td>
                                                    {productIndex === 0 && (
                                                        <>
                                                            <td rowSpan={numberOfProducts} className="border border-gray-300 px-4 py-2 text-center">
                                                                {order.totalAmount} BDT
                                                            </td>
                                                            <td rowSpan={numberOfProducts} className="border border-gray-300 px-4 py-2 text-center">
                                                                {order.date}
                                                            </td>
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
        </div>
    );
};

export default Myorder;
