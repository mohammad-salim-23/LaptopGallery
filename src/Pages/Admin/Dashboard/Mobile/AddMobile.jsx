import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLaptopCode } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../Auth/Provider/AuthProvider";
import { MdMobileFriendly } from "react-icons/md";
// image hosting img bb
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddLaptop = () => {

  const [preview, setPreview] = useState("https://i.ibb.co.com/fHsw9pq/mobile-find.jpg");
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
        const productsInfo = {
          brand: data.brand,
          model: data.model,
          processor: data.processor,
          ram: data.ram,
          storage: data.storage,
          graphics: data.graphics,
          display: data.display,
          color: data.color,
          operating_System: data.operating_System,
          price: data.price,
          image: res.data.data.display_url,
          status: data.status,
          type: "Mobile",

        };

        // Store the laptop data in MongoDB
        const response = await axiosSecure.post("/products", productsInfo);
        // console.log(response)
        if (response.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Laptop "${data.brand}" has been added successfully`,
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
    <section  >

      <div className="  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-6 border-2 border-blue-400 bg-blue-200 hover:bg-blue-300 transition duration-300  rounded-2xl mt-4">

        <div className="flex justify-center gap-4">
          <MdMobileFriendly className="text-4xl mt-1" />
          <h1 className="text-center mb-4 font-bold text-4xl"> Mobile Add</h1>
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
                  {/* Brand */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Brand Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Brand Name"
                      {...register("brand", { required: true })}
                    />
                    {errors.brand && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                  </div>

                  {/* model */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Model</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Model Name"
                      {...register("model", { required: true })}
                    />
                    {errors.model && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                  </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  {/* Processor */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Processor</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Processor"
                      {...register("processor", { required: true })}
                    />
                    {errors.processor && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                  </div>

                  {/* ram */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Ram</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Ram"
                      {...register("ram", { required: true })}
                    />
                    {errors.ram && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
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
                      placeholder="Storage"
                      {...register("storage", { required: true })}
                    />
                    {errors.storage && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                  </div>

                  {/* Graphics */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Graphics</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Graphics"
                      {...register("graphics", { required: true })}
                    />
                    {errors.graphics && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
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
                      placeholder="Display"
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
                      placeholder="Color"
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
                      placeholder="Operating System"
                      {...register("operating_System", { required: true })}
                    />
                    {errors.operating_System && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
                  </div>

                  {/* price */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Price</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Price BDT"
                      {...register("price", { required: true })}
                    />
                    {errors.price && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
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
            <button className="btn btn-primary text-white w-32">
              {loading ? (
                <span className="loading loading-ring loading-sm"></span>
              ) : (
                "Submit Mobile"
              )}
            </button>
          </div>
        </form>
      </div>


    </section>
  );
};

export default AddLaptop;
