import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePayments = () => {
    const axiosSecure = useAxiosSecure();

    const { isPending, refetch, data: payment = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment');
            return res.data;
        }
    })
    return [payment, refetch, isPending];

};

export default usePayments;