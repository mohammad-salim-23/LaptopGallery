import React from 'react';
import ShopLayout from '../../Components/Shared/ShopLayout/ShopLayout';

import useProducts from '../../hooks/useProducts';

const Phone = () => {
    const [products,refetch] = useProducts();
    console.log(products);
    const Phone = products.filter(item => item.type === "mobile")
    return (
        <div>
            <ShopLayout  items={Phone} title="Mobile"></ShopLayout>
        </div>
    );
};

export default Phone;