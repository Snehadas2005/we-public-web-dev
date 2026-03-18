import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NEUE = `"Neue", "Neue Haas Grotesk", "Helvetica Neue", Arial, sans-serif`;

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
      }, 120);
      return;
    }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: "60px",
    display: "flex",
    alignItems: "center",
    padding: "0 2.4vw",
    background: scrolled ? "rgba(248,248,246,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
    transition: "background 0.35s ease, border-color 0.35s ease",
    fontFamily: NEUE,
    fontStyle: "normal",
  };

  const linkBase = {
    fontFamily: NEUE,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "13px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#111",
    textDecoration: "none",
    cursor: "pointer",
    transition: "opacity 0.2s",
    whiteSpace: "nowrap",
  };

  const mobileLinkBase = {
    ...linkBase,
    fontSize: "22px",
    letterSpacing: "0.06em",
    display: "block",
    padding: "10px 0",
  };

  return (
    <>
      <nav style={navStyle}>

        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/we.png" alt="WorkshopEdge" style={{ height: "22px", objectFit: "contain" }} />
            <span style={{
              fontFamily: NEUE,
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#111",
            }}>
              workshopedge
            </span>
          </div>
        </Link>

        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "3.2vw",
          alignItems: "center",
        }} className="nav-center-links">
          <a onClick={() => scrollTo("hero")} style={linkBase}>Home</a>
          <Link to="/pricing" style={linkBase}>Pricing &amp; Plans</Link>
          <Link to="/contact" style={linkBase}>Contact us</Link>
        </div>

        <Link
          to="/contact"
          style={{
            ...linkBase,
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.06em",
            marginLeft: "auto",
            borderBottom: "1.5px solid #111",
            paddingBottom: "1px",
          }}
          className="nav-start-trial"
        >
          ↗ START TRIAL
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-mobile-toggle"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            marginLeft: "auto",
            display: "none",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Menu"
        >
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "#111", transition: "transform 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "#111", opacity: mobileOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "#111", transition: "transform 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
        </button>

      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "#F8F8F6",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 8vw",
          gap: "6px",
        }}>
          <a onClick={() => scrollTo("hero")} style={mobileLinkBase}>HOME</a>
          <Link to="/pricing" onClick={() => setMobileOpen(false)} style={mobileLinkBase}>PRICING &amp; PLANS</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} style={mobileLinkBase}>CONTACT US</Link>
          <div style={{ marginTop: "24px" }}>
            <Link to="/contact" onClick={() => setMobileOpen(false)} style={{
              ...mobileLinkBase,
              fontWeight: 700,
              borderBottom: "2px solid #111",
              paddingBottom: "2px",
            }}>
              ↗ START TRIAL
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-center-links { display: none !important; }
          .nav-start-trial  { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}