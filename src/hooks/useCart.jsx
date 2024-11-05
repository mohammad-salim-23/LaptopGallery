// import { useQuery } from '@tanstack/react-query';
// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';

// const useCart = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure()
//     const { refetch, data: cart = [] } = useQuery({
//         queryKey: ['cart', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/cart?email=${user.email}`)
//             return res.data
//         }
//     })
//     return [cart, refetch]
// }

// export default useCart

import { useContext } from "react";
// import { AuthContext } from "../../Auth/Provider/AuthProvider";
// import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {

    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();

    const { data: cart = [] , refetch} = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${user?.email}`)
            return res.data;

        },
        enabled: !!user?.email

    })




    return  [cart, refetch];
};

export default useCart;