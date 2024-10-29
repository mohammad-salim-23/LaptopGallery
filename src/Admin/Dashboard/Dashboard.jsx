import { useContext } from "react"
import { AuthContext } from "../../Components/Shared/AuthContext/AuthProvider"

import {  FaHome,  FaUser } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import { NavLink, Outlet } from "react-router-dom";
const Dashboard=()=>{
     const [isAdmin] = useAdmin();
    const {user} = useContext(AuthContext);
    return(
        <div className="flex gap-8">
        <div className="w-64 min-h-screen bg-green-300">
    <ul className="menu">
     {
      isAdmin ?
      <>
         
        <li>
        <NavLink to="/dashboard/addLaptop">
          Add Laptop
        </NavLink>

      </li>
      <li>
        <NavLink to="/dashboard/addMobile">
          Add Mobile
        </NavLink>

      </li>
      <li>
        <NavLink to="/dashboard/allMobile">
          All Mobile
        </NavLink>

      </li>
      <li>
        <NavLink to="/dashboard/users">
         <FaUser></FaUser>
         Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allLaptop">
        All Laptop
        </NavLink>
      </li>
     
      </>
      :""
     }
   
    
     <div className="divider">
     </div>
        {/* shared nav links */}
        <li>
            <NavLink to="/">
                <FaHome></FaHome>
                Home
            </NavLink>
        </li>
     
      </ul>
      
      </div>
     <div className="flex-1 p-8"> 
     <Outlet></Outlet>
     </div>
    </div>
    )
}
export default Dashboard;