import { useState } from "react";

const Image = ({ images }) => {

    const imagesArray = Object.values(images);   

    const [currentImage, setCurrentImage] = useState(0);

    const handleImageChange = (index) => {
        setCurrentImage(index);
    };

    return (
        <div className="mx-auto container h-full flex flex-col-reverse md:flex-row items-center">
            {/* Left Side - Thumbnails */}
            <div className="flex md:flex-col space-x-4 md:space-y-4 md:space-x-0">
                {imagesArray.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => handleImageChange(index)}
                        className={`border ${currentImage === index ? "border-blue-500" : "border-gray-200"} rounded-lg p-1`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-24 h-20 object-cover rounded-md"
                        />
                    </button>
                ))}
            </div>

            {/* Right Side - Main Image Display */}
            <div className="relative h-96 w-full md:ml-4 mt-4 md:mt-0 flex justify-center items-center">
                <div className="w-full h-full overflow-hidden rounded-lg shadow-md">
                    {imagesArray.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentImage === index ? "opacity-100" : "opacity-0"}`}
                        >
                            <img
                                src={img}
                                alt={`Item Image ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Image;
