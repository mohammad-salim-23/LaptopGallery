import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../../Components/Shared/Loader/Loader";

const PrivateRoute = ({ children }) => {

  const {user,loading} = useAuth()
  const location = useLocation();


  // Data Loading
  if (loading) {
    return <Loader></Loader>
  }

  // User  Check
  if (user) {
    return children;
  }

  return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;