import React from 'react';
import usePayments from '../../../../hooks/usePayments';
import useAuth from '../../../../hooks/useAuth';

const Myorder = () => {
    const [payment] = usePayments();
    const { user } = useAuth();
  const date = new Date().toLocaleDateString();
    // Filter payments for the current user by email
    const myPayments = payment?.filter(p => p.cusEmail === user?.email);

    return (
        <div >
              <h2 className="text-2xl font-semibold  my-10 text-gray-700 flex justify-center items-center">----Orders----</h2>
           <div className="overflow-x-auto lg:flex justify-between space-y-4 gap-4">
           {myPayments?.length === 0 ? (
                <div className="text-center my-4 lg:w-[60%]">
                    <h3 className="text-lg font-semibold">
                        No products found for your orders.
                    </h3>
                </div>
            ) : (
                <table className="table w-full border border-gray-300">
                    {/* Table Head */}
                    <thead className="bg-base-200 text-gray-400">
                        <tr>
                            <th className="border border-gray-300">Transaction ID</th>
                            <th className="border border-gray-300">Product</th>
                            <th className="border border-gray-300">Status</th>
                            <th className="border border-gray-300">Total Amount</th>
                            <th className="border border-gray-300">Date</th>
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
                                                <>
                                                    <td rowSpan={numberOfProducts} className="border border-gray-300">
                                                        {order.transactionId}
                                                    </td>
                                                </>
                                            )}
                                            <td className="border border-gray-300">
                                                {product.model} ({product.brand})
                                            </td>
                                            <td className="border border-gray-300">
                                                {order.paidStatues ? "Paid" : "Unpaid"}
                                            </td>
                                            {productIndex === 0 && (
                                                <>
                                                    <td rowSpan={numberOfProducts} className="border border-gray-300">
                                                        {order.totalAmount} BDT
                                                    </td>
                                                    <td rowSpan={numberOfProducts} className="border border-gray-300">
                                                        {date}
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
            )}
           </div>
        </div>
    );
};

export default Myorder;
