import React from 'react';
import useCompare from '../../hooks/useCompare';
import CartButton from '../../Components/ReUseComponents/CartButton';

const Compare = () => {
    const [compare, refetch] = useCompare();

    console.log(compare);
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

    
    return (
        <div className="overflow-x-auto p-4 my-24">
            <h2 className="text-2xl font-semibold mb-4">Product Comparison</h2>
            <table className="min-w-full border-collapse border border-gray-200">
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
                </tbody>
            </table>
        </div>
    );
};

export default Compare;
