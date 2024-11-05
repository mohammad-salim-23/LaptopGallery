import { Navlinks } from "./Navlinks/Navlinks";
import MobMenu from "./Responsive/MobMenu/MobMenu";
import "./NavBar"
import DesktopMenu from "./Responsive/DesktopMenu/DesktopMenu";
import useAuth from "../../../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
        <div>

            <header className="h-16 text-[15px] fixed z-50 inset-0 flex-center text-white bg-[#2C3E50]">
                <nav className=" px-3.5 flex-center-between w-full max-w-7xl mx-auto">
                    <div className="flex-center gap-x-3 z-[999] relative">
                        {/* <img src={Logo} alt="" className="size-8" /> */}
                        <Link to={'/'}><h3 className="text-lg font-semibold">Laptop Gallery</h3></Link>
                    </div>

                    <ul className="gap-x-1 lg:flex-center hidden">
                        {Navlinks.map((menu) => (
                            <DesktopMenu menu={menu} key={menu.name} />
                        ))}
                    </ul>
                    <div className="flex-center gap-x-5">

                        {
                            user ? <>
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
                            </> :

                                <>
                                    <Link to={"/login"}>
                                        <button
                                            aria-label="sign-in"
                                            className="bg-white/5 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center"
                                        >
                                            Sign In
                                        </button>
                                    </Link>
                                </>
                        }

                        <div className="lg:hidden">
                            <MobMenu Menus={Navlinks} />
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavBar;