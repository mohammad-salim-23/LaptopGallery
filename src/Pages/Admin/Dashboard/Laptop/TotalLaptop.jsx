
import useProductsType from "../../../../hooks/useProductsType";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";

const TotalLaptop = () => {

  const axiosPublic = useAxiosPublic();
  const [productsTypes, isLoading, refetch] = useProductsType("laptop");

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
    <div className="mx-auto container">
      <h1 className="text-center text-3xl  font-bold my-10">Total Laptop {productsTypes.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-[16px]">
              <th>Name/Image</th>
              <th>Processor/Graphics</th>
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
                            alt={productsType.brand} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{productsType.model}</div> 
                        <div className="text-sm opacity-50">{productsType.brand}</div>
                      </div>
                    </div>
                  </td>

                  <td className="text-sm opacity-80 font-medium">
                    {productsType.processor}
                    <br />
                    <span className="text-sm opacity-80 font-medium ml-1">{productsType.graphics}</span>
                  </td>
                  <td className="font-semibold">{productsType.productSKU}</td>
                  <td className="font-semibold">{productsType.status}</td>
                  <td className="font-semibold">{productsType.price}</td>
                  <th className="">
                    <Link to={`/dashboard/totalLaptop/${productsType._id}`}>
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
  );
};

export default TotalLaptop;