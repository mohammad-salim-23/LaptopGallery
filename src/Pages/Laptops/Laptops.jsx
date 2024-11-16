import React from 'react';


import useProducts from '../../hooks/useProducts';
import ShopLayout from '../../Components/ReUseComponents/ShopLayout/ShopLayout';

const Laptops = () => {
    document.title = `Laptop Gallery || Laptop`;
    const [products, refetch] = useProducts();
    // console.log(products);
    const laptops = products.filter(item => item.type === "Laptop")
    return (
        <div>
            <ShopLayout items={laptops} title="Laptop"></ShopLayout>
        </div>
    );
};

export default Laptops;