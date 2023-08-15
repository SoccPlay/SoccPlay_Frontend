import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import Hero from "../../components/hero/Hero";
import Recommend from "../../components/recommend/Recommend";
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
      <Recommend />
      <Recommend />
      <Recommend />
      <Footer />
    </div>
  );
};

export default Homepage;
