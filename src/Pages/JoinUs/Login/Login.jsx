import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Auth/Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialComponent from '../SocialComponent/SocialComponent';
import { px } from 'framer-motion';


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { user, signIn } = useContext(AuthContext);
    // console.log(user);



    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    title: "User Login Successful.",
                    showClass: "animate__animated animate__fadeInUp animate__faster",
                    hideClass: "animate__animated animate__fadeOutDown animate__faster"
                });
            })
        navigate('/');
    }



    return (
        <div className=" container mx-auto lg:p-24 min-h-screen px-4 bg-base-200 md:flex md:justify-center items-center">

            <div className=' flex flex-col lg:flex-row h-auto overflow-hidden'>
                <div className='hidden lg:block flex-1'>
                    <img src="https://i.ibb.co.com/7N1bT18/5e4de079-8df1-409b-92c5-16a5ca6ee61d.jpg" alt="" />
                </div>
                <div className=" flex-1 md:w-1/2 lg:p-6 h-auto bg-base-100">
                    <h1 className="text-5xl font-bold mb-4 flex justify-start">Login now</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered" required />

                        </div>

                        <div className="form-control mt-6">
                            <input className="btn bg-orange-400 text-white w-full hover:text-black" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center mt-4'><small>New here? </small> <Link className='font-bold' to="/registration">Create a new account</Link></p>
                    <div className='flex justify-center'>

                        <SocialComponent />

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;