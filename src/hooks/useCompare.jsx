import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCompare = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { refetch, data: compare = [] } = useQuery({
        queryKey: ['compare', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/compare?email=${user?.email}`)
            return res.data
        }
    })
    return [compare, refetch]
}

export default useCompare