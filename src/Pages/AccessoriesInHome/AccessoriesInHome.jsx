import React from 'react';
import useProducts from '../../hooks/useProducts';
import ShopLayout from '../../Components/ReUseComponents/ShopLayout/ShopLayout';

const AccessoriesInHome = () => {
    document.title = `Laptop Gallery || Accessories`;
    const [products, refetch] = useProducts();
    const filteredproduct = products?.filter(item => item.type === 'accessories');
    // console.log(filteredproduct)
    return (
        <div>
            <ShopLayout items={filteredproduct} title="Accessories"></ShopLayout>
        </div>
    );
};

export default AccessoriesInHome;