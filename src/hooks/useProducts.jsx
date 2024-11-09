import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useProducts = () => {
    const axiosPublic = useAxiosPublic()

    const { isPending, refetch, data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            return res.data;
        }
    })
    return [products, refetch, isPending];

};

export default useProducts;