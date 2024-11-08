
import { Navlinks } from "./Navlinks/Navlinks";
import MobMenu from "./Responsive/MobMenu/MobMenu";
import { FaCartPlus, FaMagnifyingGlass } from "react-icons/fa6";
import "./NavBar.css";
import DesktopMenu from "./Responsive/DesktopMenu/DesktopMenu";
import useAuth from "../../../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Search from "./Search";
// import useProducts from "../../../hooks/useProducts";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAdmin] = useAdmin()
    console.log(user)

    // Handle Logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logout Success!",
                    text: "Logged out successfully!",
                    icon: "success"
                });
                navigation('/');
            })
            .catch(error => console.log(error));
    };

    const handleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <>
            <div>
                <div className="bg-[#2C3E50] text-white flex items-center">
                    <div className="flex items-center justify-between container mx-auto px-4 h-20">

                        <div className="flex space-x-5 items-center">
                            <div className="lg:hidden">
                                <MobMenu Menus={Navlinks} />
                            </div>

                            {/* Logo */}
                            <div>
                                <Link to={'/'}>
                                    <h1 className="text-xl lg:text-3xl">Laptop Gallery</h1>
                                </Link>
                            </div>


                            <div className="hidden lg:flex w-[500px] relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full text-gray-500 pl-8 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                                    <CiSearch size={18} />
                                </div>
                            </div>


                        </div>
                        <div className="flex items-center space-x-4">
                            {
                                !isAdmin && <div className="lg:hidden">
                                    <button onClick={handleSearchOpen} className="text-gray-500">
                                        <FaMagnifyingGlass size={18} />
                                    </button>
                                </div>
                            }



                            <div className="flex items-center">
                                {
                                    isAdmin ? <>
                                        <button className="btn">
                                            <Link to={'/dashboard/adminPanel'}>Dashboard</Link>
                                        </button>
                                    </>
                                        :
                                        <>
                                            <Link to={'/cart'}>
                                                <button className="text-2xl">
                                                    <FaCartPlus />

                                                </button>
                                            </Link>
                                        </>
                                }

                                {
                                    user ? <>
                                        <div className="flex flex-col items-center justify-center">
                                            {/* User Profile */}
                                            <div className="dropdown dropdown-start ml-8 lg:dropdown-end">
                                                <div tabIndex={0} role="button" className=" btn-circle avatar tooltip tooltip-right lg:tooltip-left" data-tip={user?.displayName} >
                                                    <div className="w-10 rounded-full " >
                                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
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
                                    </>
                                        :
                                        <>

                                            <div className="ml-4 lg:ml-8">
                                                <Link to={'/login'}><button className="btn">Login</button></Link>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>


                {isSearchOpen && (
                    <div className="lg:hidden px-4 mt-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none"
                        />
                    </div>
                )}


                <header className="h-10 bg-gray-100 lg:border-b-2 text-[15px] sticky z-40 inset-0 text-black lg:flex-center hidden">
                    <nav className="px-3.5 flex-center w-full max-w-7xl mx-auto">
                        <ul className="gap-x-1 lg:flex-center hidden">
                            {Navlinks.map((menu) => (
                                <DesktopMenu menu={menu} key={menu.name} />
                            ))}
                        </ul>
                    </nav>
                </header>
            </div>
        </>
    );
};

export default NavBar;