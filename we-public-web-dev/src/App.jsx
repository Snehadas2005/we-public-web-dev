import { Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import LandingIntro from "./components/LandingIntro";
import Features from "./components/Features";
import Packages from "./components/Packages";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";


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
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
