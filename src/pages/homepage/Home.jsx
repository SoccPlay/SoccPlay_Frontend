import React from "react";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import ShowListPitchNear from "../../components/recommend/ShowListPitchNear";
import ShowListNewPitch from "../../components/recommend/ShowListNewPitch";
import ShowListPitchRating from "../../components/recommend/ShowListPitchRating";

const Homepage = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Hero />
      <ShowListPitchNear />
      <ShowListNewPitch />
      <ShowListPitchRating />
      <Footer />
    </div>
  );
};

export default Homepage;
