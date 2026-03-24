import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 500, suffix: "+", label: "Workshops Onboarded" },
  { value: 98,  suffix: "%", label: "Customer Satisfaction" },
  { value: 12,  suffix: "K+", label: "Job Cards Created Daily" },
  { value: 5,   suffix: "x", label: "Faster Than Paperwork" },
];

export default function Numbers() {
  const sectionRef = useRef(null);
  const numRefs    = useRef([]);
  const lineRef    = useRef(null);
  const hasRun     = useRef(false);

  useEffect(() => {
    let ctx;
    // Delay GSAP initialization to ensure 'Features' scroll padding above it has loaded completely
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        /* ── animated underline ──────────────────────────────── */
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

        /* ── counter animation (runs ONCE) ──────────────────── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
            onEnter: () => { hasRun.current = true; },
          },
        });

        /* line draws in */
        tl.to(lineRef.current, {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.inOut",
        }, 0);

        /* each card fades + slides up */
        tl.fromTo(
          ".num-card",
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.1
        );

        /* counters tick up */
        numRefs.current.forEach((el, i) => {
          if (!el) return;
          const stat = STATS[i];
          tl.to(
            { val: 0 },
            {
              val: stat.value,
              duration: 1.8,
              ease: "power2.out",
              onUpdate() {
                el.textContent = Math.round(this.targets()[0].val) + stat.suffix;
              },
              onComplete() {
                el.textContent = stat.value + stat.suffix;
              },
            },
            0.25 + i * 0.12
          );
        });
      }, sectionRef);
    }, 250);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        #numbers-section {
          background: #ecf4fe;
          padding: 88px 0 96px;
          position: relative;
          overflow: hidden;
        }

        .num-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .num-header {
          margin-bottom: 64px;
          position: relative;
          display: inline-block;
        }

        .num-title {
          font-family: 'Epilogue', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 3.5vw, 46px);
          letter-spacing: -0.035em;
          color: #0f0f0f;
          margin: 0 0 10px;
          line-height: 1.08;
        }

        .num-subtitle {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(13px, 1vw, 15.5px);
          color: rgba(15,15,15,0.48);
          margin: 0;
          letter-spacing: 0.01em;
        }

        .num-line {
          position: absolute;
          bottom: -16px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #0f0f0f;
          transform-origin: left center;
        }

        .num-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(15,15,15,0.1);
          border: 1px solid rgba(15,15,15,0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .num-card {
          background: #ecf4fe;
          padding: 48px 36px 44px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
          transition: background 0.25s ease;
        }

        .num-card:hover {
          background: #e0edfb;
        }

        .num-value {
          font-family: 'Epilogue', sans-serif;
          font-weight: 800;
          font-size: clamp(44px, 5.5vw, 76px);
          letter-spacing: -0.05em;
          color: #0f0f0f;
          line-height: 1;
        }

        .num-label {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(12px, 0.85vw, 14px);
          font-weight: 500;
          color: rgba(15,15,15,0.5);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .num-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 540px) {
          .num-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1px;
          }
          .num-card {
            padding: 32px 20px 28px;
          }
        }
      `}</style>

      <section id="numbers-section" ref={sectionRef}>
        <div className="num-inner">
          <div className="num-header">
            <p className="num-title">Trusted by workshops<br />across India</p>
            <p className="num-subtitle">Real numbers from real garages running on WorkshopEdge</p>
            <div className="num-line" ref={lineRef} />
          </div>

          <div className="num-grid">
            {STATS.map((stat, i) => (
              <div className="num-card" key={i}>
                <span
                  className="num-value"
                  ref={(el) => (numRefs.current[i] = el)}
                >
                  0{stat.suffix}
                </span>
                <span className="num-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}