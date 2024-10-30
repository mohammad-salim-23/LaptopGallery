import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Navlinks } from "./Navlinks/Navlinks";
import MobMenu from "./Responsive/MobMenu/MobMenu";
import "./NavBar"
import DesktopMenu from "./Responsive/DesktopMenu/DesktopMenu";

const NavBar = () => {
    const {logOut} = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
          .then(() => {})
          .catch((error) => console.log(error));
      };
    return (
        <div>
            
            <header className="h-16 text-[15px] fixed inset-0 flex-center text-white bg-primary">
                <nav className=" px-3.5 flex-center-between w-full max-w-7xl mx-auto">
                    <div className="flex-center gap-x-3 z-[999] relative">
                        {/* <img src={Logo} alt="" className="size-8" /> */}
                        <h3 className="text-lg font-semibold">Laptop Gallery</h3>
                    </div>

                    <ul className="gap-x-1 lg:flex-center hidden">
                        {Navlinks.map((menu) => (
                            <DesktopMenu menu={menu} key={menu.name} />
                        ))}
                    </ul>
                    <div className="flex-center gap-x-5">
                        <button
                            aria-label="sign-in"
                            className="bg-white/5 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center"
                        >
                            Sign In
                        </button>
                        <div className="lg:hidden">
                            <MobMenu Menus={Navlinks} />
                        </div>
                       <button onClick={handleLogOut()}>LogOut</button>

                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavBar;