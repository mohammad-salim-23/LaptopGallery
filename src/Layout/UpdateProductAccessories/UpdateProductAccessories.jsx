import { useLoaderData, useParams } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { MdMobileScreenShare } from "react-icons/md";

const UpdateProductAccessories = () => {


    const updateProduct = useLoaderData();
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    // console.log(updateProduct)

    const { _id } = updateProduct;
    // console.log(_id)

    // React hook From
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        data._id = _id;
        // console.log(data)
        setLoading(true);
        try {
            const productsInfo = {
                title: data.title,
                brand: data.brand,
                model: data.model,
                color: data.color,
                category: "accessories",
                description: data.description,
                price: data.price,
                regularPrice: data.regularPrice,
                status: data.status,
                type: "accessories ",
                warranty: data.warranty,
            };

            // Store the laptop data in MongoDB
            const response = await axiosPublic.put(`/products/${data._id}`, productsInfo);
            // console.log(response)
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `Assessories "${data.brand}" has been Update`,
                    showConfirmButton: false,
                    timer: 1500,
                });

            }
        }
        catch (error) {
            // console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
        } finally {
            setLoading(false);  // Stop loading
        }
    }


    return (
        <div>

            <div className="py-4">
                <div className="  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-6 border-2 border-blue-400 bg-blue-200 hover:bg-blue-300 transition duration-300  rounded-2xl mt-4 mx-auto container">

                    <div className="flex justify-center gap-4">
                        <MdMobileScreenShare className="text-4xl mt-1" />
                        <h1 className="text-center mb-4 font-bold text-4xl">Update Mobile</h1>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                                <img
                                    className="w-full lg:h-[600px]"
                                    alt={`${updateProduct.model} Image Founded.`}
                                    src={updateProduct.image}

                                />

                            </div>

                            <div className="">
                                <div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* Title */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Title</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.title}
                                                {...register("title", { required: true })}
                                            />
                                            {errors.title && <span className="text-red-500 font-semibold mt-1">Title field is required</span>}
                                        </div>

                                        {/* brand */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Brand</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.brand}
                                                {...register("brand", { required: true })}
                                            />
                                            {errors.brand && <span className="text-red-500 font-semibold mt-1">Brand field is required</span>}
                                        </div>

                                    </div>



                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


                                        {/* model */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Model</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.model}
                                                {...register("model", { required: true })}
                                            />
                                            {errors.model && <span className="text-red-500 font-semibold mt-1">Model field is required</span>}
                                        </div>

                                        {/* color */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Color</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.color}
                                                {...register("color", { required: true })}
                                            />
                                            {errors.color && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                                        {/* price */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Price</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.price}
                                                {...register("price", { required: true })}
                                            />
                                            {errors.price && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                        {/* regularPrice */}
                                        {updateProduct.regularPrice && (<div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Regular Price</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.regularPrice}
                                                {...register("regularPrice")}
                                            />
                                        </div>)}

                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* warranty */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Warranty</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.warranty}
                                                {...register("warranty", { required: true })}
                                            />
                                            {errors.warranty && <span className="text-red-500 font-semibold mt-1">Warranty field is required</span>}
                                        </div>

                                        {/* Status */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Status</span>
                                            </label>
                                            <select className="select  w-full" defaultValue={updateProduct.status} name="country" id="country" {...register("status", { required: true })}>
                                                <option>In Stock</option>
                                                <option>Out of Stock</option>
                                                <option>Upcoming</option>
                                            </select>
                                            {errors.status && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                    </div>



                                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                                        {/* Description */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Description</span>
                                            </label>
                                            <textarea
                                                type="text"
                                                className="textarea textarea-bordered w-full"
                                                defaultValue={updateProduct.description}
                                                {...register("description", { required: true })}
                                            />
                                            {errors.description && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>


                                    </div>


                                </div>
                            </div>

                        </div>


                        <div className="lg:flex justify-center">
                            <button
                                className="btn btn-primary text-white w-32"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-ring loading-sm"></span>
                                ) : (
                                    "Submit Laptop"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default UpdateProductAccessories;