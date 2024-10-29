import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Shared/NavBar/NavBar";
import Footer from "../../Components/Shared/Footer/Footer";

const Main = () => {
    return (
        <div className="">
          
            <NavBar></NavBar>

            <Outlet></Outlet>
  
            <Footer></Footer>
        </div>
    );
};

export default Main;