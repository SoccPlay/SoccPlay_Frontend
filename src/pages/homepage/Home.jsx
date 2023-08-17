import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import Hero from "../../components/hero/Hero";
import ShowListPitchNear from "../../components/recommend/ShowListPitchNear";
import Footer from "../../components/footer/Footer";
import ShowListNewPitch from "../../components/recommend/ShowListNewPitch";

const Homepage = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Hero />
      <ShowListPitchNear />
      <ShowListNewPitch/>
      <Footer />
    </div>
  );
};

export default Homepage;
