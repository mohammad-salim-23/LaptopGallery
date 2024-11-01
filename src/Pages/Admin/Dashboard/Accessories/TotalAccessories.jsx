import Swal from "sweetalert2";
import useProductsType from "../../../../hooks/useProductsType";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const TotalAccessories = () => {
    const [productsTypes, isLoading, refetch] = useProductsType("accessories");
    const axiosPublic = useAxiosPublic();
    // console.log(productsTypes)

    // Delete Laptop Data in Dashboard
    const handleDelete = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure Laptop Data is deleted ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/products/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Favourite Data has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
            refetch()
        });
    }


    if (isLoading) return <span className="loading loading-ring loading-lg text-red-400 text-center"></span>;



    return (
        <div>
            <div className="mx-auto container">
                <h1 className="text-center text-2xl  font-semibold">Total Laptop {productsTypes.length}</h1>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-[16px]">
                                <th>Image/Name</th>
                                <th>Model</th>
                                <th>ProductSKU</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                productsTypes?.map(productsType =>
                                    <tr key={productsType._id} className="border hover:bg-blue-200 ">

                                        <td>
                                            <div className="flex items-center  gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={productsType.image}
                                                            alt={productsType.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{productsType.name}</div>
                                                    <div className="text-sm opacity-50">{productsType.brand}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="text-sm opacity-80 font-medium">
                                            {productsType.model}
                                        </td>
                                        <td className="font-semibold">{productsType.productSKU}</td>
                                        <td className="font-semibold">{productsType.status}</td>
                                        <td className="font-semibold">{productsType.price}</td>
                                        <th className="">
                                            <Link to={`/dashboard/totalAccessories/${productsType._id}`}>
                                                <FaRegEdit className="text-2xl cursor-pointer" />
                                            </Link>
                                        </th>
                                        <th className=" ">
                                            <TiDeleteOutline className="text-4xl cursor-pointer" onClick={() => handleDelete(productsType._id)} />
                                        </th>
                                    </tr>
                                )
                            }



                        </tbody>

                    </table>


                </div>
            </div>
        </div>
    );
};

export default TotalAccessories;