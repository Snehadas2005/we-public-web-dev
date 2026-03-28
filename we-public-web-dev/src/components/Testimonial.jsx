import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

      <section className="testimonial-section" style={{ borderTop: 'none', boxShadow: 'none' }}>
        <div className="container">
          <div className="testimonial-header" style={{ borderTop: 'none', margin: '0 0 3rem 0', paddingTop: '0' }}>
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


      <style>{`
        .workshop-cta-section {
          background: #E5F1FF;
          width: 100%;
          padding: 120px 6vw;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .workshop-cta-card {
           /* No longer a card, but a container for the full-width section */
          max-width: 1280px;
          margin: 0 auto;
        }
        .workshop-cta-headline {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(24px, 4vw, 60px);
          font-weight: 700;
          color: #222222ff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .workshop-cta-subheadline {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(15px, 1.1vw, 18px);
          color: rgba(33, 33, 33, 0.85);
          max-width: 650px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }
        .workshop-cta-video-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto 40px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          background: #222;
          cursor: pointer;
          position: relative;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .workshop-cta-video {
          width: 100%;
          display: block;
          pointer-events: none;
        }
        .workshop-cta-btn {
          background: #ffffff;
          color: #000000;
          border: none;
          font-family: 'Epilogue', sans-serif;
          font-weight: 700;
          font-size: 16px;
          padding: 18px 50px;
          border-radius: 100px; /* Pill shape for premium feel */
          cursor: pointer;
          transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .workshop-cta-btn:hover {
          transform: translateY(-2px);
          background: #f8f8f8;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        @media (max-width: 768px) {
          .workshop-cta-section {
            padding: 80px 6vw;
          }
        }
      `}</style>

      <div className="workshop-cta-section">
        <section className="workshop-cta-card">
          <h2 className="workshop-cta-headline">
            Move toward a more <br /> connected, modern garage
          </h2>
          <p className="workshop-cta-subheadline">
            WorkshopEdge connects operations, customers, data, and your digital presence into one structured system.
          </p>
          
          <Link to="/videos" className="workshop-cta-video-container" style={{ display: 'block' }}>
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