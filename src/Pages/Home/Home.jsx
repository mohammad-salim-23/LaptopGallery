import Find from "../Find/Find";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Find></Find>
            <Category></Category>
        </div>
    );
};

export default Home;