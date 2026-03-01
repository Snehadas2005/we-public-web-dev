import { Routes, Route } from "react-router-dom";

/* ===== Public website ===== */
import Navbar from "./components/Navbar";
import LandingIntro from "./components/LandingIntro";
import Features from "./components/Features";
import Packages from "./components/Packages";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";

/* ===== Public Home Wrapper ===== */
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
