import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "./utils/Navbar";
import LandingIntro from "./utils/LandingIntro";
import Features from "./utils/Features";
import Numbers from "./utils/Numbers";
import Packages from "./utils/Packages";
import Testimonial from "./utils/Testimonial";
import Footer from "./utils/Footer";
import Comparison from "./utils/Comparison";

const Pricing = lazy(() => import("./components/Pricing"));
const Contact = lazy(() => import("./components/Contact"));
const Media = lazy(() => import("./components/Media"));
const Cloud = lazy(() => import("./components/Cloud"));
const Branch = lazy(() => import("./components/Branch"));
const AppDetails = lazy(() => import("./components/AppDetails"));
const Domain = lazy(() => import("./components/Domain"));
const Customer = lazy(() => import("./components/Customer"));
const BlogList = lazy(() => import("./components/BlogList"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const TermsConditions = lazy(() => import("./components/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));

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
  const [featuresReady, setFeaturesReady] = useState(false);

  useEffect(() => {
    initLenis();
    return () => {};
  }, []);

  return (
    <>
      <Navbar />
      <LandingIntro />
      <Numbers />
      <Features onReady={() => setFeaturesReady(true)} />

      {featuresReady && (
        <>
          <Packages />
          <Comparison />
          <Testimonial />
          <Footer />
        </>
      )}
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

// ── Media ───────────────────────────────────────────────────────────────
function MediaPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Media />;
}

// ── Domain ───────────────────────────────────────────────────────────────

function DomainPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Domain />;
}

// ── Customer ───────────────────────────────────────────────────────────────

function CustomerPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Customer />;
}

// ── Cloud ────────────────────────────────────────────────────────────────
function CloudPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Cloud />;
}

// ── Branch ───────────────────────────────────────────────────────────────
function BranchPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <Branch />;
}

// ── App Details ──────────────────────────────────────────────────────────
function AppDetailsPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <AppDetails />;
}

function BlogListPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <BlogList />;
}

function BlogPostPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <BlogPost />;
}

function TermsConditionsPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <TermsConditions />;
}

function PrivacyPolicyPage() {
  useEffect(() => { initLenis(); return () => {}; }, []);
  return <PrivacyPolicy />;
}



export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fff" }} aria-hidden="true" />}>
        <Routes>
          <Route path="/"          element={<Home />}        />
          <Route path="/pricing"   element={<PricingPage />} />
          <Route path="/contact"   element={<ContactPage />} />
          <Route path="/media"     element={<MediaPage />}  />
          <Route path="/cloud"     element={<CloudPage />}   />
          <Route path="/branch"    element={<BranchPage />} />
          <Route path="/app"       element={<AppDetailsPage />} />
          <Route path="/domain"   element={<DomainPage/>} />
          <Route path="/customer"   element={<CustomerPage/>} />
          <Route path="/blog"       element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </Suspense>
    </>
  );
}