import React, { useEffect } from "react";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Recommend from "./components/recommend/Recommend";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Testimonials from "./components/testimonials/Testimonials";
import scrollreveal from "scrollreveal";
export default function App() {
    useEffect(() => {
        const sr = scrollreveal({
            origin: "top",
            distance: "80px",
            duration: 2000,
            reset: true,
        });
        sr.reveal(
            `
        nav,
        #hero,
        #services,
        #recommend,
        #testimonials,
        footer
        `,
            {
                opacity: 0,
                interval: 300,
            }
        );
    }, []);
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <Hero />
            <Testimonials />
            <Recommend />
            <Footer />
        </div>
    );
}
