import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Shared/NavBar/NavBar";
import Footer from "../../Components/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { PulseLoader } from 'react-spinners';

const Main = () => {
    const notify = () => toast('Here is your toast.');
    const [loading, SetLoading] = useState(true);
    useEffect(() => {
        SetLoading(true)

        setTimeout(() => {
            SetLoading(false)
        }
            , 1900)
    }, [])
    return (

        <>
            {
                loading ? (
                    <div className='flex justify-center h-[100vh] items-center'><PulseLoader
                        color={'#2C3E50'}
                        loading={true}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /></div>
                ) :
                    (
                        <div>

                            <NavBar></NavBar>

                            <Outlet></Outlet>

                            <Footer></Footer>


                            <div>
                                <button onClick={notify}></button>
                                <Toaster />
                            </div>
                        </div>
                    )
            }

        </>

    )
};

export default Main;