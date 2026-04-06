import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the massive text with scroll
      gsap.fromTo(
        brandRef.current,
        {
          yPercent: 30,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .footer-v3-root {
          background: #f5f5f3; 
          padding: 80px 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* ── Floating White Card ── */
        .footer-v3-card {
          background: #ffffff;
          width: 94%;
          max-width: 1280px;
          border-radius: 40px;
          padding: 60px 6vw 40px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.02);
          z-index: 10;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .footer-v3-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 60px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: left;
        }

        .footer-logo-img {
          height: 60px;
          width: auto;
          display: block;
          margin-bottom: 0.5rem;
          object-fit: contain;
          margin-left: 0;
        }

        .footer-brand-desc {
          font-family: 'Epilogue', sans-serif;
          font-size: 14px;
          color: rgba(0,0,0,0.5);
          line-height: 1.6;
          max-width: 320px;
        }

        .footer-newsletter-wrap {
          display: flex;
          gap: 0;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
          max-width: 300px;
          margin-top: 1rem;
        }

        .footer-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 10px 14px;
          font-size: 13px;
          font-family: 'Epilogue', sans-serif;
        }

        .footer-subscribe-btn {
          background: #3C95E8;
          color: #fff;
          border: none;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .footer-subscribe-btn:hover {
          background: #3C95E8;
        }

        .footer-nav-col h4 {
          font-family: 'Epilogue', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.3);
          margin-bottom: 1.5rem;
        }

        .footer-nav-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-nav-col ul li a {
          font-family: 'Epilogue', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-nav-col ul li a:hover {
          color: #3C95E8;
          padding-left: 4px;
        }

        .footer-social-icon {
          color: #3C95E8;
          font-size: 16px;
        }

        .footer-card-divider {
          height: 1px;
          background: rgba(0,0,0,0.05);
          margin-bottom: 30px;
        }

        .footer-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy {
          font-family: 'Epilogue', sans-serif;
          font-size: 12px;
          color: rgba(0,0,0,0.4);
        }

        .footer-legal-links {
          display: flex;
          gap: 24px;
        }

        .footer-legal-links a {
          font-family: 'Epilogue', sans-serif;
          font-size: 12px;
          color: rgba(0,0,0,0.4);
          text-decoration: none;
        }

        /* ── Massive Blurred Text ── */
        .footer-v3-bg-text-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          pointer-events: none;
        }

        .footer-v3-bg-text {
          font-family: 'Brunson', sans-serif;
          font-weight: 800;
          font-size: clamp(55px, 13vw, 218px);
          letter-spacing: -0.05em;
          line-height: 0.75;
          text-align: center;
          color: rgba(0, 0, 0, 0.1);
          background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: blur(2px);
          margin-bottom: -0.08em;
          will-change: transform, opacity;
        }

        @media (max-width: 900px) {
          .footer-v3-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-brand-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .footer-v3-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-brand-col {
            grid-column: span 1;
          }
          .footer-v3-card {
            border-radius: 24px;
            padding: 40px 6vw 30px;
          }
          .footer-card-bottom {
            flex-direction: column-reverse;
            gap: 1.5rem;
            text-align: center;
          }
        }
      `}</style>

      <div className="footer-v3-root" ref={footerRef}>
        <div className="footer-v3-card">
          <div className="footer-v3-grid">
            <div className="footer-brand-col">
              <img src="/we.png" alt="WorkshopEdge Logo" className="footer-logo-img" />
              <p className="footer-brand-desc">
                WorkshopEdge is India's most powerful workshop management platform, built to modernize auto repair businesses of all sizes.
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#000', marginBottom: '8px' }}>Stay Updated</p>
                <div className="footer-newsletter-wrap">
                  <input type="email" placeholder="your@email.com" className="footer-input" />
                  <button className="footer-subscribe-btn">Subscribe</button>
                </div>
              </div>
            </div>

            <div className="footer-nav-col">
              <h4>Product</h4>
              <ul>
                <li><Link to="/customer">Customer</Link></li>
                <li><Link to="/pricing">Pricing & Plans</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/">Home</Link></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/media">Media</Link></li>
                <li><Link to="/app">App</Link></li>
                <li><Link to="/cloud">Cloud</Link></li>
                <li><Link to="/branch">Branch</Link></li>
                <li><Link to="/domain">Domain</Link></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4>Socials</h4>
              <ul>
                <li><a href="#"><i className="bi bi-facebook footer-social-icon"></i>Facebook</a></li>
                <li><a href="#"><i className="bi bi-instagram footer-social-icon"></i>Instagram</a></li>
                <li><a href="#"><i className="bi bi-linkedin footer-social-icon"></i>LinkedIn</a></li>
                <li><a href="#"><i className="bi bi-youtube footer-social-icon"></i>YouTube</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:+916361832517"><i className="bi bi-telephone footer-social-icon"></i>+91 6361832517</a></li>
                <li><a href="mailto:contact@dev.workshopedge.com"><i className="bi bi-envelope footer-social-icon"></i>contact@dev.workshopedge.com</a></li>
                <li><span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}><i className="bi bi-geo-alt footer-social-icon"></i>Bangalore, India</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-card-divider" />

          <div className="footer-card-bottom">
            <span className="footer-copy">
              © {new Date().getFullYear()} WORKSHOPEDGE · All Rights Reserved
            </span>
          </div>
        </div>

        <div className="footer-v3-bg-text-container">
          <span className="footer-v3-bg-text" ref={brandRef}>
            WorkshopEdge
          </span>
        </div>
      </div>
    </>
  );
}