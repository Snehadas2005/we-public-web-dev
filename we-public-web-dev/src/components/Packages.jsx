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
          display: flex;
          flex-direction: column;
          background: #f4f4f4; /* light grey resembling screenshot */
          overflow: hidden;
          position: relative;
        }

        .pkg2-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          /* more top padding for header, standard sides */
          padding: 8vh 5vw 0 8vw;
          width: 100%;
        }

        .pkg2-main-title {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(40px, 4.5vw, 64px);
          font-weight: 500;
          letter-spacing: -0.04em;
          color: #0f0f0f;
          margin: 0;
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

        /* ─── LEFT ─── */
        #pkg2-left {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center to beautifully align exactly with the right side image */
          padding: 0 5vw 0 8vw;
        }

        /* the blue square indicator */
        #pkg2-indicator {
          position: absolute;
          left: calc(8vw - 22px);
          top: 0;
          width: 8px;
          height: 8px;
          background: #3C95E8; /* standard theme color */
          border-radius: 0;    /* sharp square like screenshot */
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
          font-weight: 400; /* matching the lighter weight in screenshot */
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
          /* indented to align exactly under the title text */
          padding-left: calc(13px + 1.25rem);
          overflow: hidden;
          height: 0;
          display: none;
          opacity: 0;
        }

        /* ─── RIGHT ─── */
        #pkg2-right {
          position: relative;
          height: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .dashboard-preview-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dashboard-preview {
          width: 88%; /* Increased size */
          height: 88%; /* Increased size */
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }



        /* ─── mobile ─── */
        @media (max-width: 768px) {
          .pkg2-header {
            padding: 4vh 5vw 0 5vw;
          }
          .pkg2-main-title {
            font-size: 32px;
          }
          .pkg2-process-tag {
            font-size: 11px;
            margin-top: 6px;
          }
          .pkg2-content-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto 38vh;
          }
          #pkg2-sticky {
            height: 100svh;
          }
          #pkg2-left {
            height: auto;
            padding: 3rem 1.5rem 1.5rem 3.8rem;
            justify-content: center;
          }
          #pkg2-indicator { left: 1.2rem; }
          #pkg2-right { height: 38vh; }
          .pkg2-body { padding-left: 0; }
        }
      `}</style>

      <div ref={spacerRef} id="pkg2-spacer">
        <div ref={stickyRef} id="pkg2-sticky">
          
          <div className="pkg2-header">
            <h2 className="pkg2-main-title">Our Packages</h2>
          </div>

          <div className="pkg2-content-grid">
            {/* ── LEFT ── */}
            <div id="pkg2-left">

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
                <div className="dashboard-preview">
                  <div className="browser-mock" style={{ width: '100%', height: '100%', background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/website-preview.png" alt="WorkshopEdge Dashboard" className="preview-image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}