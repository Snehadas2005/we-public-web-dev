import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../home.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Lite Package",
    body: "Perfect for small garages and independent mechanics. Manage job cards, customers, expenses, and counter sales — all from one dashboard, without the complexity.",
    img: "/india-garage-workshop-sadaramangala-bangalore.avif",
  },
  {
    num: "02",
    title: "Prime Package",
    body: "Designed for growing workshops. Add GST invoicing, full inventory tracking, profit reports, and staff logins on top of everything in Lite.",
    img: "/india-garage-working-person.jpg",
  },
  {
    num: "03",
    title: "Enterprise Package",
    body: "Full-scale management for large operations. Automate notifications, get a dedicated website, and export every data point your business needs.",
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

  useEffect(() => {
    /* ── get the Y centre of a row's number, relative to the sticky panel ── */
    function dotYFor(index) {
      const row    = rowRefs.current[index];
      const sticky = stickyRef.current;
      if (!row || !sticky) return 0;
      const rr = row.getBoundingClientRect();
      const sr = sticky.getBoundingClientRect();
      return rr.top - sr.top + 6; // 6px = align with centre of num text
    }

    /* ── apply active / inactive styles ── */
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
          // reveal body
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
      // set dot & styles for first item
      gsap.set(dotRef.current, { y: dotYFor(0) });
      applyActive(0, false);

      const ctx = gsap.context(() => {
        // smooth entry for left wrapper
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

        // smooth entry for dashboard preview
        gsap.from(".dashboard-preview", {
          opacity: 0,
          scale: 0.95,
          y: 30,
          duration: 1.2,
          ease: "power3.out",
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
        #pkg2-spacer { position: relative; }

        #pkg2-sticky {
          width: 100%;
          height: 100vh;
          display: grid;
          grid-template-columns: 50% 50%;
          background: #f5f5f3;
          overflow: hidden;
          position: relative;
        }

        /* ─── LEFT ─── */
        #pkg2-left {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5vw 0 8vw;
        }

        .pkg2-eyebrow {
          font-family: 'Epilogue', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #b0b0b0;
          margin-bottom: 3.2rem;
        }

        /* the blue square indicator */
        #pkg2-indicator {
          position: absolute;
          left: calc(8vw - 20px);
          top: 0;
          width: 9px;
          height: 9px;
          background: #3C95E8;
          border-radius: 2px;
          pointer-events: none;
          z-index: 10;
        }

        .pkg2-row {
          margin-bottom: 2.6rem;
          position: relative;
        }
        .pkg2-row:last-child { margin-bottom: 0; }

        .pkg2-row-head {
          display: flex;
          align-items: baseline;
          gap: 1.1rem;
        }

        .pkg2-num {
          font-family: 'Epilogue', sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: #c4c4c4;
          flex-shrink: 0;
          line-height: 1;
        }

        .pkg2-title {
          font-family: 'Epilogue', sans-serif;
          font-weight: 700;
          font-size: clamp(24px, 2.5vw, 36px);
          letter-spacing: -0.035em;
          color: #c4c4c4;
          line-height: 1.06;
        }

        .pkg2-body {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(13px, 0.9vw, 14.5px);
          line-height: 1.75;
          color: #666;
          max-width: 400px;
          margin-top: 0.9rem;
          /* indented to align with title (num width + gap) */
          padding-left: calc(12px + 1.1rem);
          overflow: hidden;
          height: 0;
          display: none;
          opacity: 0;
        }

        /* ─── RIGHT ─── */
        #pkg2-right {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .dashboard-preview-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }



        /* ─── mobile ─── */
        @media (max-width: 768px) {
          #pkg2-sticky {
            grid-template-columns: 1fr;
            grid-template-rows: auto 38vh;
            height: 100svh;
          }
          #pkg2-left {
            height: auto;
            padding: 5rem 1.5rem 1.5rem 3.8rem;
            justify-content: center;
          }
          #pkg2-indicator { left: 1.2rem; }
          #pkg2-right { height: 38vh; }
          .pkg2-body { padding-left: 0; }
        }
      `}</style>

      <div ref={spacerRef} id="pkg2-spacer">
        <div ref={stickyRef} id="pkg2-sticky">

          {/* ── LEFT ── */}
          <div id="pkg2-left">
            <p className="pkg2-eyebrow">Our Packages</p>

            {/* animated indicator */}
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

          {/* ── RIGHT ── */}
          <div id="pkg2-right">
            <div className="dashboard-preview-wrapper">
              <div className="dashboard-preview" style={{ marginTop: 0, transform: 'scale(0.85)', transformOrigin: 'center' }}>
                <div className="browser-mock">
                  <img src="/website-preview.png" alt="WorkshopEdge Dashboard" className="preview-image" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className="floating-phone-mock" style={{ position: 'absolute', right: '-8%', bottom: '-15%', width: '28%' }}>
                  <img src="/mobile-preview.png" alt="WorkshopEdge Mobile App" className="mobile-preview-image" style={{ width: '100%', height: 'auto' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}