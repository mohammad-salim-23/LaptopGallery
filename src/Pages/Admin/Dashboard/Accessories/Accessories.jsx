// import { MdMobileFriendly } from "react-icons/md";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../Auth/Provider/AuthProvider";
import { MdMobileFriendly } from "react-icons/md";
// image hosting img bb
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const Accessories = () => {


    const [preview, setPreview] = useState("https://i.ibb.co.com/dfNgcGy/accessories.jpg");
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    // Image change
    const handleFileChange = (file) => {
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };
    // Image change
    const handleInputChange = (e) => {
        const file = e.target.files[0];
        handleFileChange(file);
    };


    // React hook From
    const { register, handleSubmit, formState: { errors }, } = useForm();


    const onSubmit = async (data) => {
        // console.log(data)
        try {
            // Image upload to imgbb
            const imageFile = new FormData();
            console.log(data.image[0]);
            imageFile.append("image", data.image[0]);

            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            // console.log(res);

            if (res.data.success) {
                const randomNumber = Math.floor(1000 + Math.random() * 9000);
                const productsInfo = {
                    name: data.name,
                    brand: data.brand,
                    model: data.model,
                    category: data.category,
                    description: data.description,
                    price: data.price,
                    image: res.data.data.display_url,
                    status: data.status,
                    type: "accessories ",
                    stock: data.stock,
                    rating: data.rating,
                    subCategory: data.subCategory,
                    productSKU: `LG-${data.brand.split(" ")[0]}-${data.name.split(" ")[0]}-${randomNumber}`

                };

                // Store the laptop data in MongoDB
                const response = await axiosSecure.post("/products", productsInfo);
                // console.log(response)
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Mobile "${data.brand}" has been added successfully`,
                        showConfirmButton: false,
                        timer: 1500,
                    });

                }
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
        }
    };




    return (
        <div>
            <section  >

                <div className="  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-6 border-2 border-blue-400 bg-blue-200 hover:bg-blue-300 transition duration-300  rounded-2xl mt-4">

                    <div className="flex justify-center gap-4">
                        <MdMobileFriendly className="text-4xl mt-1" />
                        <h1 className="text-center mb-4 font-bold text-4xl"> Accessories Add</h1>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                                {preview && (
                                    <img
                                        className="w-full lg:h-[600px]"
                                        alt=""
                                        src={preview}

                                    />
                                )}

                            </div>

                            <div className="">
                                <div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Galaxy S23"
                                                {...register("name", { required: true })}
                                            />
                                            {errors.name && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                        {/* brand */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Brand</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Samsung "
                                                {...register("brand", { required: true })}
                                            />
                                            {errors.brand && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                                        {/* Model */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Model</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Snapdragon 8 Gen 2"
                                                {...register("model", { required: true })}
                                            />
                                            {errors.model && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                        {/* category */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Category</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Chargers"
                                                {...register("category", { required: true })}
                                            />
                                            {errors.category && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
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
                                                placeholder="1200 BDT"
                                                {...register("price", { required: true })}
                                            />
                                            {errors.price && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                        {/* Stock */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Stock</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="7"
                                                {...register("stock", { required: true })}
                                            />
                                            {errors.stock && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* Rating */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Rating</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="4.5"
                                                {...register("rating", { required: true })}
                                            />
                                            {errors.rating && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                        {/* Type */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Type</span>
                                            </label>
                                            <select className="select  w-full" placeholder="Select..." name="country" id="country" {...register("subCategory", { required: true })}>
                                                <option>Mobile Accessories</option>
                                                <option>Laptop Accessories</option>
                                                <option>Others Accessories</option>
                                            </select>
                                            {errors.subCategory && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* Status */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Status</span>
                                            </label>
                                            <select className="select  w-full" placeholder="Select..." name="country" id="country" {...register("status", { required: true })}>
                                                <option>In Stock</option>
                                                <option>Out of Stock</option>
                                                <option>Upcoming</option>
                                            </select>
                                            {errors.status && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>


                                        {/* Mobile image */}
                                        <div className="form-control w-full ">
                                            <label className="label">
                                                <span className="label-text font-medium">Mobile Image</span>
                                            </label>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                accept="image/*"
                                                className="file-input file-input-bordered w-full  cursor-pointer"
                                                htmlFor="file-upload"
                                                {...register('image', { onChange: handleInputChange })}
                                            />
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
                                                placeholder="Description"
                                                {...register("description", { required: true })}
                                            />
                                            {errors.description && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>


                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                                        {/* Admin Name */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Admin Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user?.displayName}
                                                className="input input-bordered w-full"
                                                // disabled
                                                readOnly
                                            />
                                        </div>



                                        {/* Admin Email */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Admin Email</span>
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user?.email}
                                                className="input input-bordered w-full"
                                                // disabled
                                                readOnly
                                            />
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>


                        <div className="lg:flex justify-center">
                            <button className="btn btn-primary text-white w-40">
                                {loading ? (
                                    <span className="loading loading-ring loading-sm"></span>
                                ) : (
                                    "Submit Accessories"
                                )}
                            </button>
                        </div>
                    </form>
                </div>


            </section>
        </div>
    );
};

export default Accessories;