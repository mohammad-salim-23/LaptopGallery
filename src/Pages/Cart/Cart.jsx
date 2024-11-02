import React, { useState } from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

const Cart = () => {
    // State to manage cart items
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Laptop Model XYZ',
            specs: '8GB RAM, 512GB SSD',
            price: 999,
            quantity: 1,
            image: 'https://via.placeholder.com/100',
        },
        {
            id: 2,
            name: 'Laptop Model XYZ',
            specs: '8GB RAM, 512GB SSD',
            price: 999,
            quantity: 1,
            image: 'https://via.placeholder.com/100',
        },
        
    ]);

    // Function to handle quantity change
    const handleQuantityChange = (id, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity + change, 1) }
                    : item
            )
        );
    };

    // Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // Example tax calculation
    const shipping = 15; // Flat shipping fee
    const total = subtotal + tax + shipping;

    return (
        <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600">Items in your cart</h2>

                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-200">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded" />

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                                        <p className="text-gray-500">Specifications: {item.specs}</p>
                                        <span className="text-gray-700 font-bold">${item.price}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {/* Quantity Controls */}
                                        <button
                                            className="text-2xl hover:text-gray-600 border-gray-300"
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                        >
                                            <CiSquareMinus />
                                        </button>
                                        <span className="text-gray-700 text-xl font-semibold">{item.quantity}</span>
                                        <button
                                            className="text-2xl hover:text-gray-600 border-gray-300"
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                        >
                                            <CiSquarePlus />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Summary Section */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600">Order Summary</h2>

                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-700 font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Tax</span>
                            <span className="text-gray-700 font-semibold">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-700 font-semibold">${shipping.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between border-t border-gray-200 pt-4 mb-4">
                            <span className="text-xl font-semibold text-gray-700">Total</span>
                            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;



// import React from 'react';
// import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

// const Cart = () => {
//     return (
//         <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
//             <div className="container mx-auto">
//                 <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Your Cart</h1>

//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Cart Items Section */}
//                     <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-xl font-semibold mb-4 text-gray-600">Items in your cart</h2>

//                         <div className="space-y-4">
//                             {/* Cart Item */}
//                             <div className="flex items-center gap-4 p-4 border-b border-gray-200">
//                                 <img src="https://via.placeholder.com/100" alt="Laptop" className="w-24 h-24 rounded" />

//                                 <div className="flex-1">
//                                     <h3 className="text-lg font-semibold text-gray-700">Laptop Model XYZ</h3>
//                                     <p className="text-gray-500">Specifications: 8GB RAM, 512GB SSD</p>
//                                     <span className="text-gray-700 font-bold">$999</span>
//                                 </div>

//                                 <div className="flex items-center gap-2">
//                                     {/* Quantity Controls */}
//                                     <button className="text-2xl hover:text-gray-600 border-gray-300">
//                                         <CiSquareMinus />
//                                     </button>
//                                     <span className="text-gray-700 text-xl font-semibold">1</span>
//                                     <button className="text-2xl hover:text-gray-600 border-gray-300">
//                                         <CiSquarePlus />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Repeat Cart Item here for additional items */}
//                         </div>
//                     </div>

//                     {/* Cart Summary Section */}
//                     <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-xl font-semibold mb-4 text-gray-600">Order Summary</h2>

//                         <div className="flex justify-between mb-2">
//                             <span className="text-gray-600">Subtotal</span>
//                             <span className="text-gray-700 font-semibold">$999</span>
//                         </div>
//                         <div className="flex justify-between mb-2">
//                             <span className="text-gray-600">Tax</span>
//                             <span className="text-gray-700 font-semibold">$50</span>
//                         </div>
//                         <div className="flex justify-between mb-4">
//                             <span className="text-gray-600">Shipping</span>
//                             <span className="text-gray-700 font-semibold">$15</span>
//                         </div>

//                         <div className="flex justify-between border-t border-gray-200 pt-4 mb-4">
//                             <span className="text-xl font-semibold text-gray-700">Total</span>
//                             <span className="text-xl font-bold text-gray-900">$1064</span>
//                         </div>

//                         <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">
//                             Proceed to Checkout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;
