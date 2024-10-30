import { useContext } from "react";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    // console.log(isAdmin)

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logout Success!",
                    text: "You clicked the button!",
                    icon: "success"
                });
            })
            .catch((error) => console.log(error));
    };
    return (
        <div>

            <header
                class=" inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
                <div class="px-4">
                    <div class="flex items-center justify-between">
                        <div class="flex shrink-0">
                            <a aria-current="page" class="flex items-center" href="/">
                                <img class="h-7 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="" />
                                <p class="sr-only">Website Title</p>
                            </a>
                        </div>
                        <div class="hidden md:flex md:items-center md:justify-center md:gap-5">
                            <a aria-current="page"
                                class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">How it works</a>
                            <a class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">Pricing</a>
                        </div>
                        <div class="flex items-center justify-end gap-3">

                            {
                                isAdmin ?
                                    <>
                                        <a class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                            href="/dashboard/adminPanel">Dashboard</a>
                                    </> :
                                    <>
                                    </>
                            }
                        </div>
                        {
                            user ? <>
                                <button onClick={handleLogOut} className="btn">LogOut</button>
                            </>
                                :
                                <>
                                    <a class="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                                        href="/registration">Registration</a>
                                    <a class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        href="/login">Login</a>
                                </>
                        }


                    </div>
                </div>
            </header>

        </div>
    );
};

export default NavBar;