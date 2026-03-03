import { useEffect, useState } from "react";
import "../home.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      window.scrollTo({ top: element.offsetTop - 70, behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/we.png" alt="WE Logo" />
          <span>WORKSHOPEDGE</span>
        </a>


        <button
          className="mobile-toggle d-lg-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${mobileMenuOpen ? "bi-x" : "bi-list"}`}></i>
        </button>


        <ul className="nav-links d-none d-lg-flex">
          <li><a onClick={() => scrollToDiv("hero")}>Home</a></li>
          <li><a onClick={() => scrollToDiv("packages")}>Pricing & Plans</a></li>
          <li><a onClick={() => scrollToDiv("contact")}>Contact Us</a></li>
          <li>
            <a onClick={() => scrollToDiv("contact")}>
              Resources <i className="bi bi-chevron-down chevron-icon"></i>
            </a>
          </li>
        </ul>


        {/* Backdrop for mobile menu */}
        <div 
          className={`mobile-menu-backdrop ${mobileMenuOpen ? "active" : ""}`} 
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        <div className={`mobile-menu d-lg-none ${mobileMenuOpen ? "active" : ""}`}>
          <a onClick={() => scrollToDiv("hero")}>Home</a>
          <a onClick={() => scrollToDiv("packages")}>Pricing</a>
          <a onClick={() => scrollToDiv("contact")}>Resources</a>
          <div className="mobile-nav-actions">
            <a href={import.meta.env.VITE_LOGIN_URL}>Sign in</a>
            <button className="btn-primary" onClick={() => scrollToDiv("contact")}>Start free</button>
          </div>
        </div>

        <div className="nav-actions d-none d-lg-flex">
          <a href={import.meta.env.VITE_LOGIN_URL} className="btn-signin">Sign in</a>
          <button className="btn-primary" onClick={() => scrollToDiv("contact")}>Start free</button>
        </div>
      </div>
    </nav>
  );
}