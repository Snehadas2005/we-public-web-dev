import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../home.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: element.offsetTop - 70, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      window.scrollTo({ top: element.offsetTop - 70, behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/we.png" alt="WE Logo" />
          <span>WORKSHOPEDGE</span>
        </Link>


        <button
          className="mobile-toggle d-lg-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${mobileMenuOpen ? "bi-x" : "bi-list"}`}></i>
        </button>


        <ul className="nav-links d-none d-lg-flex">
          <li><a onClick={() => scrollToDiv("hero")}>Home</a></li>
          <li><Link to="/pricing">Pricing & Plans</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li className="nav-dropdown">
            <a className="nav-dropdown-trigger">
              Resources <i className="bi bi-chevron-down chevron-icon"></i>
            </a>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item-static">Mobile app</span></li>
              <li><span className="dropdown-item-static">Website</span></li>
            </ul>
          </li>
        </ul>


        {/* Backdrop for mobile menu */}
        <div 
          className={`mobile-menu-backdrop ${mobileMenuOpen ? "active" : ""}`} 
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        <div className={`mobile-menu d-lg-none ${mobileMenuOpen ? "active" : ""}`}>
          <a onClick={() => scrollToDiv("hero")}>Home</a>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          <div className="mobile-nav-actions">
            <a href={import.meta.env.VITE_LOGIN_URL}>Sign in</a>
            <Link to="/contact" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>Start Trial</Link>
          </div>
        </div>

        <div className="nav-actions d-none d-lg-flex">
          <a href={import.meta.env.VITE_LOGIN_URL} className="btn-signin">Sign in</a>
          <Link to="/contact" className="btn-primary">Start Trial</Link>
        </div>
      </div>
    </nav>
  );
}
