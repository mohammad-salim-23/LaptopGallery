import React from 'react';
import useCompare from '../../hooks/useCompare';
import CartButton from '../../Components/ReUseComponents/CartButton';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Compare = () => {
    const [compare, refetch] = useCompare();
    const axiosSecure = useAxiosSecure();
    const sortedCompare = compare
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 4);

    const features = [
        { label: "Image", key: "image" },
        { label: "Brand", key: "brand" },
        { label: "Model", key: "model" },
        { label: "Processor", key: "processor" },
        { label: "RAM", key: "ram" },
        { label: "Storage", key: "storage" },
        { label: "Graphics", key: "graphics" },
        { label: "Display", key: "display" },
        { label: "Color", key: "color" },
        { label: "Operating System", key: "operating_System" },
        { label: "Price", key: "price" },
        { label: "Status", key: "status" },
    ];

    const handleRemove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/compare/${id}`)
                .then(res => {
                  if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire("Removed!", "Product has been removed.", "success");
                  }
                })
            }
          });
    };

    return (
        <div className="p-4 my-24">
            <h2 className="text-2xl font-semibold mb-4">Product Comparison</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 hidden md:table">
                    <thead>
                        <tr>
                            <th className="border p-2 bg-gray-100">Feature</th>
                            {sortedCompare.map((product, index) => (
                                <th key={index} className="border p-2 bg-gray-100">
                                    {product.brand} {product.model}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature) => (
                            <tr key={feature.key}>
                                <td className="border p-2 font-semibold bg-gray-50">
                                    {feature.label}
                                </td>
                                {sortedCompare.map((product, index) => (
                                    <td key={index} className="border p-2 text-center">
                                        {feature.key === "image" ? (
                                            <img
                                                src={product[feature.key]}
                                                alt={`${product.brand} ${product.model}`}
                                                className="h-16 w-16 object-cover mx-auto"
                                            />
                                        ) : (
                                            product[feature.key] || "N/A"
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td className="border p-2 font-semibold bg-gray-50">Add to Cart</td>
                            {sortedCompare.map((product, index) => (
                                <td key={index} className="border p-2 text-center">
                                    <CartButton prodId={product?.prodId}></CartButton>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold bg-gray-50">Remove</td>
                            {sortedCompare.map((product, index) => (
                                <td key={index} className="border p-2 text-center">
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Remove
                                    </button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-8">
                {sortedCompare.map((product, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-4">
                            {product.brand} {product.model}
                        </h3>
                        <div className="space-y-2">
                            {features.map((feature) => (
                                <div key={feature.key} className="flex justify-between items-center">
                                    <span className="font-semibold">{feature.label}:</span>
                                    {feature.key === "image" ? (
                                        <img
                                            src={product[feature.key]}
                                            alt={`${product.brand} ${product.model}`}
                                            className="h-16 w-16 object-cover"
                                        />
                                    ) : (
                                        <span>{product[feature.key] || "N/A"}</span>
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-semibold">Add to Cart:</span>
                                <CartButton prodId={product?.prodId} />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-semibold">Remove:</span>
                                <button
                                    onClick={() => handleRemove(product._id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Compare;
