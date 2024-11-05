import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentFail = () => {
    useEffect(() => {
        // Show alert when the component mounts
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your payment has failed. Please try again.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }, []);

    return (
        <div className="my-48">
            <div className="text-center font-bold text-red-500">
                <h1 className="text-6xl">Payment Failed</h1>
                <Link to={'/'}>
                    <p className="text-2xl my-4 btn">Go to Home</p>
                </Link>
            </div>
        </div>
    );
};

export default PaymentFail;
