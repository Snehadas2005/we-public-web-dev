import { useState, useEffect, useRef } from "react";
import "../home.css";

const testimonials = [
  {
    text: "WorkshopEdge has completely streamlined our workshop floor. Their backend support and bookkeeping are top-notch, allowing me to focus on the technical side. We've seen a massive jump in customer trust and lead conversions. They aren't just a service provider; they feel like part of our core team.",
    garage: "The Workshop Automotive",
    owner: "Arjun Mehta, Proprietor",
    logo: "/theworkshop.png"
  },
  {
    text: "Since we started with WorkshopEdge, our service bay efficiency has reached a new level. Their administrative handling is seamless, and our monthly bookings have grown by nearly 40%. They truly understand the local Indian market and the specific challenges we face with parts and scheduling.",
    garage: "Workshop Automotive",
    owner: "Rajesh Sharma, Managing Director",
    logo: "/automotive.avif"
  },
  {
    text: "Finding skilled mechanics was our biggest bottleneck until WorkshopEdge stepped in. Their recruiting services helped us onboard three senior technicians who are experts in modern engine diagnostics. For any garage owner looking to scale professionally in India, this is the right partner.",
    garage: "Motor Garage & Services",
    owner: "Vikram Singh, Founder",
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
          <a href="/contact"><button className="btn-primary">Get Started</button></a>
        </div>

        <div className="dashboard-preview">
          <div className="browser-mock">
            <img src="/website-preview.png" alt="WorkshopEdge Dashboard" className="preview-image" />
          </div>
          <div className="floating-phone-mock">
            <img src="/mobile-preview.png" alt="WorkshopEdge Mobile App" className="mobile-preview-image" />
          </div>
        </div>
      </section>
    </div>
  );
}