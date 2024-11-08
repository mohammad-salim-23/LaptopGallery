import { useEffect, useState } from "react";
import Find from "../Find/Find";
import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import FeaturedCard from "./FeaturedCard/FeaturedCard";
import MarqueeText from "./Marquee/MarqueeText";
import Marquee from "react-fast-marquee";
import Category from "./Category/Category";

const Home = () => {


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
            <Marquee className="bg-primary">
                <MarqueeText></MarqueeText>
            </Marquee>
            <Banner></Banner>
            <Category></Category>
            <FeaturedCard></FeaturedCard>
            <Faq></Faq>
            <Find></Find>
            

            <div className="relative">

                {showButton && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-500 animate-bounce"
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