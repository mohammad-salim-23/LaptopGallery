import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "./AuthContext/AuthProvider";



const SocialComponent = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {googleSignIn} = useContext(AuthContext);
    const handleGoogleSignIn=()=>{
       googleSignIn()
       .then(result=>{
        console.log(result.user);
        const userInfo = {
            email:result.user?.email,
            name:result.user?.displayName
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
            console.log(res.data);
            navigate('/');
        })
       })
     
    }
    return (
        <div className="px-32">
              <div className="divider ">OR</div> 

            <button onClick={handleGoogleSignIn} className="btn 
            btn-active bg-red-00">
                <FcGoogle />
                GOOGLE</button>
        </div>
    );
};

export default SocialComponent;