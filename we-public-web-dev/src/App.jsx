import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import Navbar from "./components/Navbar";
import LandingIntro from "./components/LandingIntro";
import Features from "./components/Features";
import Packages from "./components/Packages";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function Home() {
  return (
    <>
      <Navbar />
      <LandingIntro />
      <Features />
      <Packages />
      <Testimonial />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
