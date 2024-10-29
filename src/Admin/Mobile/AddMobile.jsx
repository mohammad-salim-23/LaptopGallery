import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Components/Shared/AuthContext/AuthProvider";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMobile = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Image upload to imgbb
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const newPhone = {
          brand: data.Brand,
          model: data.Model,
          processor: data.Processor,
          ram: data.RAM,
          storage: data.Storage,
          display: {
            size: data["Display Size"],
            type: data["Display Type"],
          },
          camera: data.Camera,
          battery: data.Battery,
          os: data["Operating System"],
          quantity: data.Quantity,
          price: data.Price,
          image: res.data.data.display_url,
          status: "available",
        };

        // Store the phone data in MongoDB
        const response = await axiosSecure.post("/mobile", newPhone);
        if (response.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Phone "${data.Model}" has been added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Phone</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label-text">Brand*</label>
          <input
            type="text"
            placeholder="Brand"
            {...register("Brand", { required: true })}
            className="input input-bordered w-full"
            defaultValue="Samsung" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Model*</label>
          <input
            type="text"
            placeholder="Model"
            {...register("Model", { required: true })}
            className="input input-bordered w-full"
            defaultValue="Galaxy S23" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Processor*</label>
          <input
            type="text"
            placeholder="Processor"
            {...register("Processor", { required: true })}
            className="input input-bordered w-full"
            defaultValue="Snapdragon 8 Gen 2" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">RAM*</label>
          <input
            type="text"
            placeholder="RAM"
            {...register("RAM", { required: true })}
            className="input input-bordered w-full"
            defaultValue="8GB" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Storage*</label>
          <input
            type="text"
            placeholder="Storage"
            {...register("Storage", { required: true })}
            className="input input-bordered w-full"
            defaultValue="128GB" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Display Size*</label>
          <input
            type="text"
            placeholder="Display Size"
            {...register("Display Size", { required: true })}
            className="input input-bordered w-full"
            defaultValue="6.1 inches" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Display Type*</label>
          <input
            type="text"
            placeholder="Display Type"
            {...register("Display Type", { required: true })}
            className="input input-bordered w-full"
            defaultValue="Dynamic AMOLED 2X" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Camera*</label>
          <input
            type="text"
            placeholder="Camera"
            {...register("Camera", { required: true })}
            className="input input-bordered w-full"
            defaultValue="50MP + 12MP + 10MP" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Battery*</label>
          <input
            type="text"
            placeholder="Battery"
            {...register("Battery", { required: true })}
            className="input input-bordered w-full"
            defaultValue="3900mAh" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Operating System*</label>
          <input
            type="text"
            placeholder="Operating System"
            {...register("Operating System", { required: true })}
            className="input input-bordered w-full"
            defaultValue="Android 13" // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Quantity*</label>
          <input
            type="number"
            placeholder="Quantity"
            {...register("Quantity", { required: true })}
            className="input input-bordered w-full"
            defaultValue={0} // Default value based on your JSON
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label-text">Price*</label>
          <input
            type="text"
            placeholder="Price"
            {...register("Price", { required: true })}
            className="input input-bordered w-full"
            defaultValue="69,999 BDT" // Default value based on your JSON
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label-text">quantity*</label>
          <input
            type="text"
            {...register("Quantity", { required: true })}
            className="input input-bordered w-full"
            defaultValue="1"
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
          Add Phone
        </button>
      </form>
    </div>
  );
};

export default AddMobile;
