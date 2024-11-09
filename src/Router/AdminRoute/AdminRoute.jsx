import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../Components/Shared/Loader/Loader";
import useAuth from "../../hooks/useAuth";




const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();
 
    // Data Loading
    if (loading && isAdminLoading) {

        return <Loader></Loader>
    }


    // User && Admin Check
    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;