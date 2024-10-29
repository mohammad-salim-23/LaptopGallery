import React from 'react';
import ShopLayout from '../../Components/Shared/ShopLayout/ShopLayout';
import useLaptops from '../../hooks/useLaptops';

const Laptops = () => {
    const [laptops,refetch] = useLaptops();
    console.log(laptops)
    return (
        <div>
            <ShopLayout  items={laptops} title="laptop"></ShopLayout>
        </div>
    );
};

export default Laptops;