import React from 'react';
import ShopLayout from '../../Components/Shared/ShopLayout/ShopLayout';

import useProducts from '../../hooks/useProducts';

const Laptops = () => {
    const [products,refetch] = useProducts();
    console.log(products);
    const laptops = products.filter(item => item.type === "laptop")
    return (
        <div>
            <ShopLayout  items={laptops} title="Laptop"></ShopLayout>
        </div>
    );
};

export default Laptops;