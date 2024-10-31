
import useProductsType from "../../../../hooks/useProductsType";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUsers from "../../../../hooks/useUsers";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TotalUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, isLoading, refetch ] = useUsers();

    // console.log(users)

    // Delete User Data in Dashboard
    const handleDelete = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure User  is deleted ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your user Data has been deleted.",
                                icon: "success"
                            });
                            refetch()
                            
                            
                        }
                    })
            }
            refetch()
        });
    }


    if (isLoading) return <span className="loading loading-ring loading-lg text-red-400 text-center"></span>;

    return (
        <div className="mx-auto container">
            <h1 className="text-center text-2xl  font-semibold">Total Users {users.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-[16px]">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users?.map(user =>
                                <tr key={user._id} className="border hover:bg-blue-200">
                                    <td className="font-semibold">{user.name}</td>
                                    <td className="font-semibold">{user.email}</td>
                                    <td className="font-semibold">{user.status}</td>
                                    <th className=" ">
                                        <TiDeleteOutline className="text-4xl cursor-pointer" onClick={() => handleDelete(user._id)} />
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

export default TotalUsers;
