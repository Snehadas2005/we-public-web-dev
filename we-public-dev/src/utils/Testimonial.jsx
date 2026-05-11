import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/env";
import "../style/home.css";

const AUTO_INTERVAL = 5000;

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex]   = useState(0);
  const timerRef = useRef(null);

  /* ── fetch ── */
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/testimonials`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success && Array.isArray(json.data)) {
          setTestimonials(
            json.data.map((item) => ({
              text:   item.message,
              logo:   item.image_path,
              garage: "",
              owner:  "",
            }))
          );
        }
      })
      .catch((err) => console.error("Testimonials fetch error:", err));
    return () => { cancelled = true; };
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [testimonials]);

  const goTo = (index) => {
    setActiveIndex(index);
    startTimer();
  };

  const prev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((activeIndex + 1) % testimonials.length);

  const current = testimonials[activeIndex];

  if (!current) return null;

  return (
    <div className="testimonial-wrapper" id="contact">

      <section className="testimonial-section testimonial-section--home">
        <div className="container">
          <div className="testimonial-header testimonial-header--home">
            <span className="section-tag">HEAR IT FROM OUR CLIENTS</span>
            <h2 className="section-title">Known for the best</h2>
          </div>

          <div className="testimonial-card">
            <div className="content">
              <div className="testimonial-quote-icon">
                <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.1 0C14.8 0 9.7 5.1 9.7 11.4C9.7 17.7 14.8 22.8 21.1 22.8H21.5C21.5 29 16.4 34 10.1 34H0V22.8C0 10.2 10.2 0 22.8 0H21.1Z" fill="#3C95E8" fillOpacity="0.3"/>
                  <path d="M47.1 0C40.8 0 35.7 5.1 35.7 11.4C35.7 17.7 40.8 22.8 47.1 22.8H47.5C47.5 29 42.4 34 36.1 34H26V22.8C26 10.2 36.2 0 48.8 0H47.1Z" fill="#3C95E8" fillOpacity="0.3"/>
                </svg>
              </div>
              <p className="testimonial-text">
                &quot;{current.text}&quot;
              </p>
              <div className="testimonial-meta">
                <span className="garage-name">{current.garage}</span>
                <span className="owner-name">{current.owner}</span>
              </div>
            </div>

            <div className="logo-circles">
              <div className="dots-accent"></div>
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3">
                <img src={current.logo} alt={`${current.garage} Logo`} className="testimonial-logo" />
              </div>
            </div>
          </div>

          <div className="slider-navigation">
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => goTo(index)}
                ></div>
              ))}
            </div>
            <div className="slider-arrows">
              <button className="arrow-btn" onClick={prev} aria-label="Previous">
                <i className="bi bi-arrow-left"></i>
              </button>
              <button className="arrow-btn" onClick={next} aria-label="Next">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>


      <div className="workshop-cta-section">
        <section className="workshop-cta-card">
          <h2 className="workshop-cta-headline">
            Move toward a more <br /> connected, modern garage
          </h2>
          <p className="workshop-cta-subheadline">
            WorkshopEdge connects operations, customers, data, and your digital presence into one structured system.
          </p>
          
          <Link to="/media" className="workshop-cta-video-container workshop-cta-video-container--block">
            <video 
              className="workshop-cta-video" 
              src="/garagevideo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
            />
          </Link>

          <a href="/contact">
            <button className="workshop-cta-btn">Get Started</button>
          </a>
        </section>
      </div>
    </div>
  );
}