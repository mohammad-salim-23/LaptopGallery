import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import Swal from "sweetalert2";
import SocialComponent from "../SocialComponent/SocialComponent";

const Registration = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password, data.name)
      .then(result => {
        updateUserProfile(data.name)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              password: data.password,
            };
            axiosPublic.post('/users', userInfo).then(res => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Registration Success!",
                  text: "You clicked the button!",
                  icon: "success",
                });
                navigate('/');
              }
            });
          })
          .catch((error) => console.error(error));
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error(error);
      });
  };

  return (
    <div className="lg:p-24 min-h-screen bg-base-200 flex justify-center items-center">
      <div className="flex flex-col lg:flex-row lg:h-full overflow-hidden w-full">
        {/* Image section */}
        <div className="hidden lg:flex flex-1 h-full">
          <img
            src="https://i.ibb.co/7N1bT18/5e4de079-8df1-409b-92c5-16a5ca6ee61d.jpg"
            alt="Registration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form section */}
        <div className="flex-1  h-full">
          <div className="bg-base-100 p-6">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be at least 6 characters</p>
                )}
              </div>

              <div className="form-control mt-6">
                <input className="btn bg-orange-400 text-white w-full hover:text-black" type="submit" value="Sign Up" />
              </div>
            </form>
            <p className="text-center mt-4">
              <small>Already Have an Account?</small>{" "}
              <Link className="font-bold" to="/login">Log In</Link>
            </p>
            <div className="text-center ">
              <SocialComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
