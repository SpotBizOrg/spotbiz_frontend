import React from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import HowToFindShop from "../components/HowToFindShop";
import HowToRegisterBusiness from "../components/HowToRegisterBusiness";
import Recommendations from "../components/Recommendations";
import ContactUs from "../components/ContactUs";

const Home: React.FC = () => {
    return(
        <div className="font-body">
            <Header />
	  <Categories />
	  <HowToFindShop />
	  <HowToRegisterBusiness />
	  <Recommendations />
	  <ContactUs />
        </div>
    );
};

export default Home;