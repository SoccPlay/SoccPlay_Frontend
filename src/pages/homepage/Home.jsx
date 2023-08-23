import React from "react";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";
import ShowListNewPitch from "../../components/recommend/ShowListNewPitch";
import ShowListPitchNear from "../../components/recommend/ShowListPitchNear";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

const Homepage = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <Hero />
            <ShowListPitchNear />
            <ShowListNewPitch />
            <Footer />
        </div>
    );
};

export default Homepage;
