import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useLaptops = () => {
    const axiosPublic = useAxiosPublic();

    const {refetch,data:laptops=[]}=useQuery({
        queryKey:['laptops'],
        queryFn:   async () => {
            const res = await axiosPublic.get('/laptop');
            return res.data;
          }
    })
    return [laptops,refetch];
};

export default useLaptops;