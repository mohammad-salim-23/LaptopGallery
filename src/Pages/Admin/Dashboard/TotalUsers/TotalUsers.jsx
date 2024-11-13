import useUsers from "../../../../hooks/useUsers";
import { TiDeleteOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TotalUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, isLoading, refetch] = useUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Change the number of items per page as needed

    // Delete User Data in Dashboard
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this user?",
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
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    const handleTypeChange = (user, newType) => {
        const userDetails = {
            ...user,
            status: newType,
        };
        axiosSecure.patch(`/users/${user._id}`, userDetails)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    // Show SweetAlert success modal after the update is successful
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "User Type Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    toast.error("Failed to update user type.");
                }
            })
            .catch((error) => {
                // Handle error (optional)
                toast.error("An error occurred while updating user type.");
            });
    };

    // Pagination calculations
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - (maxVisiblePages - 1));
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    if (isLoading) return <span className="loading loading-ring loading-lg text-red-400 text-center"></span>;

    return (
        <div className="mx-auto container">
            <h1 className="text-center text-2xl font-semibold">Total Users {users.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-[16px]">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user._id} className="border hover:bg-blue-200">
                                <td className="font-semibold">{user.name}</td>
                                <td className="font-semibold">{user.email}</td>
                                {/* // Make Admin / user */}
                                <select
                                    value={user.type}
                                    onChange={(e) => handleTypeChange(user, e.target.value)}
                                    defaultValue={user.status}
                                    className="select select-bordered mt-1"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>

                                <td>
                                    <TiDeleteOutline
                                        className="text-4xl cursor-pointer"
                                        onClick={() => handleDelete(user._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 text-white bg-primary rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {getPageNumbers().map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageClick(number)}
                        className={`px-4 py-2 rounded-full ${number === currentPage ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 text-white bg-primary rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TotalUsers;
