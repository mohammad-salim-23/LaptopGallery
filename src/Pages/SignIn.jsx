import React, { useContext } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/Shared/AuthContext/AuthProvider';
import SocialComponent from '../Components/Shared/SocialComponent';


const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
   
    const { user,signIn } = useContext(AuthContext);
    console.log(user);

   

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successful.",
                    showClass: "animate__animated animate__fadeInUp animate__faster",
                    hideClass: "animate__animated animate__fadeOutDown animate__faster"
                });

                navigate('/');
            })
    }



    return (
        <div className="min-h-screen bg-base-200 md:flex md:justify-center items-center">
           
            <div className="card md:w-1/2 p-6 bg-base-100">
                <h1 className="text-5xl font-bold mb-4 text-center">Login now!</h1>
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
                        <input  className="btn bg-primaryColor w-full" type="submit" value="Login" />
                    </div>
                </form>
                <p className='text-center mt-4'><small>New here? </small> <Link className='font-bold' to="/signUp">Create a new account</Link></p>
                <div className='text-center'>
                <SocialComponent />
                </div>
            </div>
            
        </div>
    );
};

export default SignIn;
