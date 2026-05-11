import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { API_BASE_URL } from "../config/env";
import "../style/home.css";

gsap.registerPlugin(ScrollTrigger);

const TAG_LABELS = ["Essential Tools", "Growth Suite", "Full Enterprise"];

export default function Packages() {
  const [steps, setSteps]   = useState([]);
  const [loading, setLoading] = useState(true);

  /* DOM refs — always present */
  const spacerRef      = useRef(null);
  const stickyRef      = useRef(null);
  const dotRef         = useRef(null);
  const rowRefs        = useRef([]);
  const activeIdx      = useRef(0);
  const mobileCardsRef = useRef([]);

  /* GSAP state refs */
  const gsapCtxRef = useRef(null);
  const gsapReady  = useRef(false);

  /* ── fetch ───────────────────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/packages`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((item, i) => ({
            ...item,
            num: String(i + 1).padStart(2, "0"),
          }));
          setSteps(mapped);
        }
      })
      .catch((err) => console.error("Packages fetch error:", err))
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  /* ── GSAP — fires once after steps are in DOM ────────────────── */
  useEffect(() => {
    if (steps.length === 0) return;
    if (gsapReady.current) return;
    gsapReady.current = true;

    const TOTAL    = steps.length;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      gsap.fromTo(
        ".pkg-mobile-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: ".pkg-mobile-wrapper", start: "top 80%", once: true },
        }
      );
      return;
    }

    function dotYFor(index) {
      const row = rowRefs.current[index];
      if (!row) return 0;
      const numEl  = row.querySelector(".pkg2-num");
      const leftEl = row.parentElement;
      const nr = numEl.getBoundingClientRect();
      const lr = leftEl.getBoundingClientRect();
      return nr.top - lr.top + (nr.height / 2) - 4;
    }

    function applyActive(index, animate) {
      const dur = animate ? 0.55 : 0;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const on      = i === index;
        const numEl   = row.querySelector(".pkg2-num");
        const titleEl = row.querySelector(".pkg2-title");
        const bodyEl  = row.querySelector(".pkg2-body");

        gsap.to(numEl,   { color: on ? "#0f0f0f" : "#c4c4c4", duration: dur, ease: "power2.out" });
        gsap.to(titleEl, { color: on ? "#0f0f0f" : "#c4c4c4", duration: dur, ease: "power2.out" });

        if (on) {
          gsap.set(bodyEl, { display: "block" });
          gsap.to(bodyEl, { opacity: 1, height: "auto", duration: animate ? 0.5 : 0, ease: "power2.out" });
        } else {
          gsap.to(bodyEl, {
            opacity: 0, height: 0, duration: animate ? 0.35 : 0, ease: "power2.in",
            onComplete: () => gsap.set(bodyEl, { display: "none" }),
          });
        }
      });
    }

    const timer = setTimeout(() => {
      gsap.set(dotRef.current, { y: dotYFor(0) });
      applyActive(0, false);

      gsapCtxRef.current = gsap.context(() => {
        gsap.from("#pkg2-left", {
          opacity: 0, x: -40, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: spacerRef.current, start: "top 75%" },
        });
        gsap.from(".website-preview", {
          opacity: 0, x: 40, y: 40, rotation: 2, scale: 0.9, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: spacerRef.current, start: "top 75%" },
        });
        gsap.from(".mobile-preview", {
          opacity: 0, x: 20, y: 60, scale: 0.8, duration: 1.6, delay: 0.2, ease: "power4.out",
          scrollTrigger: { trigger: spacerRef.current, start: "top 75%" },
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
            gsap.to(dotRef.current, { y: dotYFor(index), duration: 0.55, ease: "power3.inOut" });
            applyActive(index, true);
          },
        });
      });
    }, 160);

    return () => {
      clearTimeout(timer);
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
      gsapReady.current  = false;
    };
  }, [steps]);

  const TOTAL = steps.length;

  /* ── render ──────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Desktop / Tablet ──────────────────────────────────────── */}
      <div ref={spacerRef} id="pkg2-spacer">
        <div ref={stickyRef} id="pkg2-sticky">

          {loading ? (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", color: "rgba(15,15,15,0.3)", fontSize: "0.9rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "'Epilogue', sans-serif",
            }}>
              Loading…
            </div>
          ) : (
            <div className="pkg2-content-grid">
              <div id="pkg2-left">
                <h2 className="pkg2-main-title">Our Packages</h2>
                <div id="pkg2-indicator" ref={dotRef} />
                {steps.map((step, i) => (
                  <div
                    key={step.id ?? i}
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
                    <img src="/mobile-preview.png"  alt="Mobile Preview"  className="mobile-preview"  />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Mobile ────────────────────────────────────────────────── */}
      <div className="pkg-mobile-wrapper">
        <div className="pkg-mobile-header">
          <span className="pkg-mobile-header-eyebrow">Plans &amp; Packages</span>
          <h2 className="pkg-mobile-header-title">Our Packages</h2>
        </div>

        <div className="pkg-mobile-scroll">
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "rgba(15,15,15,0.3)", fontFamily: "'Epilogue', sans-serif", fontSize: "0.9rem", letterSpacing: "0.1em" }}>
              Loading…
            </div>
          ) : steps.map((step, i) => (
            <div
              key={step.id ?? i}
              className="pkg-mobile-card"
              ref={(el) => (mobileCardsRef.current[i] = el)}
            >
              {/* Last card gets the enterprise/preview layout */}
              {i === TOTAL - 1 ? (
                <>
                  <div className="pkg-mobile-card-bg pkg-mobile-card-bg--enterprise" />
                  <div className="pkg-mobile-card-previews">
                    <img src="/website-preview.png" alt="Dashboard Preview" className="pkg-mobile-website-img" />
                    <img src="/mobile-preview.png"  alt="Mobile Preview"    className="pkg-mobile-phone-img"    />
                  </div>
                </>
              ) : (
                <div className={`pkg-mobile-card-bg ${i === 0 ? "pkg-mobile-card-bg--preview-web" : "pkg-mobile-card-bg--preview-mob"}`} />
              )}

              <div className="pkg-mobile-card-overlay" />
              <span className="pkg-mobile-card-watermark">{step.num}</span>

              <div className="pkg-mobile-card-content">
                <span className="pkg-mobile-card-num">{step.num} — 0{TOTAL}</span>
                <h3 className="pkg-mobile-card-title">{step.title}</h3>
                <p  className="pkg-mobile-card-body">{step.body}</p>
                <span className="pkg-mobile-card-tag">{TAG_LABELS[i] ?? ""}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}