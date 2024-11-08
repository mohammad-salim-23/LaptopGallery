import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const Category = () => {
    const [product, setProduct] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosPublic.get("/products");
                setProduct(response.data);
            } catch (error) {
                console.error("Internal server error", error);
            }
        };
        fetchProducts();
    }, [axiosPublic]);

    const category = Array.from(new Set(product.map((item) => item.category)))
        .map((category) => product.find((item) => item.category === category));

    return (
        <div className="mt-5 container mx-auto px-4">
            <div className="space-y-3">
                <h2 className="text-2xl font-semibold font-opensans">Featured Category</h2>
                <p>Your Desired Product from Featured Category!</p>
            </div>
            <div className="divider"></div>
            <div className="container mx-auto px-4">
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass=""
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 1024 },
                            items: 6,
                            partialVisibilityGutter: 40,
                        },
                        mobile: {
                            breakpoint: { max: 464, min: 0 },
                            items: 2,
                            partialVisibilityGutter: 30,
                        },
                        tablet: {
                            breakpoint: { max: 1024, min: 512 },
                            items: 3,
                            partialVisibilityGutter: 30,
                        },
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {category.map((item, index) => (

                        <div key={item._id || index} className="flex flex-col justify-center items-center px-4">
                            <Link to={`/category/${item.subCategory}`}>
                                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={item?.image || "default-image.jpg"}
                                        // alt={item.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </Link>
                            <p className="font-medium mt-4">{item.subCategory}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Category;
