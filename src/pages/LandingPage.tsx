import React from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import HowToFindShop from "../components/HowToFindShop";
import HowToRegisterBusiness from "../components/HowToRegisterBusiness";
// import Recommendations from "../components/Recommendations";
// import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const Home: React.FC = () => {
    return (
        <div className="font-body">
            <Header />
            <Categories />
            <div className="text-center my-8">
                <p className="mt-6 text-gray-500 italic">Discover the latest offers and win vouchers in Sri Lankan shops from the comfort of your home.</p>
            </div>
            <div className="my-12">
                <HowToFindShop />
            </div>
            <div className="my-12">
                <HowToRegisterBusiness />
            </div>
            {/* <div className="my-12">
                <Recommendations />
            </div> */}
            {/* <ContactUs /> */}
            <Footer />
        </div>
    );
};

export default Home;
