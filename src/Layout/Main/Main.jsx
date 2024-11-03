import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Shared/NavBar/NavBar";
import Footer from "../../Components/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

const Main = () => {
    const notify = () => toast('Here is your toast.');
    return (
        <div className="">

            <NavBar></NavBar>

            <Outlet></Outlet>

            <Footer></Footer>
      

            <div>
                <button onClick={notify}></button>
                <Toaster />
            </div>
        </div>
    );
};

export default Main;