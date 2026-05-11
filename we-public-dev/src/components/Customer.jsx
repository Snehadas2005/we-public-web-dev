import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import "../style/CustomerPage.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Three.js hero canvas ─────────────────────────── */
function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 5;

    /* Particle field */
    const count = 420;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x3c95e8,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* Wireframe torus — abstract tech ring */
    const torGeo = new THREE.TorusGeometry(2.6, 0.007, 8, 100);
    const torMat = new THREE.MeshBasicMaterial({ color: 0x3c95e8, transparent: true, opacity: 0.1 });
    const torus = new THREE.Mesh(torGeo, torMat);
    torus.rotation.x = 1.1;
    scene.add(torus);

    const torGeo2 = new THREE.TorusGeometry(1.8, 0.005, 6, 80);
    const torus2 = new THREE.Mesh(torGeo2, new THREE.MeshBasicMaterial({ color: 0x3c95e8, transparent: true, opacity: 0.07 }));
    torus2.rotation.x = 0.4;
    torus2.rotation.y = 0.8;
    scene.add(torus2);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.035;
      particles.rotation.x = t * 0.015;
      torus.rotation.z = t * 0.04;
      torus2.rotation.y = t * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="cust-hero__canvas" />;
}

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
    desc: "Add every 2-wheeler and 4-wheeler you own. Each vehicle gets its own profile — model, year, odometer, and a complete service timeline you can scroll through anytime.",
    bullets: [
      "Unlimited vehicle support across 2-wheelers and 4-wheelers",
      "Individual vehicle profiles with specs and service history",
      "Real-time odometer tracking and mileage insights",
    ],
  },
  {
    num: "02",
    img: "/feature2.png",
    imgAlt: "Digital document locker for vehicle papers",
    badgeIcon: "bi-shield-lock-fill",
    badgeText: "Document Locker",
    title: "No more lost",
    titleAccent: "paperwork.",
    desc: "Insurance certificates, registration docs, PUC — stored securely, tied to the exact vehicle they belong to. Upload files up to 20 MB and retrieve them at any checkpoint or resale.",
    bullets: [
      "High-capacity secure uploads up to 20 MB per document",
      "Tag every file to a specific registration number",
      "Instant retrieval at checkpoints, during resale, or on the road",
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
    desc: "Live job card status, itemized invoices with spare parts and taxes, and a running service history you own — even for garages not on the Workshop Edge network.",
    bullets: [
      "Real-time job card progress from check-in to completion",
      "Itemized digital invoices with spares, services, and taxes",
      "Manual job card logging for non-WE garages",
    ],
  },
  {
    num: "04",
    img: "/feature4.png",
    imgAlt: "Fuel logs, reminders, and booking",
    badgeIcon: "bi-fuel-pump-fill",
    badgeText: "Smart Reminders",
    title: "Maintenance on",
    titleAccent: "your terms.",
    desc: "Log every fill-up to track real-world mileage. Set custom reminders for service intervals, insurance renewals, and EMIs — tied to the specific vehicle, so context is never lost.",
    bullets: [
      "Fuel logs with odometer tracking and efficiency trends",
      "Custom reminders for service, insurance, PUC, and EMIs",
      "Integrated booking with instant garage confirmation",
    ],
  },
];

const CARDS = [
  { icon: "bi-house-fill", title: "Home Dashboard", desc: "Live service status, upcoming appointments, and nearby garage discovery with ratings and distance filters — all on one screen." },
  { icon: "bi-chat-dots-fill", title: "Owner Chat", desc: "Talk directly to garage owners on the platform. Get real updates, clarify repair needs, and stay in the loop without calling." },
  { icon: "bi-headset", title: "Admin Support", desc: "Raise tickets straight to the Workshop Edge team from inside Settings. We're always one tap away." },
  { icon: "bi-search", title: "Garage Discovery", desc: "Find local garages filtered by rating, distance, or your last visit. See services offered before you book." },
  { icon: "bi-currency-rupee", title: "Bill Vault", desc: "Every invoice from every service, organized by vehicle and date. Your complete financial record — exportable anytime." },
  { icon: "bi-person-fill", title: "Profile & Addresses", desc: "Keep your location, saved addresses, and contact details current for faster and more accurate bookings." },
];

