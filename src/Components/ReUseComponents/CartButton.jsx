import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { MdShoppingCartCheckout } from 'react-icons/md';
import Swal from 'sweetalert2';

const CartButton = ({ prodId }) => {
    const [productInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosPublic.get(`/products/${prodId}`);
                setProductInfo(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [axiosPublic, prodId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { email, displayName } = user || {};
    const { brand, price, image, model, productId, color,type,subCategory } = productInfo || {};
    const cartInfo = { email, displayName, productId, brand, price, image, model, quantity: 1, color,type,subCategory};

    const handleAddToCart = async () => {
        if (!user) {
            // If the user is not signed in, navigate to the login page
            navigate('/login');
            Swal.fire({
                icon: "error",
                title: "Uhh",
                text: "First login then add product to the cart",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            return;
        }

        // If the user is signed in, proceed to add to cart
        try {
            const res = await axiosPublic.post("/cart", cartInfo);
            if (res.status === 200) {
                toast.success(`${model} added to the cart`);
            } else {
                toast.error("Failed to add to cart");
            }
        } catch (error) {
            toast.error("Error adding to cart");
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <button className='btn-wide bg-gray-800 text-white rounded-lg p-2 flex justify-center items-center' onClick={handleAddToCart}>
                <span><MdShoppingCartCheckout /> </span> Add to cart
            </button>
        </div>
    );
};

export default CartButton;
