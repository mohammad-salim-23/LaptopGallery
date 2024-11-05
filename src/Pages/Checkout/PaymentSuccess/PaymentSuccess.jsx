import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
        <div className="my-48">
            <div className="text-center font-bold  text-green-500">
                <h1 className="text-6xl">Payment Success </h1>
                <p className="text-2xl my-4">Your Transaction Id: {tranId}</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;