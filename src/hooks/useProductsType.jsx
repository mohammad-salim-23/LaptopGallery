import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProductsType = (type) => {

    const axiosPublic = useAxiosPublic();

    const { data: productsTypes = [], refetch ,isLoading} = useQuery({
        queryKey: ['productsType'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?type=${type}`)
            // console.log(res.data)
            return res.data;
        },
    })

    // console.log(productsType)

    return [productsTypes,isLoading, refetch];
};

export default useProductsType;

// /products?type=laptop&brand=Dell&model=XPS%2015&processor=Intel%20i7&ram=16GB&storage=512GB%20SSD
