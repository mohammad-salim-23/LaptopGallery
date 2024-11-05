import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useReview = () => {
    const axiosSecure = useAxiosSecure();

    const { isLoading, refetch, data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/review');
            return res.data;
        }
    })
    return [reviews, isLoading, refetch];

};

export default useReview;