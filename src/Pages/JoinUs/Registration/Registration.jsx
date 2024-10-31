import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SocialComponent from "../SocialSocialComponent/SocialSocialComponent";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import Swal from "sweetalert2";




const Registration = () => {


  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  // console.log(user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {

    // User create
    createUser(data.email, data.password, data.name)
      .then(result => {
        // console.log(result.user)

        updateUserProfile(data.name)
          .then(() => {
            // create user save Data in MongoDB
            const userInfo = {
              name: data.name,
              email: data.email,
              password: data.password
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {

                }
              })
            Swal.fire({
              title: "Registration Success!",
              text: "You clicked the button!",
              icon: "success"
            });
            navigate('/')


          })
          .catch((error) => {
            // console.log(error)
          })


      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });

        // console.error(error)
      })


  };




  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">SignUp Now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  name="password"
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
                <input
                  className="btn btn-outline"
                  type="submit"
                  value="SignUp"
                />
              </div>
            </form>
            <p className="text-center ">
              Already have an account? Go <Link className="font-bold" to="/login">Login Page</Link>
            </p>
            <SocialComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;