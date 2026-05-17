import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import "../style/CustomerPage.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Feature items data ───────────────────────────── */
const FEATURES = [
  {
    num: "01",
    img: "/feature1.png",
    imgAlt: "Smart vehicle management dashboard",
    badgeIcon: "bi-car-front-fill",
    badgeText: "My Vehicles",
    title: "Your entire fleet,",
    titleAccent: "one dashboard.",
    desc: "Add every 2-wheeler and 4-wheeler you own. Each vehicle gets its own profile — model, year, odometer, and a complete service timeline you can scroll through anytime with smooth pagination.",
    bullets: [
      "Unlimited vehicle support for bikes and cars",
      "Detailed profiles: Model, Year, and Odometer tracking",
      "Paginated list view for easy fleet management",
    ],
  },
  {
    num: "02",
    img: "/feature2.png", // Ensure you have this asset
    imgAlt: "Secure document locker",
    badgeIcon: "bi-shield-lock-fill",
    badgeText: "Document Locker",
    title: "Secure storage for",
    titleAccent: "your essentials.",
    desc: "Stop hunting for physical papers. Upload high-resolution scans of your insurance, registration, and permits directly to the app. Everything is organized and ready for checkpoints.",
    bullets: [
      "Upload documents up to 20MB per file",
      "Storage for Insurance, Permits, and Vehicle IDs",
      "Quick access at checkpoints or during resale",
    ],
  },
  {
    num: "03",
    img: "/feature3.png",
    imgAlt: "Service history and job card tracking",
    badgeIcon: "bi-journal-check",
    badgeText: "Service Intelligence",
    title: "Track every repair,",
    titleAccent: "every invoice.",
    desc: "View live job card status, repair details, and estimated completion times. Receive detailed digital invoices including spare parts, labor, and taxes for total transparency.",
    bullets: [
      "Real-time job card tracking: see progress and repairs",
      "Detailed invoices with Spares, Services, and Tax breakdowns",
      "Historical vault of all previous service records",
    ],
  },
  {
    num: "04",
    img: "/Book-Appointment.jpeg",
    imgAlt: "Fuel logs, reminders, and booking",
    badgeIcon: "bi-calendar-check-fill",
    badgeText: "Smart Bookings",
    title: "Book with Workshop Edge,",
    titleAccent: "or log your own.",
    desc: "Book appointments with WE-associated garages for instant notifications. Visiting a local shop? You can manually add your own bookings and job cards to keep your history complete.",
    bullets: [
      "Instant notifications for WE-associated garage bookings",
      "Independent service logging for non-network garages",
      "Set custom booking timings and specific service needs",
    ],
  },
];

const CARDS = [
  { 
    icon: "bi-house-fill", 
    title: "Dynamic Home", 
    desc: "View active service status, upcoming appointments, and recent garage visits at a glance." 
  },
  { 
    icon: "bi-chat-dots-fill", 
    title: "Garage Chat", 
    desc: "Message WE-associated garage owners directly to discuss repairs and get real-time updates." 
  },
  { 
    icon: "bi-ticket-perforated-fill", 
    title: "Raise a Ticket", 
    desc: "Need help? Contact Workshop Edge admin directly by raising a support ticket in your settings." 
  },
  { 
    icon: "bi-geo-alt-fill", 
    title: "Smart Discovery", 
    desc: "Filter garages by rating, distance, or your last visit to find the best care for your vehicle." 
  },
  { 
    icon: "bi-receipt", 
    title: "Detailed Invoicing", 
    desc: "Access itemized bills showing sub-totals, taxes, and every spare part replaced during service." 
  },
  { 
    icon: "bi-person-badge-fill", 
    title: "Profile & Address", 
    desc: "Manage your personal details, primary location, and saved addresses for one-tap bookings." 
  },
];

