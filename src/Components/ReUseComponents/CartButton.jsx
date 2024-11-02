import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { MdShoppingCartCheckout } from 'react-icons/md';

const CartButton = ({ prodId }) => {
    // prodId sending on which components are call this components.
    const [productInfo, setProductInfo] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosPublic.get(`/products/${prodId}`);
                setProductInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [axiosPublic, prodId]);

    if (!user || !productInfo) {
        return <div>Loading...</div>;
    }

    const { email, displayName } = user;
    const { brand, price, image, model, productId } = productInfo;
    const cartInfo = { email, displayName, productId, brand, price, image, model };

    const handleAddToCart = async () => {
        try {
            const res = await axiosPublic.post("/cart", cartInfo);
            if (res.status === 200) {
                toast.success("Product added to cart");
            } else {
                toast.error("Failed to add to cart");
            }
        } catch (error) {
            toast.error("Error adding to cart");
        }
    };

    return (
        <div className='flex justify-center items-center'>
           
            <button className='btn-wide bg-gray-800 text-white rounded-lg p-2 flex justify-center items-center' onClick={handleAddToCart}> <span><MdShoppingCartCheckout /> </span>Add to cart</button>
        </div>
    );
};

export default CartButton;
