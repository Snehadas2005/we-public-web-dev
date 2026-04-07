import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 500, suffix: "+", label: "Workshops Onboarded" },
  { value: 100,  suffix: "%", label: "Customer Satisfaction" },
  { value: 12,  suffix: "K+", label: "Job Cards Created Daily" },
  { value: 5,   suffix: "x", label: "Faster Than Paperwork" },
];

const LIVE_EVENTS = [
  "📍 Pune: New workshop 'Apex Motors' just joined the network",
  "⚡ Bengaluru: Efficiency increased by 4.2x this morning",
  "📊 Mumbai: 1,240+ Job Cards reached in the last 2 hours",
  "⭐ Delhi: Customer satisfaction rating at 100% for 48 hours straight",
  "🌊 Chennai: 15 workshops migrated to WorkshopEdge Cloud today",
];

export default function Numbers() {
  const sectionRef = useRef(null);
  const numRefs    = useRef([]);
  const lineRef    = useRef(null);
  const tickerRef  = useRef(null);
  const hasRun     = useRef(false);

  useEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        /* ── Initial states ──────────────────────────────── */
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".num-pulse-bar", { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
            onEnter: () => { hasRun.current = true; },
          },
        });

        /* 1. Header Line */
        tl.to(lineRef.current, {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.inOut",
        }, 0);

        /* 2. Cards entrance */
        tl.fromTo(
          ".num-card",
          { opacity: 0, y: 48, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.1
        );

        /* 3. Counter ticker animation */
        numRefs.current.forEach((el, i) => {
          if (!el) return;
          const stat = STATS[i];
          tl.to(
            { val: 0 },
            {
              val: stat.value,
              duration: 2.2,
              ease: "expo.out",
              onUpdate() {
                el.textContent = Math.round(this.targets()[0].val) + stat.suffix;
              },
              onComplete() {
                el.textContent = stat.value + stat.suffix;
              },
            },
            0.3 + i * 0.1
          );
        });

        /* 4. Live Pulse Bar Reveal */
        tl.to(".num-pulse-bar", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
        }, "-=0.5");

        /* 5. Ticker Animation (Continuous) */
        gsap.to(".ticker-track", {
          xPercent: -50,
          duration: 30,
          repeat: -1,
          ease: "none",
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
          padding: 88px 0 120px;
          position: relative;
          overflow: hidden;
        }

        /* Abstract India Network Background */
        .num-bg-mesh {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: radial-gradient(#3C95E8 1.5px, transparent 1.5px);
          background-size: 40px 40px;
          z-index: 0;
          mask-image: radial-gradient(circle at center, black, transparent 70%);
        }

        .num-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .num-header {
          margin-bottom: 72px;
          position: relative;
          display: inline-block;
        }

        .num-title {
          padding-top: 70px;
          font-family: 'Epilogue', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 3.5vw, 46px);
          letter-spacing: -0.035em;
          color: #0f0f0f;
          margin: 0 0 12px;
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
          gap: 1.5px;
          background: rgba(15,15,15,0.08);
          border: 1px solid rgba(15,15,15,0.08);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 48px;
          box-shadow: 0 10px 30px -10px rgba(60, 149, 232, 0.15);
        }

        .num-card {
          background: #ecf4fe;
          padding: 56px 36px 48px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          opacity: 0;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .num-card:hover {
          background: #fff;
          z-index: 2;
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        .num-value {
          font-family: 'Epilogue', sans-serif;
          font-weight: 800;
          font-size: clamp(44px, 5.5vw, 72px);
          letter-spacing: -0.05em;
          color: #0f0f0f;
          line-height: 1;
        }

        .num-label {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(11.5px, 0.8vw, 13.5px);
          font-weight: 600;
          color: rgba(15,15,15,0.5);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.4;
          margin-top: 4px;
        }

        /* Live Pulse Bar */
        .num-pulse-bar {
          background: #ffffff;
          border: 1px solid rgba(60, 149, 232, 0.2);
          border-radius: 100px;
          padding: 14px 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(60, 149, 232, 0.08);
          max-width: 920px;
          margin: 0 auto;
        }

        .pulse-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding-right: 24px;
          border-right: 1px solid rgba(0,0,0,0.1);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10B981;
          border-radius: 50%;
          position: relative;
        }

        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          background: #10B981;
          border-radius: 50%;
          opacity: 0.4;
          animation: pulsePing 1.8s ease-out infinite;
        }

        @keyframes pulsePing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }

        .pulse-label {
          font-family: 'Epilogue', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #10B981;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ticker-container {
          flex: 1;
          overflow: hidden;
          position: relative;
          height: 24px;
        }

        .ticker-track {
          display: flex;
          white-space: nowrap;
          gap: 72px;
          width: max-content;
        }

        .ticker-item {
          font-family: 'Epilogue', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #1F2937;
          display: flex;
          align-items: center;
          letter-spacing: -0.01em;
        }

        @media (max-width: 900px) {
          .num-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .num-header {
            margin-bottom: 40px;
          }
          .num-title {
            font-size: 32px;
          }
          .num-pulse-bar {
            border-radius: 20px;
            padding: 16px 24px;
            max-width: 100%;
          }
        }

        @media (max-width: 540px) {
          #numbers-section {
            padding: 60px 0 80px;
          }
          .num-inner {
            padding: 0 20px;
          }
          .num-header {
            width: 100%;
            text-align: center;
          }
          .num-line {
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
          }
          .num-grid {
            grid-template-columns: 1fr 1fr;
            border-radius: 16px;
          }
          .num-card {
            padding: 40px 16px;
            align-items: center;
            text-align: center;
          }
          .num-value {
            font-size: 38px;
          }
          .num-label {
            font-size: 11px;
          }
          .num-pulse-bar {
            flex-direction: column;
            gap: 12px;
            text-align: center;
            border-radius: 24px;
          }
          .pulse-indicator {
            padding-right: 0;
            border-right: none;
          }
          .ticker-item {
            font-size: 14px;
          }
        }
      `}</style>

      <section id="numbers-section" ref={sectionRef}>
        <div className="num-bg-mesh" />
        
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

          {/* Unique Live Pulse Bar */}
          <div className="num-pulse-bar">
            <div className="pulse-indicator">
              <div className="pulse-dot" />
              <span className="pulse-label">Network Pulse</span>
            </div>
            <div className="ticker-container">
              <div className="ticker-track">
                {[...LIVE_EVENTS, ...LIVE_EVENTS].map((evt, idx) => (
                  <span key={idx} className="ticker-item">{evt}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
