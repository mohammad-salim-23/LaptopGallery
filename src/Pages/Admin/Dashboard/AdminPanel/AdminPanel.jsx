import React from 'react';
import usePayments from "../../../../hooks/usePayments";
import { FaShoppingCart, FaDollarSign, FaLaptop, FaMobileAlt, FaHeadphones, FaTabletAlt } from 'react-icons/fa';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const AdminPanel = () => {
    const [payments] = usePayments();
    
   
    let totalOrderAmount = 0;
    let totalOrderQuantity = 0;
    let totalLaptopQuantity = 0;
    let totalMobileQuantity = 0;
    let totalMobileAccessoryQuantity = 0;
    let totalLaptopAccessoryQuantity = 0;

   
    payments.forEach(payment => {
        payment.cart.forEach(item => {
            const price = parseFloat(item.price.replace(" BDT", ""));
            const quantity = item.quantity;

           
            totalOrderAmount += price * quantity;

           
            totalOrderQuantity += quantity;

           
            const subCategory = item.subCategory;
            const category = item.type;

            if (subCategory === 'laptop') {
                totalLaptopQuantity += quantity;
            } else if (category === 'mobile') {
                totalMobileQuantity += quantity;
            } else if (subCategory === 'Mobile Accessories') {
                totalMobileAccessoryQuantity += quantity;
            } else if (subCategory === 'Laptop Accessories') {
                totalLaptopAccessoryQuantity += quantity;
            }
        });
    });

    // Data for the pie chart
    const data = [
        { name: 'Laptops', value: totalLaptopQuantity * 1000000 }, 
        { name: 'Mobiles', value: totalMobileQuantity * 1000000 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <div className="bg-gray-800 p-6 rounded-lg flex items-center text-white">
                    <FaDollarSign className="text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Order Amount</h3>
                        <p>{totalOrderAmount.toFixed(2)} BDT</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center text-white">
                    <FaShoppingCart className="text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Order Quantity</h3>
                        <p>{totalOrderQuantity}</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center text-white">
                    <FaLaptop className="text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Laptop Quantity</h3>
                        <p>{totalLaptopQuantity}</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center text-white">
                    <FaMobileAlt className="text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Mobile Quantity</h3>
                        <p>{totalMobileQuantity}</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center text-white">
                    <FaHeadphones className="text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Mobile Accessory Quantity</h3>
                        <p>{totalMobileAccessoryQuantity}</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center text-white">
                    <FaTabletAlt className="text-3xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Laptop Accessory Quantity</h3>
                        <p>{totalLaptopAccessoryQuantity}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 flex justify-center items-center">
                <div className='p-10'>
                    <h2 className="text-lg font-semibold mb-4 text-center">Sales Distribution</h2>
                    <PieChart width={600} height={400}>
                        <Pie
                            data={data}
                            cx={300} 
                            cy={200} 
                            labelLine={false}
                           
                            outerRadius={120} 
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
