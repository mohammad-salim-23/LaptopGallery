import { CiLocationOn } from 'react-icons/ci';
import img from '../../assets/img.jpg';
import { FaSearch } from 'react-icons/fa';

const Find = () => {
    return (
        <div className="bg-fixed bg-cover bg-center text-white opacity-90 rounded-lg" style={{ backgroundImage: `url(${"https://i.postimg.cc/rsTrKFL5/close-up-world-globe.jpg"})` }}>
            <div className="flex justify-center items-center p-6 md:p-16 md:flex-row flex-col bg-slate-900 bg-opacity-50 rounded-lg my-2">


                {/* Text Content */}
                <div className="mt-3 md:mt-0 text-center md:text-left w-full mx-auto container bg-white bg-opacity-30 p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
                        {/* Icon Section */}
                        <CiLocationOn className="text-6xl font-bold" />

                        {/* Text and Button Section */}
                        <div className="flex flex-col md:flex-row items-start justify-between w-full">
                            {/* Text Section */}
                            <div className="text-left">
                                <h1 className="text-2xl md:text-3xl font-semibold">Physical Stores</h1>
                                <p className="text-lg md:text-xl">Visit Our Store & Get Your Desired IT Product!</p>
                            </div>

                            {/* Button Section */}
                            <div className="mt-3 md:mt-0">
                                <a href="https://maps.app.goo.gl/iMQSgiUeieT959G39" target='blank'>
                                    <button className="flex items-center justify-center text-black cursor-pointer transition-all duration-200 px-6 md:px-10 py-3 md:py-4 rounded-full bg-blue-400 border border-transparent active:scale-95">
                                        <span className="text-lg md:text-2xl">Find Our Store</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 74 74"
                                            height="34"
                                            width="34"
                                            className="ml-2 transition-transform duration-300 ease-in-out"
                                        >
                                            <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
                                            <path
                                                fill="black"
                                                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                            ></path>
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Find;
