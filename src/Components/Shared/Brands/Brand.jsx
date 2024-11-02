import React from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import ShopLayout from '../../ReUseComponents/ShopLayout/ShopLayout';


const Brand = () => {
    const { brand } = useParams();
    const [products, refetch] = useProducts();

  
    const filteredProducts = products.filter(
        product => product.brand.toLowerCase() === brand.toLowerCase()
    );

    console.log( filteredProducts); 
    refetch();
    return (
        <div>
           <ShopLayout items={filteredProducts} title={brand} ></ShopLayout>
        </div>
    );
};

export default Brand;
