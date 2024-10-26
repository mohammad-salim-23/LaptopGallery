import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


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
    ,
    {
        image: "https://img.freepik.com/free-photo/businesswoman-working-office-with-smile-while-sitting_1150-14793.jpg?t=st=1729861837~exp=1729865437~hmac=62185f3e360155042a5bd01187437eb8dbe64453a2fa6cfcbc6d765fb8eb2c59&w=1380",
    }

];

const Banner = () => {
    return (
        <div className="container mx-auto">
            {/*  */}
            <div className="flex mt-10">

                <div className="mr-6 w-[25%]">

                    <div className='h-[53%] bg-[#FFE8A1] pt-6'>
                        <h1 className='font-semibold text-center'>Compare Products</h1>
                        <p className='mt-1 opacity-60 text-center'>Choose Two Products to Compare</p>

                        <div className=' p-4 rounded-md'>
                            {/* Search 1 */}
                            <div className='relative items-center mb-4 ml-4 cursor-pointer'>
                                <input
                                    type='text'
                                    placeholder='Search and Select Product'
                                    className='w-72 p-3 pl-4 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                                />
                                <span className='absolute right-3 top-3 text-gray-400 mr-8'>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                                        <path
                                            fillRule='evenodd'
                                            d='M12.9 14.32a8 8 0 111.414-1.414l3.025 3.025a1 1 0 11-1.414 1.414l-3.025-3.025zM8 14A6 6 0 108 2a6 6 0 000 12z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </span>
                            </div>


                            <div className='relative items-center mb-4 ml-4 cursor-pointer'>
                                <input
                                    type='text'
                                    placeholder='Search and Select Product'
                                    className='w-72 p-3 pl-4 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                                />
                                <span className='absolute right-3 top-3 text-gray-400 mr-8'>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                                        <path
                                            fillRule='evenodd'
                                            d='M12.9 14.32a8 8 0 111.414-1.414l3.025 3.025a1 1 0 11-1.414 1.414l-3.025-3.025zM8 14A6 6 0 108 2a6 6 0 000 12z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </span>
                            </div>



                            {/* Button */}
                            <button className='w-72 ml-4 p-3 bg-white text-blue-600 font-semibold border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors'>
                                View Comparison
                            </button>
                        </div>

                    </div>

                    <div className=' mt-6 h-[47%]'>
                        <Link>
                            <img src={"https://www.startech.com.bd/image/catalog/home/banner/small/Shape-Your-Career-with-Us.png1.webp"} alt="" className='  w-full' />
                        </Link>
                    </div>

                </div>




                <div className=" w-[75%]">
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
                        className="mySwiper"
                    >
                        {slidesData.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="w-full bg-center bg-cover h-[34rem]  object-cover "
                                    style={{
                                        backgroundImage: `url("${slide.image}")`,
                                    }}
                                >
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Banner;
