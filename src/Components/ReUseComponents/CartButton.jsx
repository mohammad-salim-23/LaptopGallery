import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { MdShoppingCartCheckout } from 'react-icons/md';
import Swal from 'sweetalert2';

const CartButton = ({ prodId }) => {
    const [productInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosPublic.get(`/products/${prodId}`);
                setProductInfo(response.data);
            } catch (error) {
                // console.log(error);
                toast.error("Failed to fetch product information");
            } finally {
                setLoading(false);
            }
        };

        const fetchCartItems = async () => {
            if (user) {
                try {
                    const response = await axiosPublic.get(`/cart?email=${user.email}`);
                    setCartItems(response.data);
                } catch (error) {
                    // console.log(error);
                    toast.error("Failed to fetch cart items");
                }
            }
        };

        fetchProduct();
        fetchCartItems();
    }, [axiosPublic, prodId, user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { email, displayName } = user || {};
    const { brand, price, image, model, productId, color, type, subCategory } = productInfo || {};
    const cartInfo = { email, displayName, productId, brand, price, image, model, quantity: 1, color, type, subCategory };

    const handleAddToCart = async () => {
        if (!user) {

            navigate('/login');
            Swal.fire({
                icon: "error",
                title: "Authentication Required",
                text: "Please log in to add products to the cart.",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            return;
        }


        const isProductInCart = cartItems.some(item => item.productId === productId && item.email === user.email);
        if (isProductInCart) {
            toast.error(`${model} is already in your cart.`);
            return;
        }


        try {
            const res = await axiosPublic.post("/cart", cartInfo);
            if (res.status === 200) {
                toast.success(`${model} added to the cart`);

                setCartItems(prevItems => [...prevItems, cartInfo]);
            } else {
                toast.error("Failed to add to cart");
            }
        } catch (error) {
            // console.log(error);
            toast.error("Error adding to cart");
        }
    };

    return (
        <div className="flex justify-center items-center lg:justify-center lg:items-center">
            <button
                onClick={handleAddToCart}
                className="btn flex items-center text-[10px] md:text-[12px] lg:text-[14px] text-white py-2 md:py-3 px-2 md:px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none"
            >
                <MdShoppingCartCheckout className="text-[18px] md:text-[20px] lg:text-[22px]" />
                <span className="font-semibold">Add To Cart</span>
            </button>
        </div>


    );
};

export default CartButton;