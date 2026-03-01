import { useState, useEffect, useRef } from "react";
import "../home.css";

const testimonials = [
  {
    text: "WorkshopEdge transformed our operations quickly. Their exceptional administrative support, bookkeeping, and recruiting services significantly improved our processes and boosted lead conversion rates. Their integrity, professionalism, and tailored approach set them apart, making them valuable partners in our growth.",
    garage: "MOTOR GARAGE",
    owner: "John Doe, Owner",
    logo: "/grage-moto-logo.webp"
  },
  {
    text: "Since switching to WorkshopEdge, our workshop's efficiency has skyrocketed. The administrative support is second to none, and our bookings have increased by 40% in just three months. They truly understand the needs of workshop owners.",
    garage: "ADVANCED AUTO",
    owner: "Sarah Smith, Manager",
    logo: "/grage-moto-logo.webp"
  },
  {
    text: "The recruiting services provided by the team were instrumental in finding top-tier mechanics for our growing business. Their professional approach and deep industry knowledge made all the difference. Highly recommended for any serious garage owner.",
    garage: "ELITE MECHANICS",
    owner: "Mike Ross, Founder",
    logo: "/grage-moto-logo.webp"
  }
];

const AUTO_INTERVAL = 5000;

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index) => {
    setActiveIndex(index);
    startTimer();
  };

  const prev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((activeIndex + 1) % testimonials.length);

  const current = testimonials[activeIndex];

  return (
    <div className="testimonial-wrapper" id="contact">

      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-header">
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


      <section className="cta-section container">
        <h2 className="section-title">Stop losing time to<br />paperwork</h2>
        <p className="section-desc">Join thousands of workshop owners who run their business on WorkshopEdge.</p>

        <div className="cta-buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Demo</button>
        </div>

        <div className="dashboard-preview">
          <div className="browser-mock">
            <div className="placeholder-box dashboard-placeholder">
              Dashboard Preview (To be added later)
            </div>
          </div>
          <div className="floating-phone-mock">
            <i className="bi bi-phone floating-phone-icon"></i>
          </div>
        </div>
      </section>
    </div>
  );
}