/* ── Drawing line SVG ─────────────────────────────── */
function DrawingLine() {
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    const trigger = ScrollTrigger.create({
      trigger: ".cust-features-section",
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1.5,
      onUpdate: (self) => {
        gsap.set(path, {
          strokeDashoffset: totalLength * (1 - self.progress),
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="cust-weaving-line"
      viewBox="0 0 100 2400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M 50,0 C 50,150 105,200 105,300 C 105,500 -5,700 -5,900 C -5,1100 105,1300 105,1500 C 105,1700 -5,1900 -5,2100 C -5,2300 50,2350 50,2400"
        fill="none"
        stroke="#3C95E8"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

/* ── Main component ───────────────────────────────── */
export default function Customer() {
  const heroRef    = useRef(null);
  const badgeRef   = useRef(null);
  const titleRef   = useRef(null);
  const descRef    = useRef(null);
  const actionsRef = useRef(null);
  const phoneRef   = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    /* ── Hero entrance ─── */
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(badgeRef.current,   { opacity: 0, y: 20 },                        { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(titleRef.current,   { opacity: 0, y: 50, filter: "blur(10px)" },  { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 }, "-=0.3")
      .fromTo(descRef.current,    { opacity: 0, y: 24 },                        { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
      .fromTo(actionsRef.current, { opacity: 0, y: 18 },                        { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
      .fromTo(phoneRef.current,   { opacity: 0, x: 60, scale: 0.92 },           { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)" }, "-=0.8");

    /* ── Stats strip ─── */
    const statItems = document.querySelectorAll(".cust-stat-item");
    statItems.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" }),
      });
    });

    /* ── Feature items: staggered reveal ─── */
    document.querySelectorAll(".cust-feature-item").forEach((item) => {
      const img      = item.querySelector(".cust-feature-img-wrap");
      const num      = item.querySelector(".cust-feature-num");
      const heading  = item.querySelector(".cust-feature-text h3");
      const para     = item.querySelector(".cust-feature-text > p:not(.cust-feature-num)");
      const bullets  = item.querySelector(".cust-feature-bullets");

      gsap.set(img, { opacity: 0, scale: 0.95 });
      gsap.set([num, heading, para, bullets].filter(Boolean), { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(img, { opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" });
          gsap.to([num, heading, para, bullets].filter(Boolean), {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.15,
          });
        },
      });
    });

    /* ── Cards ─── */
    document.querySelectorAll(".cust-card").forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40, scale: 0.95 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.75, delay: (i % 3) * 0.1, ease: "back.out(1.5)" }),
      });
    });

    /* ── Section headers ─── */
    document.querySelectorAll(".cust-reveal-head").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }),
      });
    });

    /* ── Bento grid ─── */
    document.querySelectorAll(".cust-bento-item").forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: (i % 4) * 0.1, ease: "power3.out" }),
      });
    });

    /* ── CTA block ─── */
    ScrollTrigger.create({
      trigger: ".cust-cta-section",
      start: "top 80%",
      once: true,
      onEnter: () => gsap.fromTo(".cust-cta-inner", { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" }),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="cust-page">
      <Navbar />

      {/* ─── HERO (white, editorial) ──────────────── */}
      <section className="cust-hero" ref={heroRef}>
        {/* Subtle dot grid */}
        <div className="cust-hero__dot-grid" aria-hidden="true" />

        <div className="cust-hero__inner">
          {/* Left: copy */}
          <div className="cust-hero__left">
            <div ref={badgeRef} className="cust-hero__badge" style={{ opacity: 0 }}>
              <div className="cust-hero__badge-dot" />
              <span>Vehicle Owner App</span>
            </div>

            <h1 ref={titleRef} className="cust-hero__title" style={{ opacity: 0 }}>
              Your vehicles.
              <span className="cust-hero__title-accent">Your records.</span>
              Always clear.
            </h1>

            <p ref={descRef} className="cust-hero__desc" style={{ opacity: 0 }}>
              A dedicated mobile experience to track service and fuel, store vehicle documents safely, and get reminders that match how you actually use each vehicle — without juggling paper, random photos, and memory.
            </p>

            <div ref={actionsRef} className="cust-hero__actions" style={{ opacity: 0 }}>
              <Link to="/contact" className="cust-btn-primary">
                <i className="bi bi-phone-fill" /> Get the App
              </Link>
              <a href="#features" className="cust-btn-outline">
                <i className="bi bi-arrow-down" /> Explore Features
              </a>
            </div>
          </div>

          {/* Right: phone mock */}
          <div className="cust-hero__phone-wrap">
            <div ref={phoneRef} className="cust-hero__phone" style={{ opacity: 0 }}>
              <div className="cust-phone__island" />
              <div className="cust-phone__screen">
                {/* Status Bar */}
                <div className="cust-phone__status-bar">
                  <span>WorkshopEdge</span>
                  <span>9:41</span>
                </div>

                <div className="cust-phone__screen-body">
                  {/* Phone Header */}
                  <div className="cust-phone__app-header">
                    <div className="cust-phone__user-info">
                      <div className="cust-phone__logo-small">WE</div>
                      <span className="cust-phone__user-name">Alex Johnson</span>
                    </div>
                    <div className="cust-phone__notif-bell">
                      <i className="bi bi-bell" />
                      <div className="cust-phone__notif-dot" />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="cust-phone__quick-actions">
                    {[
                      { icon: "bi-file-earmark-text-fill", label: "Document", color: "#2563EB" },
                      { icon: "bi-person-fill", label: "Profile", color: "#2563EB" },
                      { icon: "bi-house-fill", label: "Garages", color: "#2563EB" },
                      { icon: "bi-car-front-fill", label: "Vehicles", color: "#2563EB" },
                    ].map((item) => (
                      <div key={item.label} className="cust-phone__action-item">
                        <div className="cust-phone__action-icon" style={{ backgroundColor: item.color }}>
                          <i className={`bi ${item.icon}`} />
                        </div>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Services */}
                  <div className="cust-phone__section-label">Active Services</div>
                  <div className="cust-phone__active-service-card">
                    <div className="cust-phone__car-row">
                      <div className="cust-phone__car-img-placeholder">
                        <i className="bi bi-car-front" />
                      </div>
                      <div className="cust-phone__car-details">
                        <div className="cust-phone__car-name-row">
                          <h4>Toyota Camry</h4>
                          <span className="cust-phone__badge-electric">ELECTRIC</span>
                        </div>
                        <p className="cust-phone__car-id">ABC-1234</p>
                      </div>
                    </div>
                    <div className="cust-phone__status-row">
                      <span className="cust-phone__badge-status">IN PROGRESS</span>
                      <span className="cust-phone__date-label">02/25/2026</span>
                    </div>
                    <button className="cust-phone__track-btn">Track Progress</button>
                  </div>

                  {/* Upcoming Appointment */}
                  <div className="cust-phone__section-label">Upcoming Appointment</div>
                  <div className="cust-phone__appointment-card">
                    <div className="cust-phone__loc-row">
                      <i className="bi bi-geo-alt-fill" />
                      <span>Downtown Service Center</span>
                    </div>
                    <div className="cust-phone__appt-info">
                      <div className="cust-phone__date-box">
                        <span className="cust-phone__month">MAY</span>
                        <span className="cust-phone__day">24</span>
                      </div>
                      <div className="cust-phone__appt-details">
                        <h4>Multi-point Inspection</h4>
                        <p>Friday • 09:30 AM</p>
                      </div>
                    </div>
                    <div className="cust-phone__appt-actions">
                      <button className="cust-phone__appt-btn">Completed</button>
                      <button className="cust-phone__appt-btn secondary">Cancel</button>
                    </div>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="cust-phone__nav">
                  {[
                    { icon: "bi-house-door-fill", label: "Home", active: true },
                    { icon: "bi-calendar3", label: "Bookings", active: false },
                    { icon: "bi-clock-history", label: "History", active: false },
                    { icon: "bi-gear-fill", label: "Settings", active: false },
                  ].map(({ icon, label, active }) => (
                    <div key={label} className={`cust-phone__nav-item${active ? " active" : ""}`}>
                      <i className={`bi ${icon}`} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE SHOWCASE (with drawing line) ─── */}
      <section className="cust-features-section" id="features">
        {/* Drawing SVG line — positioned absolutely behind items */}
        <DrawingLine />

        {FEATURES.map((feat, i) => {
          // Even index (0, 2…) → text left, image right
          // Odd index  (1, 3…) → image left, text right
          const isEven = i % 2 === 0;

          return (
            <div
              key={feat.num}
              className={`cust-feature-item ${isEven ? "cust-feature-item--text-left" : "cust-feature-item--image-left"}`}
            >
              {/* Image */}
              <div className="cust-feature-img-wrap">
                <img src={feat.img} alt={feat.imgAlt} loading="lazy" />
              </div>

              {/* Text */}
              <div className="cust-feature-text">
                <p className="cust-feature-num">{feat.num} — 04</p>
                <h3>
                  {feat.title}
                  <br />
                  <span>{feat.titleAccent}</span>
                </h3>
                <p>{feat.desc}</p>
                <div className="cust-feature-bullets">
                  {feat.bullets.map((b) => (
                    <div key={b} className="cust-feature-bullet">
                      <div className="cust-feature-bullet-dot">
                        <i className="bi bi-check2" />
                      </div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── CARDS GRID ───────────────────────────── */}
      <section className="cust-cards-section">
        <div className="cust-cards-inner">
          <div className="cust-cards-header cust-reveal-head">
            <span className="cust-section-eyebrow">Everything Inside</span>
            <h2 className="cust-section-title">
              Built for vehicle owners
              <br />
              <span>who want control.</span>
            </h2>
            <p className="cust-section-desc" style={{ margin: "0 auto" }}>
              Six more reasons the Workshop Edge customer app makes every ride easier to manage.
            </p>
          </div>
          <div className="cust-cards-grid">
            {CARDS.map((card) => (
              <div key={card.title} className="cust-card">
                <div className="cust-card-icon">
                  <i className={`bi ${card.icon}`} />
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSIGHTS / BENTO GRID ────────────────── */}
      <section className="cust-insights-section">
        <div className="cust-insights-inner">
          <div className="cust-insights-header cust-reveal-head">
            <span className="cust-section-eyebrow">Beyond Tracking</span>
            <h2 className="cust-section-title">
              Data-Driven
              <br />
              <span>Maintenance.</span>
            </h2>
            <p className="cust-section-desc" style={{ margin: "0 auto" }}>
              Keep your resale value high with detailed fuel logs, automated reminders, and complete service timelines.
            </p>
          </div>
          <div className="cust-bento-grid">
            <div className="cust-bento-item cust-bento-large">
              <div className="cust-bento-content">
                <div className="cust-bento-icon">
                  <i className="bi bi-droplet-fill" />
                </div>
                <h3>Efficiency Tracking</h3>
                <p>Log every fill-up with odometer and liter details to see real-world mileage trends and spot unusual consumption early before it becomes a problem.</p>
              </div>
            </div>
            <div className="cust-bento-item">
              <div className="cust-bento-content">
                <div className="cust-bento-icon">
                  <i className="bi bi-alarm-fill" />
                </div>
                <h3>Intelligent Nagging</h3>
                <p>Set custom reminders for service intervals, document renewals (Insurance/PUC), and EMIs tied specifically to the relevant vehicle.</p>
              </div>
            </div>
            <div className="cust-bento-item">
              <div className="cust-bento-content">
                <div className="cust-bento-icon">
                  <i className="bi bi-archive-fill" />
                </div>
                <h3>No More Paper Trails</h3>
                <p>Replace messy notebooks and lost bills with a secure "Bill Vault" tied to each and every garage visit. Never lose a record.</p>
              </div>
            </div>
            <div className="cust-bento-item cust-bento-wide">
              <div className="cust-bento-content">
                <div className="cust-bento-icon">
                  <i className="bi bi-graph-up-arrow" />
                </div>
                <h3>Maximize Resale Value</h3>
                <p>Use your comprehensive mileage logs, digital invoices, and verified service timelines to maintain and prove the resale value of your vehicle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section className="cust-cta-section">
        <div className="cust-cta-inner" style={{ opacity: 0 }}>
          <span className="cust-section-eyebrow" style={{ display: "block", marginBottom: "16px" }}>Get Started Today</span>
          <h2>
            Stop managing your
            <br />
            <span style={{ color: "var(--primary-color)" }}>vehicles the old way.</span>
          </h2>
          <p>
            Join thousands of vehicle owners who have replaced paperwork and memory with a single, clear digital companion.
          </p>
          <div className="cust-cta-btns">
            <Link to="/contact" className="cust-btn-primary">
              <i className="bi bi-phone-fill" /> Download the App
            </Link>
            <Link to="/pricing" className="cust-btn-dark">
              <i className="bi bi-grid-fill" /> View Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}