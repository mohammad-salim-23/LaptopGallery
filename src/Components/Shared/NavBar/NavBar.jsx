import { Navlinks } from "./Navlinks/Navlinks";
import MobMenu from "./Responsive/MobMenu/MobMenu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./NavBar"
import DesktopMenu from "./Responsive/DesktopMenu/DesktopMenu";
import useAuth from "../../../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {
    const { user } = useAuth();
    const { logOut } = useContext(AuthContext);

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
        <>

            <div>
                <div className="bg-[#2C3E50] text-white">

                    <div className="flex items-center justify-between container mx-auto px-4 h-20">
                        <div className="lg:hidden">
                            <MobMenu Menus={Navlinks} />
                        </div>
                        <div>
                            <Link to={'/'}><h1 className="text-xl lg:text-3xl">Laptop Gallery</h1></Link>
                        </div>
                        <div>
                            <div className="relative flex space-x-3 mx-auto">
                                <div className="hidden w-[400px] lg:flex">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full text-gray-500 pl-8 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="absolute cursor-pointer inset-y-0 left-2 flex items-center text-gray-500">
                                        <CiSearch size={18} />
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="flex lg:hidden">
                            <button> <FaMagnifyingGlass /> </button>
                        </div>
                        <div>
                            <button>Login</button>
                        </div>
                    </div>
                </div>
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