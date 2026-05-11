import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCms } from "../context/CmsContext";
import "../style/footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const { cmsData } = useCms();

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
      <div className="footer-v3-root" ref={footerRef}>
        <div className="footer-v3-card">
          <div className="footer-v3-grid">
            <div className="footer-brand-col">
              <img src="/we.png" alt="WorkshopEdge Logo" className="footer-logo-img" />
              <p className="footer-brand-desc">
                WorkshopEdge is India's most powerful workshop management platform, built to modernize auto repair businesses of all sizes.
              </p>
              <div className="footer-newsletter-block">
                <p className="footer-newsletter-title">Stay Updated</p>
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
                <li><a href={cmsData.social_facebook} target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook footer-social-icon"></i>Facebook</a></li>
                <li><a href={cmsData.social_instagram} target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram footer-social-icon"></i>Instagram</a></li>
                <li><a href={cmsData.social_linkedin} target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin footer-social-icon"></i>LinkedIn</a></li>
                <li><a href={cmsData.social_youtube} target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube footer-social-icon"></i>YouTube</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-col">
              <h4>Contact</h4>
              <ul>
                <li><span><i className="bi bi-telephone footer-social-icon"></i>{cmsData.contact_phone}</span></li>
                <li><span><i className="bi bi-envelope footer-social-icon"></i>{cmsData.contact_email}</span></li>
                <li><span className="footer-contact-address"><i className="bi bi-geo-alt footer-social-icon"></i>{cmsData.contact_address}</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-card-divider" />

          <div className="footer-card-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} WORKSHOPEDGE · All Rights Reserved
              <span className="footer-copy-sep"> | </span>
              <Link to="/terms-conditions" className="footer-copy-link">
                Terms and Condition
              </Link>
              <span className="footer-copy-sep"> | </span>
              <Link to="/privacy-policy" className="footer-copy-link">
                Privacy Policy
              </Link>
            </p>
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