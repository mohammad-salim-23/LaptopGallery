import { useContext, useState } from "react";
import { FaLaptopCode, FaLaptopHouse } from "react-icons/fa";
import { FaBarsStaggered, FaMobileScreenButton } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { MdMobileFriendly, MdOutlineDashboardCustomize } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import Swal from "sweetalert2";
import { IoHome } from "react-icons/io5";



const Dashboard = () => {

  const navigation = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // mobile View toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handel Logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logout Success!",
          text: "Logout !",
          icon: "success"
        });
        navigation('/')
      })
      .catch(error => console.log(error))

  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform md:translate-x-0 transition-transform duration-300 ease-in-out md:flex md:relative md:flex-col`}
      >
        {/* Logo  */}
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <Link to={"/"}>
            <span className="text-white font-bold uppercase">Laptop Gallery</span>
          </Link>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">

          <nav className="flex-1 px-2 py-4 bg-gray-800">
            {/* Dashboard */}
            <Link className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-gray-700">
              <MdOutlineDashboardCustomize className="h-6 w-6 mr-2" />
              Dashboard
            </Link>
            {/* Add Laptop */}
            <Link to={"/dashboard/addLaptop"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-gray-700">
              <FaLaptopCode className="h-6 w-6 mr-2" />
              Add Laptop
            </Link>
            {/* Add Mobile */}
            <Link to={"/dashboard/addMobile"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-gray-700">
              <MdMobileFriendly className="h-6 w-6 mr-2" />
              Add Mobile
            </Link>
            {/* Add Laptop */}
            <Link to={"/dashboard/totalLaptop"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-gray-700">
              <FaLaptopHouse className="h-6 w-6 mr-2" />
              Total Laptop
            </Link>
            {/* Total Mobile */}
            <Link to={"/dashboard/totalMobile"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-gray-700">
              <FaMobileScreenButton className="h-6 w-6 mr-2" />
              Total Mobile
            </Link>
            {/* Total Users */}
            <Link to={"/dashboard/totalUsers"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-gray-700">
              <HiUserGroup className="h-6 w-6 mr-2" />
              Total Users
            </Link>
            {/* Go Home */}
            <Link to={"/"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-gray-700 my-16">
              <IoHome className="h-6 w-6 mr-2" />
              Go Home
            </Link>


          </nav>
        </div>

      </div>


      {/*  mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">

        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">

          {/* Search input */}
          <input className="mx-4 w-full md:72 lg:w-60 border rounded-md px-4 py-2 hidden lg:flex" type="text" placeholder="Search" />

          <div className="flex flex-col items-center justify-center">
            {/* User Profile */}
            <div className="dropdown dropdown-start lg:dropdown-end">
              <div tabIndex={0} role="button" className=" btn-circle avatar tooltip tooltip-right lg:tooltip-left" data-tip={user?.displayName} >
                <div className="w-10 rounded-full " >
                  <img alt="Tailwind CSS Navbar component" src={'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1730209706~exp=1730213306~hmac=275a4f7190f0c069c53dc29ab35ca3919adf0cab2a689c3d4da629b884d55a18&w=1380'} />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">

                <button className=" border btn " onClick={handleLogOut}>
                  LogOut
                  <IoIosLogOut></IoIosLogOut>
                </button>
              </ul>
            </div>
          </div>

          {/* Dashboard5d Drawer Button */}
          <button
            className={`text-gray-500 focus:outline-none focus:text-gray-700 md:hidden ${isSidebarOpen ? 'order-last' : ''
              }`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (

              <ImCancelCircle className="text-3xl" />

            ) : (

              <FaBarsStaggered className="text-3xl" />
            )}
          </button>
        </div>


        {/* Content */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
export default Dashboard;