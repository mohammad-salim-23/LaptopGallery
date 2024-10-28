import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';

const slidesData = [
    {
        image: "https://www.startech.com.bd/image/cache/catalog/home/queue-banner-home-service-982x500.png",
    },
    {
        image: "https://www.startech.com.bd/image/cache/catalog/home/happy-hour-june-982x500.webp",
    },
    {
        image: "https://img.freepik.com/free-photo/female-hand-typing-keyboard-laptop_1150-15742.jpg?t=st=1729861804~exp=1729865404~hmac=21c5ffd06bb3982c69d5a7b4d17a4b39dc67f7b80a6b37c711d5d019d74dc965&w=1380",
    }
];

const Banner = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row mt-10 space-y-6 lg:space-y-0 lg:space-x-6">
                <div className="lg:w-1/4 w-full">
                    <div className="bg-yellow-200 pt-6   rounded-md shadow-md mb-6 lg:mb-0">
                        <h1 className="font-semibold text-center text-lg text-black">Compare Products</h1>
                        <p className="mt-1 text-center text-gray-600 text-sm">Choose Two Products to Compare</p>

                        <div className="p-4">
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search Product..."
                                    className="w-full p-3 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute right-3 top-3 text-gray-400">
                                <IoMdSearch className='text-3xl' />
                                </span>
                            </div>

                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search Product..."
                                    className="w-full p-3 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute right-3 top-3 text-gray-400">
                                <IoMdSearch className='text-3xl' />
                                </span>
                            </div>

                            <button className="w-full p-3 font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors my-3 md:my-0">
                                View Comparison
                            </button>
                        </div>
                    </div>

                    <div className="h-1/2 lg:my-6 md:my-4 my-2">
                        <Link>
                            <img
                                src="https://www.startech.com.bd/image/catalog/home/banner/small/Shape-Your-Career-with-Us.png1.webp"
                                alt=""
                                className="w-full rounded-md shadow-md"
                            />
                        </Link>
                    </div>
                </div>

                <div className="lg:w-3/4 w-full">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="rounded-md shadow-md"
                    >
                        {slidesData.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="h-72 sm:h-80 md:h-96 lg:h-[34rem] bg-cover bg-center rounded-md"
                                    style={{
                                        backgroundImage: `url("${slide.image}")`,
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Banner;
