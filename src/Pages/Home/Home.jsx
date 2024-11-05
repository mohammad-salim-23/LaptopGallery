import CartButton from "../../Components/ReUseComponents/CartButton";
import NavBar from "../../Components/Shared/NavBar/NavBar";
import Find from "../Find/Find";
import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import FeaturedCard from "./FeaturedCard/FeaturedCard";
// import Category from "./Category/Category";

const Home = () => {
    return (
        <div>
            <div className="mb-24">
                <NavBar></NavBar>
            </div>
            <Banner></Banner>
            <FeaturedCard></FeaturedCard>
            <Faq></Faq>
            <Find></Find>
            {/* <Category></Category> */}
        </div>
    );
};

export default Home;