import React from 'react';


import useProducts from '../../hooks/useProducts';
import ShopLayout from '../../Components/ReUseComponents/ShopLayout/ShopLayout';

const Laptops = () => {
    const [products,refetch] = useProducts();
    // console.log(products);
    const laptops = products.filter(item => item.type === "laptop")
    return (
        <div>
            <ShopLayout items={laptops} title="Laptop"></ShopLayout>
        </div>
    );
};

export default Laptops;