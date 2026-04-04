import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../home.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Lite Package",
    body: "Perfect for small garages and independent mechanics. Manage job cards, customers, and expenses—with dynamic inventory scaling and a complete service history saved automatically.",
    img: "/india-garage-workshop-sadaramangala-bangalore.avif",
  },
  {
    num: "02",
    title: "Prime Package",
    body: "Designed for growing workshops. Add GST invoicing, detailed monthly/yearly financial reports, end-to-end spare parts sales, and complete staff role management.",
    img: "/india-garage-working-person.jpg",
  },
  {
    num: "03",
    title: "Enterprise Package",
    body: "Full-scale management for large operations. Includes a secure cloud garage locker for document storage, a two-way appointment system, and customizable financial breakthroughs.",
    img: "/india-garage-workshop-sadaramangala-bangalore.avif",
  },
];

const TOTAL = STEPS.length;

export default function Packages() {
  const spacerRef = useRef(null);
  const stickyRef = useRef(null);
  const dotRef    = useRef(null);
  const rowRefs   = useRef([]);
  const activeIdx = useRef(0);

  // Mobile card refs
  const mobileCardsRef = useRef([]);

  useEffect(() => {
    // ── Mobile scroll reveal ──────────────────────────────────────────
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      gsap.fromTo(
        ".pkg-mobile-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pkg-mobile-wrapper",
            start: "top 80%",
            once: true,
          },
        }
      );
      return;
    }

    // ── Desktop / tablet logic (unchanged) ───────────────────────────
    function dotYFor(index) {
      const row = rowRefs.current[index];
      if (!row) return 0;
      const numEl = row.querySelector(".pkg2-num");
      const leftEl = row.parentElement;
      const nr = numEl.getBoundingClientRect();
      const lr = leftEl.getBoundingClientRect();
      return nr.top - lr.top + (nr.height / 2) - 4;
    }

    function applyActive(index, animate) {
      const dur = animate ? 0.55 : 0;

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const on     = i === index;
        const numEl  = row.querySelector(".pkg2-num");
        const titleEl= row.querySelector(".pkg2-title");
        const bodyEl = row.querySelector(".pkg2-body");

        gsap.to(numEl, {
          color: on ? "#0f0f0f" : "#c4c4c4",
          duration: dur, ease: "power2.out",
        });
        gsap.to(titleEl, {
          color: on ? "#0f0f0f" : "#c4c4c4",
          duration: dur, ease: "power2.out",
        });

        if (on) {
          gsap.set(bodyEl, { display: "block" });
          gsap.to(bodyEl, {
            opacity: 1, height: "auto",
            duration: animate ? 0.5 : 0, ease: "power2.out",
          });
        } else {
          gsap.to(bodyEl, {
            opacity: 0, height: 0,
            duration: animate ? 0.35 : 0, ease: "power2.in",
            onComplete: () => gsap.set(bodyEl, { display: "none" }),
          });
        }
      });
    }

    const timer = setTimeout(() => {
      gsap.set(dotRef.current, { y: dotYFor(0) });
      applyActive(0, false);

      const ctx = gsap.context(() => {
        gsap.from("#pkg2-left", {
          opacity: 0,
          x: -40,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top 75%",
          }
        });

        gsap.from(".website-preview", {
          opacity: 0,
          x: 40,
          y: 40,
          rotation: 2,
          scale: 0.9,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top 75%",
          }
        });

        gsap.from(".mobile-preview", {
          opacity: 0,
          x: 20,
          y: 60,
          scale: 0.8,
          duration: 1.6,
          delay: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top 75%",
          }
        });

        ScrollTrigger.create({
          trigger: spacerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (TOTAL - 1)}`,
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate(self) {
            const raw   = self.progress * (TOTAL - 1);
            const index = Math.min(TOTAL - 1, Math.round(raw));
            if (index === activeIdx.current) return;
            activeIdx.current = index;

            gsap.to(dotRef.current, {
              y: dotYFor(index),
              duration: 0.55,
              ease: "power3.inOut",
            });
            applyActive(index, true);
          },
        });
      });

      return () => ctx.revert();
    }, 160);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════════════════════════
           DESKTOP + TABLET styles (unchanged)
        ═══════════════════════════════════════════════════════════ */
        #pkg2-spacer { position: relative; }

        #pkg2-sticky {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f4f4f4;
          overflow: hidden;
          position: relative;
        }

        .pkg2-main-title {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(36px, 4.5vw, 64px);
          padding-bottom: 50px;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: #0f0f0f;
          margin-bottom: 50px;
          line-height: 1;
        }

        .pkg2-process-tag {
          font-family: 'Epilogue', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #3C95E8;
          text-transform: uppercase;
          margin-top: 10px;
        }

        .pkg2-content-grid {
          display: grid;
          grid-template-columns: 50% 50%;
          flex: 1;
          height: auto;
          position: relative;
        }

        #pkg2-left {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5vw 0 8vw;
        }

        #pkg2-indicator {
          position: absolute;
          left: calc(8vw - 22px);
          top: 0;
          width: 8px;
          height: 8px;
          background: #3C95E8;
          border-radius: 0;
          pointer-events: none;
          z-index: 10;
        }

        .pkg2-row {
          margin-bottom: 2.5rem;
          position: relative;
        }
        .pkg2-row:last-child { margin-bottom: 0; }

        .pkg2-row-head {
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
        }

        .pkg2-num {
          font-family: 'Epilogue', sans-serif;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.05em;
          color: #b0b0b0;
          flex-shrink: 0;
          line-height: 1;
        }

        .pkg2-title {
          font-family: 'Epilogue', sans-serif;
          font-weight: 400;
          font-size: clamp(28px, 2.5vw, 36px);
          letter-spacing: -0.02em;
          color: #c4c4c4;
          line-height: 1.1;
          margin-bottom: 0;
        }

        .pkg2-body {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(14px, 1vw, 15px);
          font-weight: 400;
          line-height: 1.6;
          color: #888;
          max-width: 440px;
          margin-top: 1rem;
          padding-left: calc(13px + 1.25rem);
          overflow: hidden;
          height: 0;
          display: none;
          opacity: 0;
        }

        #pkg2-right {
          position: relative;
          height: 100%;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }

        .dashboard-preview-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dashboard-preview {
          width: 68%;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .website-preview {
          width: 100%;
          height: auto;
          border-radius: 16px;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.12));
          object-fit: contain;
        }

        .mobile-preview {
          position: absolute;
          bottom: -8%;
          right: -4%;
          width: 34%;
          height: auto;
          border-radius: 24px;
          border: 5px solid #111;
          background: #111;
          filter: drop-shadow(0 25px 50px rgba(0,0,0,0.3));
          object-fit: cover;
          z-index: 5;
        }

        /* Hide desktop version on mobile */
        @media (max-width: 768px) {
          #pkg2-spacer { display: none !important; }
          .pkg-mobile-wrapper { display: block !important; }
        }

        /* Hide mobile version on desktop/tablet */
        .pkg-mobile-wrapper { display: none; }

        /* Mobile wrapper */
        .pkg-mobile-wrapper {
          background: #e9f4ffff ;
          padding: 60px 0 72px;
          position: relative;
          overflow: hidden;
          color: #000000;
        }

        .pkg-mobile-header {
          text-align: center;
          padding: 0 24px;
          margin-bottom: 40px;
        }

        .pkg-mobile-header-eyebrow {
          font-family: 'Epilogue', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3C95E8;
          margin-bottom: 12px;
          display: block;
        }

        .pkg-mobile-header-title {
          font-family: 'Epilogue', sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 9vw, 42px);
          letter-spacing: -0.04em;
          color: #000000;
          line-height: 1.05;
          margin: 0;
        }

        /* Card scroll container */
        .pkg-mobile-scroll {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 0 20px;
        }

        /* Individual card */
        .pkg-mobile-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          opacity: 0; 
        }

        /* Background image layer */
        .pkg-mobile-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          transition: transform 0.6s ease;
        }

        .pkg-mobile-card:active .pkg-mobile-card-bg {
          transform: scale(1.04);
        }

        /* Dark gradient overlay */
        .pkg-mobile-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.1) 100%);
          z-index: 1;
        }

        /* Preview images layer for first card */
        .pkg-mobile-card-previews {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .pkg-mobile-website-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .pkg-mobile-phone-img {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50%;
          height: auto;
          box-shadow: -10px -10px 40px rgba(0,0,0,0.4);
          object-fit: cover;
          z-index: 2;
        }

        /* Content layer */
        .pkg-mobile-card-content {
          position: relative;
          z-index: 2;
          padding: 28px 24px 28px;
        }

        .pkg-mobile-card-num {
          font-family: 'Epilogue', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3C95E8;
          margin-bottom: 8px;
          display: block;
        }

        .pkg-mobile-card-title {
          font-family: 'Epilogue', sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 6vw, 28px);
          letter-spacing: -0.03em;
          color: #000000;
          line-height: 1.1;
          margin: 0 0 10px;
        }

        .pkg-mobile-card-body {
          font-family: 'Epilogue', sans-serif;
          font-size: 13.5px;
          color: rgba(0, 0, 0, 0.75);
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .pkg-mobile-card-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(60, 149, 232, 0.18);
          border: 1px solid rgba(60, 149, 232, 0.35);
          border-radius: 100px;
          padding: 6px 14px;
          font-family: 'Epilogue', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #3C95E8;
          letter-spacing: 0.04em;
        }

        .pkg-mobile-card-tag::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3C95E8;
          flex-shrink: 0;
        }

        /* Number watermark / Badge */
        .pkg-mobile-card-watermark {
          position: absolute;
          top: 24px;
          right: 24px;
          font-family: 'Epilogue', sans-serif;
          font-weight: 900;
          font-size: 50px;
          letter-spacing: -0.04em;
          color: rgba(31, 31, 31, 0.35);
          line-height: 1;
          z-index: 3;
          pointer-events: none;
        }
      `}</style>

      {/* ── Desktop / Tablet version (unchanged) ─────────────────── */}
      <div ref={spacerRef} id="pkg2-spacer">
        <div ref={stickyRef} id="pkg2-sticky">
          <div className="pkg2-content-grid">
            <div id="pkg2-left">
              <h2 className="pkg2-main-title">Our Packages</h2>
              <div id="pkg2-indicator" ref={dotRef} />
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className="pkg2-row"
                  ref={(el) => (rowRefs.current[i] = el)}
                >
                  <div className="pkg2-row-head">
                    <span className="pkg2-num">{step.num}</span>
                    <span className="pkg2-title">{step.title}</span>
                  </div>
                  <p className="pkg2-body">{step.body}</p>
                </div>
              ))}
            </div>

            <div id="pkg2-right">
              <div className="dashboard-preview-wrapper">
                <div className="dashboard-preview">
                  <img src="/website-preview.png" alt="website Preview" className="website-preview" />
                  <img src="/mobile-preview.png" alt="Mobile Preview" className="mobile-preview" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile version ─────────────────────────────────────────── */}
      <div className="pkg-mobile-wrapper">
        <div className="pkg-mobile-header">
          <span className="pkg-mobile-header-eyebrow">Plans & Packages</span>
          <h2 className="pkg-mobile-header-title">Our Packages</h2>
        </div>

        <div className="pkg-mobile-scroll">
          {STEPS.map((step, i) => {
            const tagLabels = ["Essential Tools", "Growth Suite", "Full Enterprise"];
            return (
              <div
                key={i}
                className="pkg-mobile-card"
                ref={(el) => (mobileCardsRef.current[i] = el)}
              >
                {/* Background image */}
                {i === 2 ? (
                  <>
                    <div
                      className="pkg-mobile-card-bg"
                      style={{ backgroundColor: "#e9f4ffff"}}
                    />
                    <div className="pkg-mobile-card-previews">
                      <img
                        src="/website-preview.png"
                        alt="Dashboard Preview"
                        className="pkg-mobile-website-img"
                      />
                      <img
                        src="/mobile-preview.png"
                        alt="Mobile Preview"
                        className="pkg-mobile-phone-img"
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className="pkg-mobile-card-bg"
                    style={{ backgroundImage: `url('${i === 0 ? "/website-preview.png" : "/mobile-preview.png"}')` }}
                  />
                )}

                <div className="pkg-mobile-card-overlay" />

                {/* Watermark */}
                <span className="pkg-mobile-card-watermark">{step.num}</span>

                {/* Content */}
                <div className="pkg-mobile-card-content">
                  <span className="pkg-mobile-card-num">{step.num} — 0{TOTAL}</span>
                  <h3 className="pkg-mobile-card-title">{step.title}</h3>
                  <p className="pkg-mobile-card-body">{step.body}</p>
                  <span className="pkg-mobile-card-tag">{tagLabels[i]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}