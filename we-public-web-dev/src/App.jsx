import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar      from "./components/Navbar";
import LandingIntro from "./components/LandingIntro";
import Features    from "./components/Features";
import Numbers     from "./components/Numbers";
import Packages    from "./components/Packages";
import Testimonial from "./components/Testimonial";
import Footer      from "./components/Footer";
import Pricing     from "./pages/Pricing";
import Contact     from "./pages/Contact";
import Videos      from "./pages/Videos";

gsap.registerPlugin(ScrollTrigger);

// ── Global Lenis smooth scroll ────────────────────────────────────────────
let lenisInstance = null;

function initLenis() {
  if (lenisInstance) { lenisInstance.destroy(); lenisInstance = null; }

  lenisInstance = new Lenis({
    duration:        1.1,
    easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel:     true,
    wheelMultiplier: 0.88,
    touchMultiplier: 1.6,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  function raf(time) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);
  return null;
}

// ── Home ──────────────────────────────────────────────────────────────────
function Home() {
  useEffect(() => {
    initLenis();
    return () => {};
  }, []);

  return (
    <>
      <Navbar />
      <LandingIntro />
      <Features />
      <Numbers />
      <Packages />
      <Testimonial />
      <Footer />
    </>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────
function PricingPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Pricing />;
}

// ── Contact ───────────────────────────────────────────────────────────────
function ContactPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Contact />;
}

// ── Videos ───────────────────────────────────────────────────────────────
function VideosPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Videos />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"        element={<Home />}        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/videos"  element={<VideosPage />}  />
      </Routes>
    </>
  );
}