import { useForm } from "react-hook-form";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Checkout = ({ subTotal, setIsModalVisible }) => {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({ mode: "onChange" });

    const productIds = cart.map((item) => item._id);
    // console.log(productIds);
    
    const onSubmit = async (data) => {
        // Add productIds to the data object
        data.productIds = productIds;

        fetch("https://laptop-gallery-server-nine.vercel.app/payment", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })

            .then(res => res.json())
            .then(result=>{
                window.location.replace(result.url)
                console.log(result)
            })
    };
    

    return (
        <div className="mx-auto container">
            <div className="items-center justify-center">
                <div className="animate-fadeIn">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between gap-4 mt-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("firstName", { required: true })}
                                    placeholder="First Name"
                                    className="input input-bordered w-full"
                                />
                                {errors.firstName && (
                                    <span className="text-red-500">First Name is required</span>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("lastName", { required: true })}
                                    placeholder="Last Name"
                                    className="input input-bordered w-full"
                                />
                                {errors.lastName && (
                                    <span className="text-red-500">Last Name is required</span>
                                )}
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Street Address</span>
                            </label>
                            <textarea
                                {...register("streetAddress", { required: true })}
                                placeholder="Street Address"
                                className="textarea textarea-bordered"
                            />
                            {errors.streetAddress && (
                                <span className="text-red-500">Street Address is required</span>
                            )}
                        </div>

                        <div className="flex justify-between items-center gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Division</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("division", { required: true })}
                                    placeholder="Sylhet Division"
                                    className="input input-bordered w-full"
                                />
                                {errors.division && (
                                    <span className="text-red-500">Division is required</span>
                                )}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("district", { required: true })}
                                    placeholder="Sylhet"
                                    className="input input-bordered w-full"
                                />
                                {errors.district && (
                                    <span className="text-red-500">District is required</span>
                                )}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Zip Code</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("zipCode", { required: true })}
                                    placeholder="3100"
                                    className="input input-bordered w-full"
                                />
                                {errors.zipCode && (
                                    <span className="text-red-500">Zip Code is required</span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^(01[3-9]\d{8})$/,
                                            message: "Phone number must be a valid 11-digit Bangladeshi number",
                                        },
                                    })}
                                    placeholder="Enter Your Valid Phone Number"
                                    className="input input-bordered w-full"
                                />
                                {errors.phone && (
                                    <span className="text-red-500">{errors.phone.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Email"
                                className="input input-bordered w-full"
                            />
                            {errors.email && (
                                <span className="text-red-500">Email is required</span>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn btn-primary mt-4 text-white btn-sm"
                                disabled={!isValid}
                            >
                                Checkout Confirm
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={() => setIsModalVisible(false)}
                        aria-label="close"
                        className="absolute top-5 text-xl right-5 p-2 rounded-2xl border text-gray-500 transition-transform transform hover:scale-110"
                    >
                        ❌
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
