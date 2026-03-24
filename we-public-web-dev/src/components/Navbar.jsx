import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const EP = `"Epilogue","Google Sans","Helvetica Neue",Arial,sans-serif`;

export default function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  // On non-home pages the hero doesn't exist → always dark
  const isHome = location.pathname === "/";
  const pastHero = !isHome || isScrolled;

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const onScroll = () => {
      // Switch to dark mode once user scrolls past 80% of viewport height
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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

  // ── Colour tokens based on scroll state ──────────────────────────────
  const textColor  = pastHero ? "#111111" : "#ffffff";
  const logoFilter = pastHero ? "none"    : "brightness(0) invert(1)";
  const navBg      = pastHero
    ? "rgba(248,248,246,0.94)"
    : "transparent";
  const navBlur    = pastHero ? "blur(14px)" : "none";
  const navBorder  = pastHero ? "1px solid rgba(0,0,0,0.07)" : "none";

  const linkBase = {
    fontFamily: EP,
    fontWeight: 500,
    fontSize: "13px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: textColor,
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "color 0.35s ease, opacity 0.2s",
  };

  const mobileLinkBase = {
    ...linkBase,
    fontSize: "22px",
    letterSpacing: "0.06em",
    display: "block",
    padding: "10px 0",
    color: "#111111",
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "60px",
          display: "flex",
          alignItems: "center",
          padding: "0 2.4vw",
          background: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom: navBorder,
          transition:
            "background 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease",
          fontFamily: EP,
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src="/we.png"
              alt="WorkshopEdge"
              style={{
                height: "22px",
                objectFit: "contain",
                filter: logoFilter,
                transition: "filter 0.45s ease",
              }}
            />
            <span
              style={{
                fontFamily: EP,
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: textColor,
                transition: "color 0.45s ease",
                textAlign: "center",
              }}
            >
              WorkshopEdge
            </span>
          </div>
        </Link>

        {/* Centre links */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "3.2vw",
            alignItems: "center",
          }}
          className="nav-center-links"
        >
          <a onClick={() => scrollTo("hero")} style={linkBase}>Home</a>
          <Link to="/pricing"  style={linkBase}>Pricing &amp; Plans</Link>
          <Link to="/contact"  style={linkBase}>Contact us</Link>
        </div>

        {/* CTA */}
        <Link
          to="/contact"
          style={{
            ...linkBase,
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.06em",
            marginLeft: "auto",
            borderBottom: `1.5px solid ${textColor}`,
            paddingBottom: "1px",
            transition: "color 0.45s ease, border-color 0.45s ease",
          }}
          className="nav-start-trial"
        >
          ↗ START TRIAL
        </Link>

        {/* Hamburger */}
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
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: textColor,
                transition: "transform 0.3s, opacity 0.3s, background 0.45s ease",
                transform:
                  i === 0 && mobileOpen ? "rotate(45deg) translateY(6.5px)"
                  : i === 2 && mobileOpen ? "rotate(-45deg) translateY(-6.5px)"
                  : "none",
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
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
          }}
        >
          <a onClick={() => scrollTo("hero")} style={mobileLinkBase}>HOME</a>
          <Link to="/pricing" onClick={() => setMobileOpen(false)} style={mobileLinkBase}>PRICING &amp; PLANS</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} style={mobileLinkBase}>CONTACT US</Link>
          <div style={{ marginTop: "24px" }}>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              style={{
                ...mobileLinkBase,
                fontWeight: 700,
                borderBottom: "2px solid #111",
                paddingBottom: "2px",
              }}
            >
              ↗ START TRIAL
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-center-links  { display: none !important; }
          .nav-start-trial   { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}