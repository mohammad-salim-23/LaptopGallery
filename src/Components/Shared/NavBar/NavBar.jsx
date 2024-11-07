
import { Navlinks } from "./Navlinks/Navlinks";
import MobMenu from "./Responsive/MobMenu/MobMenu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./NavBar.css";
import DesktopMenu from "./Responsive/DesktopMenu/DesktopMenu";
import useAuth from "../../../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                <div className="bg-[#2C3E50] text-white">
                    <div className="flex items-center justify-between container mx-auto px-4 h-20">

                        <div className="lg:hidden">
                            <MobMenu Menus={Navlinks} />
                        </div>

                        {/* Logo */}
                        <div>
                            <Link to={'/'}>
                                <h1 className="text-xl lg:text-3xl">Laptop Gallery</h1>
                            </Link>
                        </div>


                        <div className="hidden lg:flex w-[400px] relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full text-gray-500 pl-8 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                                <CiSearch size={18} />
                            </div>
                        </div>


                        <div className="lg:hidden">
                            <button onClick={handleSearchOpen} className="text-gray-500">
                                <FaMagnifyingGlass size={18} />
                            </button>
                        </div>


                        <div>
                            <button>Login</button>
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


                <header className="h-10 bg-gray-100 lg:border-b-2 text-[15px] sticky z-50 inset-0 text-black lg:flex-center hidden">
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