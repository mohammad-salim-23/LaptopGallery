
import { Navlinks } from "./Navlinks/Navlinks";
import MobMenu from "./Responsive/MobMenu/MobMenu";
import { FaCartPlus, FaMagnifyingGlass } from "react-icons/fa6";
import "./NavBar.css";
import DesktopMenu from "./Responsive/DesktopMenu/DesktopMenu";
import useAuth from "../../../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Search from "./Search";
// import useProducts from "../../../hooks/useProducts";
import useAdmin from "../../../hooks/useAdmin";
import useProducts from "../../../hooks/useProducts";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAdmin] = useAdmin()
    const navigate = useNavigate();
    // console.log(user)

    // Handle Logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logout Success!",
                    text: "Logged out successfully!",
                    icon: "success"
                });
                navigate('/');
            })
            .catch(error => console.log(error));
    };

    const handleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen);
    };



    const [products] = useProducts();

    // console.log(products)

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((prod) =>
        prod.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // console.log(filteredProducts)

    const handleClick = () => {
        setSearchTerm("");
    };


    return (
        <>
            <div>
                <div className="bg-primary text-white flex items-center">
                    <div className="flex items-center justify-between container mx-auto px-4 h-20">

                        <div className="flex space-x-5 items-center">
                            <div className="lg:hidden">
                                <MobMenu Menus={Navlinks} />
                            </div>

                            {/* Logo */}
                            <div>
                                <Link to={'/'}>
                                    <h1 className="text-xl lg:text-3xl font-serif">Laptop Gallery</h1>
                                </Link>
                            </div>


                            <div className="hidden lg:flex w-[500px] relative">

                                <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                                    <Search></Search>
                                </div>
                            </div>


                        </div>
                        <div className="flex items-center space-x-4">
                            {
                                !isAdmin && <div className="lg:hidden">
                                    <button onClick={handleSearchOpen}>
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
                                            <div className="dropdown dropdown-end ml-8  ">
                                                <div tabIndex={0} role="button" className=" btn-circle avatar tooltip tooltip-left" data-tip={user?.displayName} >
                                                    <div className="w-10 rounded-full " >
                                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                                    </div>
                                                </div>

                                                <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box   mr-8">
                                                    <Link to={'/profile'}>
                                                        <li className="btn   text-xs lg:text-[16px] bg-primary hover:bg-transparent text-white hover:text-black w-32">Profile</li>
                                                    </Link>

                                                    <Link>
                                                        <li className="btn   text-xs lg:text-[16px] bg-primary hover:bg-transparent text-white hover:text-black mt-1 w-32" onClick={handleLogOut}>Logout</li>
                                                    </Link>
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
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none"
                            />
                            {searchTerm && (
                                <div className="absolute  p-2 space-y-2 w-80 ml-4 md:w-[600px] md:ml-20 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-auto z-50 ">
                                    {filteredProducts.length > 0 ? (
                                        <>
                                            {filteredProducts.map((result) => {
                                                const truncateName = (brand, charLimit) => {
                                                    if (brand.length > charLimit) {
                                                        return brand.slice(0, charLimit) + "...";
                                                    }
                                                    return brand;
                                                };

                                                return (
                                                    <Link
                                                        to={`/productDetails/${result._id}`}
                                                        key={result._id}
                                                        className="flex justify-start items-center gap-4 ml-2 p-2 shadow-lg rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                                        onClick={handleClick}
                                                    >
                                                        <section className="w-1/3">
                                                            <img
                                                                src={result.image}
                                                                alt={result.brand}
                                                                className="w-full  object-cover rounded-lg  h-24 duration-1000 hover:scale-105"
                                                            />
                                                        </section>

                                                        <section className="w-2/3 text-sm space-y-1">
                                                            <p className="font-bold text-base">
                                                                {truncateName(result.title, 16)}{" "}
                                                            </p>
                                                            <p className="text-base font-semibold">
                                                                {result.price} $
                                                            </p>
                                                            <p className="text-gray-600">{result.brand}</p>
                                                            <p className="text-green-600">{result.price}</p>
                                                        </section>
                                                    </Link>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <p className="text-gray-500 px-3 py-2">No products found.</p>
                                    )}
                                </div>
                            )}
                        </div>
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