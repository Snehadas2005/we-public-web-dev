import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * LandingIntro
 *
 * Hero is position:fixed — sits behind all scrolling sections.
 * A 100vh spacer div gives the "first screen" scroll real estate.
 * As #features slides into view the hero content blurs + fades smoothly.
 * Wordmark never moves (no parallax).
 * Navbar colour is handled in Navbar.jsx — no overrides needed here.
 */
export default function LandingIntro() {
  const contentRef = useRef(null);
  const arrowRef   = useRef(null);

  useEffect(() => {
    // ── Entry animation ──────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-wordmark",
      { yPercent: 22, opacity: 0 },
      { yPercent: 0,  opacity: 1, duration: 1.4 }
    )
      .fromTo(
        ".hero-line",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0,  duration: 0.85, stagger: 0.18 },
        "-=0.6"
      )
      .fromTo(
        [".hero-eyebrow", ".hero-stat"],
        { opacity: 0 },
        { opacity: 1,    duration: 0.6,  stagger: 0.1 },
        "-=0.45"
      )
      .fromTo(
        arrowRef.current,
        { opacity: 0 },
        { opacity: 1,    duration: 0.5 },
        "-=0.2"
      );

    // Arrow idle bounce
    gsap.to(arrowRef.current, {
      y: 7, repeat: -1, yoyo: true,
      duration: 1.15, ease: "sine.inOut", delay: 2.4,
    });

    // ── Smooth blur-out as Features slides over the hero ────
    //
    // scrub: 1.8  →  the animation "catches up" with a 1.8 s lag
    //               which makes it feel buttery-smooth, not instant.
    //
    // start: "top 95%"  →  blur starts just before the next section
    //                       fully enters the viewport (very gentle onset).
    // end:   "top 15%"  →  by the time Features is 85% on screen the
    //                       hero is completely blurred out.
    //
    const blurTrigger = ScrollTrigger.create({
      trigger: "#features",
      start: "top 95%",
      end:   "top 15%",
      scrub: 1.8,          // <── lag creates the smoothness
      onUpdate(self) {
        const p = self.progress; // 0 → 1
        // Ease the progress curve so the blur accelerates gently
        const eased = p * p * (3 - 2 * p); // smoothstep
        gsap.set(contentRef.current, {
          filter:          `blur(${eased * 18}px)`,
          opacity:          1 - eased * 0.9,
          scale:            1 - eased * 0.04,
          transformOrigin: "center center",
        });
      },
    });

    return () => {
      tl.kill();
      blurTrigger.kill();
    };
  }, []);

  const EP = `"Epilogue", sans-serif`;
  const SS = `"Source Sans 3", sans-serif`;

  return (
    <>
      {/* ── Fixed hero — permanently behind scrolling sections ── */}
      <section
        id="hero"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* Background video */}
        <video
          autoPlay loop muted playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/garagevideo.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(165deg,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.42) 52%,rgba(0,0,0,0.80) 100%)",
          zIndex: 1,
        }} />

        {/* Content — blurs & fades on scroll */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 5vw clamp(28px,5vh,60px)",
            willChange: "filter,opacity,transform",
          }}
        >
          {/* Eyebrow */}
          <p
            className="hero-eyebrow"
            style={{
              fontFamily: SS,
              fontSize: "clamp(8px,0.6vw,10px)",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              margin: "0 0 clamp(10px,1.5vh,22px)",
              opacity: 0,
            }}
          >
            Workshop Management Software
          </p>

          {/* Wordmark — single word, never moves */}
          <div
            className="hero-wordmark"
            style={{ marginBottom: "clamp(14px,2.5vh,32px)", opacity: 0 }}
          >
            <h1 style={{
              fontFamily: EP,
              fontWeight: 800,
              fontSize: "clamp(38px,6.2vw,92px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 3px 36px rgba(0,0,0,0.4)",
            }}>
              Workshop Edge
            </h1>
          </div>

          {/* About-us lines */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(5px,0.8vh,11px)",
            maxWidth: "min(500px,94vw)", /* Wider on mobile */
          }}>
            <p
              className="hero-line"
              style={{
                fontFamily: SS,
                fontWeight: 600,
                fontSize: "clamp(13px,1.2vw,17px)", /* Bumped mobile min */
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.35,
                opacity: 0,
              }}
            >
              A modern, all-in-one digital platform.
            </p>

            <p
              className="hero-line"
              style={{
                fontFamily: SS,
                fontWeight: 400,
                fontSize: "clamp(12px,1.0vw,14px)", /* Bumped mobile min */
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                lineHeight: 1.7,
                opacity: 0,
              }}
            >
              Replace manual processes with a single structured system that simplifies
              daily operations, organizes data, and improves business management.
            </p>

            <p
              className="hero-stat"
              style={{
                fontFamily: SS,
                fontWeight: 500,
                fontSize: "clamp(9px,0.7vw,10px)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", /* Brightened for better mobile contrast */
                margin: "clamp(8px,1vh,12px) 0 0",
                opacity: 0,
              }}
            >
              500+ workshops across India
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={arrowRef}
          style={{
            position: "absolute",
            bottom: "clamp(18px,3vh,32px)",
            right: "5vw",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            opacity: 0,
          }}
        >
          <span style={{
            fontFamily: SS,
            fontSize: 8,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}>
            Scroll
          </span>
          <svg width="13" height="20" viewBox="0 0 13 20" fill="none">
            <path d="M6.5 0v16M1 10.5l5.5 6.5 5.5-6.5"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <div id="hero-spacer" style={{ height: "100vh", position: "relative", zIndex: 1 }} />

      <style>{`
        /* All post-hero sections must stack on top of the fixed hero */
        #features,
        #fs-sticky,
        #numbers-section,
        #pkg2-spacer,
        #pkg2-sticky,
        .testimonial-wrapper,
        footer.footer {
          position: relative;
          z-index: 10;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .hero-wordmark h1 { font-size: clamp(32px,9vw,58px) !important; }
        }
        /* Mobile */
        @media (max-width: 480px) {
          .hero-wordmark h1 { font-size: clamp(28px,11vw,42px) !important; }
        }
      `}</style>
    </>
  );
}