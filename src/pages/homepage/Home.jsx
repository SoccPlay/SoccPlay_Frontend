import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import Hero from "../../components/hero/Hero";
import ShowListPitchNear from "../../components/recommend/ShowListPitchNear";
import Testimonials from "../../components/testimonials/Testimonials";
import Footer from "../../components/footer/Footer";
import SearchItem from "../../components/searchItem/SearchItem";
import Profile from "../profile/Profile";
const Homepage = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Hero />
      <ShowListPitchNear />
      {/* <ShowListPitchNear />
      <ShowListPitchNear /> */}
      <Footer />
    </div>
  );
};

export default Homepage;
