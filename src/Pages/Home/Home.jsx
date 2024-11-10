import { useEffect, useState } from "react";
import Find from "../Find/Find";
import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import FeaturedCard from "./FeaturedCard/FeaturedCard";
import MarqueeText from "./Marquee/MarqueeText";
import Marquee from "react-fast-marquee";
import PhoneSection from "./PhonSection/PhoneSection";

const Home = () => {
    document.title = `Laptop Gallery || Home`;
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <div>
            <Marquee className="h-12 my-4">
                <MarqueeText></MarqueeText>
            </Marquee>
            <Banner></Banner>
            <div>
                <h2 className="container border-b-2 mx-auto px-4 text-xl uppercase py-6 mt-5 md:text-2xl ">Choose your desired laptop</h2>

                <FeaturedCard></FeaturedCard>
            </div>
            <div>
                <h2 className="container border-b-2 mx-auto px-4 text-xl uppercase py-6  mt-5 md:text-2xl ">Choose your desired Mobile</h2>

                <PhoneSection></PhoneSection>
            </div>
            <Faq></Faq>
            <Find></Find>


            <div className="relative">

                {showButton && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-primary via-[#42a8e4] to-[#4379F2] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-500 animate-bounce"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                )}
            </div>

        </div>
    );
};

export default Home;