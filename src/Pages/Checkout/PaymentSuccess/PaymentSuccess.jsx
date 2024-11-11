import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
    const { tranId } = useParams();

    useEffect(() => {
        // Show alert when the component mounts
        Swal.fire({
            title: "Congratulation!",
            text: "Your payment has Success.",
            icon: "success"
        });
    }, []);

    return (
        <div className="my-48 p-4">
            <div className="text-center font-bold  text-green-500">
                <h1 className="text-4xl lg:text-6xl">Payment Success </h1>
                <p className="text-xl lg:text-2xl my-4">Your Transaction Id: <span className="underline hover:text-black cursor-pointer">{tranId}</span></p>
                <Link to={'/'}>
                    <button className="text-2xl my-4  border p-3 hover:border-black  hover:bg-blue-200 hover:text-black rounded-xl">Go to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;