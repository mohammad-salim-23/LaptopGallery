import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Components/Shared/AuthContext/AuthProvider";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddLaptop = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Image upload to imgbb
    const imageFile = new FormData();
    imageFile.append("image", data.image[0]);

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      
      const newLaptop = {
        brand: data.brand,
        model: data.model,
        processor: data.processor,
        ram: data.ram,
        storage: data.storage,
        graphics: data.graphics,
        display: data.display,
        color: data.color,
        os: data.os,
        price: data.price,
        image: res.data.data.display_url,
        status: "available",
      };

      // Store the laptop data in MongoDB
      const response = await axiosSecure.post("/laptops", newLaptop);
      if (response.data.insertedId) {
        // Show success popup and redirect
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Laptop "${data.model}" has been added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myLaptops");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Laptop</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label-text">Brand*</label>
          <input
            type="text"
            placeholder="Brand"
            {...register("brand", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Model*</label>
          <input
            type="text"
            placeholder="Model"
            {...register("model", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Processor*</label>
          <input
            type="text"
            placeholder="Processor"
            {...register("processor", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">RAM*</label>
          <input
            type="text"
            placeholder="RAM"
            {...register("ram", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Storage*</label>
          <input
            type="text"
            placeholder="Storage"
            {...register("storage", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Graphics*</label>
          <input
            type="text"
            placeholder="Graphics"
            {...register("graphics", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Display*</label>
          <input
            type="text"
            placeholder="Display"
            {...register("display", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Color*</label>
          <input
            type="text"
            placeholder="Color"
            {...register("color", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Operating System*</label>
          <input
            type="text"
            placeholder="Operating System"
            {...register("os", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Price*</label>
          <input
            type="text"
            placeholder="Price"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Image*</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full max-w-xs"
          />
        </div>

        <button type="submit" className="btn btn-block bg-primaryColor">
          Add Laptop
        </button>
      </form>
    </div>
  );
};

export default AddLaptop;
