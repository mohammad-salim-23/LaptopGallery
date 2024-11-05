import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { isPending, refetch, data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    })
    return [products, refetch, isPending];

};

export default useProducts;