/* ── Main component ───────────────────────────────── */
export default function Customer() {
  const heroRef   = useRef(null);
  const badgeRef  = useRef(null);
  const titleRef  = useRef(null);
  const descRef   = useRef(null);
  const actionsRef = useRef(null);
  const phoneRef  = useRef(null);
  const statsRef  = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    /* ── Hero entrance (trigger once on page load) ─── */
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0, y: 60, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 }, "-=0.35")
      .fromTo(descRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
      .fromTo(actionsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .fromTo(phoneRef.current, { opacity: 0, x: 50, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)" }, "-=0.8")
      .fromTo(".cust-orbit-pill", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(2)" }, "-=0.4");

    /* ── Stats strip (scroll trigger, once) ─────────── */
    const statItems = document.querySelectorAll(".cust-stat-item");
    statItems.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out" });
        },
      });
      gsap.set(el, { opacity: 0, y: 30 });
    });

    /* ── Feature items (scroll trigger, once) ─────────── */
    const featureItems = document.querySelectorAll(".cust-feature-item");
    featureItems.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" });
        },
      });
      gsap.set(el, { opacity: 0, y: 60 });
    });

    /* ── Cards (scroll trigger, once) ─────────────────── */
    const cards = document.querySelectorAll(".cust-card");
    cards.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.75, delay: (i % 3) * 0.1, ease: "back.out(1.5)" });
        },
      });
      gsap.set(el, { opacity: 0, y: 40, scale: 0.95 });
    });

    /* ── Section headers (scroll trigger, once) ──────── */
    const secHeads = document.querySelectorAll(".cust-reveal-head");
    secHeads.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" });
        },
      });
    });

    /* ── CTA block (scroll trigger, once) ─────────────── */
    ScrollTrigger.create({
      trigger: ".cust-cta-section",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(".cust-cta-inner", { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="cust-page">
      <Navbar />

      {/* ─── HERO ──────────────────────────────────── */}
      <section className="cust-hero" ref={heroRef}>
        <HeroCanvas />
        <div className="cust-hero__overlay" />
        <div className="cust-hero__grid" />

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
                <div className="cust-phone__status-bar">
                  <span>WorkshopEdge</span>
                  <span>9:41</span>
                </div>
                <div className="cust-phone__screen-body">
                  {/* Active service card */}
                  <div className="cust-phone__car-card">
                    <div className="cust-phone__car-icon">
                      <i className="bi bi-car-front-fill" />
                    </div>
                    <div className="cust-phone__car-info">
                      <h4>KA-01-AB-2293</h4>
                      <p>Honda City 2021 · 42,180 km</p>
                      <span className="cust-phone__status-pill">Service in progress</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="cust-phone__stat-row">
                    <div className="cust-phone__stat">
                      <span className="cust-phone__stat-label">Documents</span>
                      <span className="cust-phone__stat-value">7 stored</span>
                    </div>
                    <div className="cust-phone__stat">
                      <span className="cust-phone__stat-label">Next service</span>
                      <span className="cust-phone__stat-value">12 days</span>
                    </div>
                  </div>

                  {/* Fuel stat */}
                  <div className="cust-phone__stat">
                    <span className="cust-phone__stat-label">Last fill-up mileage</span>
                    <span className="cust-phone__stat-value" style={{ color: "var(--primary-color)" }}>18.4 km/L</span>
                  </div>

                  {/* Notification */}
                  <div className="cust-phone__notif">
                    <i className="bi bi-bell-fill" />
                    <span className="cust-phone__notif-text">
                      Insurance renewal due in 18 days — KA-01-AB-2293
                    </span>
                  </div>

                  {/* Second car */}
                  <div className="cust-phone__car-card">
                    <div className="cust-phone__car-icon">
                      <i className="bi bi-bicycle" />
                    </div>
                    <div className="cust-phone__car-info">
                      <h4>KA-05-HX-7721</h4>
                      <p>Royal Enfield 2020 · 18,320 km</p>
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="cust-phone__nav">
                  {[
                    { icon: "bi-house-fill", label: "Home", active: true },
                    { icon: "bi-car-front-fill", label: "Vehicles", active: false },
                    { icon: "bi-journal-check", label: "Service", active: false },
                    { icon: "bi-person-fill", label: "Profile", active: false },
                  ].map(({ icon, label, active }) => (
                    <div key={label} className={`cust-phone__nav-item${active ? " active" : ""}`}>
                      <i className={`bi ${icon}`} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orbiting pills */}
            <div className="cust-hero__orbit">
              <div className="cust-orbit-pill cust-orbit-pill--1">
                <i className="bi bi-shield-fill-check" />
                <span>Docs Secured</span>
              </div>
              <div className="cust-orbit-pill cust-orbit-pill--2">
                <i className="bi bi-fuel-pump-fill" />
                <span>18.4 km/L</span>
              </div>
              <div className="cust-orbit-pill cust-orbit-pill--3">
                <i className="bi bi-bell-fill" />
                <span>Reminder Set</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────── */}
      <div className="cust-stats-strip" ref={statsRef}>
        <div className="cust-stats-strip-inner">
          {[
            { icon: "bi-car-front-fill", val: "500+", label: "Active Vehicles" },
            { icon: "bi-file-earmark-fill", val: "20K+", label: "Documents Stored" },
            { icon: "bi-journal-check", val: "12K+", label: "Job Cards Tracked" },
            { icon: "bi-star-fill", val: "100%", label: "Satisfaction Rate" },
          ].map(({ icon, val, label }) => (
            <div key={label} className="cust-stat-item">
              <i className={`bi ${icon} cust-stat-icon`} />
              <div className="cust-stat-value">{val}</div>
              <div className="cust-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURE SHOWCASE ─────────────────────── */}
      <section className="cust-features-section" id="features">
        {FEATURES.map((feat, i) => (
          <div key={feat.num} className="cust-feature-item">
            {/* Image */}
            <div className="cust-feature-img-wrap">
              <img src={feat.img} alt={feat.imgAlt} loading="lazy" />
              <div className="cust-feature-img-badge">
                <i className={`bi ${feat.badgeIcon}`} />
                <span>{feat.badgeText}</span>
              </div>
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
        ))}
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