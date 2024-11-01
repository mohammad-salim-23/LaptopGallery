import { useContext } from "react";
import { AuthContext } from "../Auth/Provider/AuthProvider";


const useAuth = () => {
    const all = useContext(AuthContext);
    return all;
};

export default useAuth;