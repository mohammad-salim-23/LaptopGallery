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
    const uploadImageToImgBB = async (imageFile) => {
        const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error("Image upload failed");
        }
    };


    const onSubmit = async (data) => {
        // console.log(data)
        setLoading(true);  // Start loading
        try {
            const images = {};
            for (let i = 0; i < 4; i++) {
                images[`img${i + 1}`] = data.images[i]
                    ? await uploadImageToImgBB(data.images[i][0]) // Adjust indexing if needed
                    : null;
            }
            // console.log('Uploaded Image URLs:', images);

            if (Object.values(images).some((url) => url !== null)) {
                const randomNumber = Math.floor(1000 + Math.random() * 9000);
                const productsInfo = {
                    title: data.title,
                    brand: data.brand.toLowerCase(),
                    category: "Accessories",
                    subCategory: "Accessories",
                    model: data.model.toLowerCase(),
                    processor: data.processor.toLowerCase(),
                    ram: data.ram,
                    storage: data.storage.toLowerCase(),
                    display: data.display,
                    color: data.color,
                    operating_System: data.operating_System,
                    price: `${data.price} BDT`,
                    regularPrice: `${data.regularPrice} BDT`,
                    image: images,
                    status: data.status,
                    description: data.description,
                    warranty: data.warranty,
                    type: "accessories",
                    productSKU: `LG-${data.brand.split(" ")[0]}-${data.model.split(" ")[0]}-${randomNumber}`,
                };

                // Store laptop data in MongoDB
                const response = await axiosSecure.post("/products", productsInfo);

                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Accessories "${data.brand}" has been added successfully`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            // console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
        }
        finally {
            setLoading(false);  // Stop loading
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
                                        {/* Title */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Title</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Title"
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
                                                placeholder="Apple"
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
                                                placeholder="MacBook Pro 14-inch"
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
                                                placeholder="Black"
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
                                                placeholder="17500 BDT"
                                                {...register("price", { required: true })}
                                            />
                                            {errors.price && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                                        </div>

                                        {/* regularPrice */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">Regular Price(Optional)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="18500 BDT"
                                                {...register("regularPrice")}
                                            />
                                        </div>

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
                                                placeholder="1 Year International Warranty"
                                                {...register("warranty", { required: true })}
                                            />
                                            {errors.warranty && <span className="text-red-500 font-semibold mt-1">Warranty field is required</span>}
                                        </div>

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

                                    </div>

                                    <div>
                                        {/* Laptop image */}
                                        <div className="form-control w-full ">
                                            <label className="label">
                                                <span className="label-text font-medium">Laptop Image</span>
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
                            <button
                                className="btn btn-primary text-white w-48"
                                disabled={loading}
                            >
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