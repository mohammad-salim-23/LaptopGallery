import NavBar from "../../Components/Shared/NavBar/NavBar";
import Find from "../Find/Find";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
            <Banner></Banner>
            <Find></Find>
            <Category></Category>
        </div>
    );
};

export default Home;