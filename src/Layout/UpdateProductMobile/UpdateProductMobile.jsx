import { useLoaderData, useParams } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { MdMobileScreenShare } from "react-icons/md";

const UpdateProductMobile = () => {

    const updateProduct = useLoaderData();
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    // console.log(updateProduct)

    const { _id } = updateProduct;
    // console.log(_id)


    // React hook From
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        data._id = _id;
        // console.log(data)
        try {
            const productsInfo = {
                title: data.title,
                brand: data.brand,
                model: data.model,
                processor: data.processor,
                ram: data.ram,
                storage: data.storage,
                display: data.display,
                color: data.color,
                operating_System: data.operating_System,
                price: `${data.price} BDT`,
                regularPrice: `${data.regularPrice} BDT`,
                status: data.status,
                description: data.description,
                warranty: data.warranty,
            };

            // Store the laptop data in MongoDB
            const response = await axiosPublic.put(`/products/${data._id}`, productsInfo);
            console.log(response)
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `LaptoMobile "${data.brand}" has been Update`,
                    showConfirmButton: false,
                    timer: 1500,
                });

            }
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
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

                                        {/* Processor */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Processor</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.processor}
                                                {...register("processor", { required: true })}
                                            />
                                            {errors.processor && <span className="text-red-500 font-semibold mt-1">Processor field is required</span>}
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                                        {/* storage */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Storage</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="128GB SSD"
                                                defaultValue={updateProduct.storage}
                                                {...register("storage", { required: true })}
                                            />
                                            {errors.storage && <span className="text-red-500 font-semibold mt-1">This field is required</span>}

                                        </div>

                                        {/* Display Size */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Display Size</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                // placeholder="6.1 inches"
                                                defaultValue={updateProduct.displaySize}
                                                {...register("displaySize")}
                                            />
                                        </div>


                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                                        {/* ram */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">ram</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.ram}
                                                {...register("ram", { required: true })}
                                            />
                                            {errors.ram && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                        {/* storage */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">storage</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.storage}
                                                {...register("storage", { required: true })}
                                            />
                                            {errors.storage && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* display */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Display</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.display}
                                                {...register("display", { required: true })}
                                            />
                                            {errors.display && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
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
                                        {/* Operating System */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Operating System</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                defaultValue={updateProduct.operating_System}
                                                {...register("operating_System",)}
                                            />
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
                                                {...register("warranty")}
                                            />
                                        </div>

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
                            <button className="btn btn-primary text-white w-48">
                                Update Mobile
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default UpdateProductMobile;