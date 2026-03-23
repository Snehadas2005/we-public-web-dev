import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingIntro() {
  const pinRef         = useRef(null);
  const wrapperRef     = useRef(null);
  const logoOnVideoRef = useRef(null);

  const topWordRef  = useRef(null);
  const botWordRef  = useRef(null);
  const leftTagRef  = useRef(null);
  const rightTagRef = useRef(null);

  const about1Ref = useRef(null);
  const about2Ref = useRef(null);
  const about3Ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const pin      = pinRef.current;
        const wrapper  = wrapperRef.current;
        const logoVid  = logoOnVideoRef.current;
        const topWord  = topWordRef.current;
        const botWord  = botWordRef.current;
        const leftTag  = leftTagRef.current;
        const rightTag = rightTagRef.current;
        const about1   = about1Ref.current;
        const about2   = about2Ref.current;
        const about3   = about3Ref.current;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const startW = vw * 0.40;
        const startH = vw * 0.22;

        // Always use left/top as pixel center coords so xPercent/yPercent work correctly
        const centerX = vw / 2;
        const centerY = vh / 2;

        gsap.set(wrapper, {
          width:    startW,
          height:   startH,
          left:     centerX,
          top:      centerY,
          xPercent: -50,
          yPercent: -50,
          borderRadius: 0,
          position: "absolute",
        });

        gsap.set(logoVid,  { opacity: 0.85, scale: 3 });
        gsap.set(leftTag,  { opacity: 0, x: -18 });
        gsap.set(rightTag, { opacity: 0, x:  18 });
        gsap.set([about1, about2, about3], { opacity: 0, y: 32 });

        const midW  = vw * 0.70;
        const midH  = vw * 0.44;

        // For fullscreen: center coords stay the same, size goes to full
        const fullW = vw;
        const fullH = vh;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start:   "top top",
            end:     "+=4800",
            scrub:   1.1,
            pin:     true,
            anticipatePin: 1,
          },
        });

        tl.to(logoVid, {
          opacity: 0, duration: 0.09, ease: "power2.in",
        }, 0);

        // Expand to mid size — keep centered via xPercent/yPercent
        tl.to(wrapper, {
          width:  midW,
          height: midH,
          duration: 0.22, ease: "power2.inOut",
        }, 0);

        tl.to(leftTag,  { opacity: 1, x: 0, duration: 0.12, ease: "power3.out" }, 0.06);
        tl.to(rightTag, { opacity: 1, x: 0, duration: 0.12, ease: "power3.out" }, 0.06);

        tl.to([topWord, botWord], {
          opacity: 0, scale: 0.94,
          duration: 0.14, ease: "power2.in",
        }, 0.22);

        tl.to([leftTag, rightTag], {
          opacity: 0, duration: 0.10, ease: "power2.in",
        }, 0.26);

        // Expand to fullscreen — still centered via xPercent/yPercent
        // so we only change width/height; left/top/xPercent/yPercent stay put
        tl.to(wrapper, {
          width:    fullW,
          height:   fullH,
          duration: 0.32, ease: "power2.inOut",
        }, 0.24);

        tl.to(about1, {
          opacity: 1, y: 0, duration: 0.08, ease: "power3.out",
        }, 0.56);

        tl.to(about1, {
          opacity: 0, y: -20, duration: 0.06, ease: "power2.in",
        }, 0.66);

        tl.to(about2, {
          opacity: 1, y: 0, duration: 0.08, ease: "power3.out",
        }, 0.70);

        tl.to(about2, {
          opacity: 0, y: -20, duration: 0.06, ease: "power2.in",
        }, 0.79);

        tl.to(about3, {
          opacity: 1, y: 0, duration: 0.08, ease: "power3.out",
        }, 0.83);

        tl.to(about3, {
          opacity: 0, y: -20, duration: 0.06, ease: "power2.in",
        }, 0.93);

        const onResize = () => {
          const nw = window.innerWidth;
          const nh = window.innerHeight;
          gsap.set(wrapper, {
            width:    nw * 0.40,
            height:   nw * 0.22,
            left:     nw / 2,
            top:      nh / 2,
            xPercent: -50,
            yPercent: -50,
          });
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);

      }, pinRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const EPILOGUE   = `"Epilogue", "Google Sans", "Outfit", sans-serif`;
  const GOOGLE_SANS = `"Google Sans", "Outfit", "Epilogue", sans-serif`;

  const bigWordStyle = {
    fontFamily: GOOGLE_SANS,
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "clamp(32px, 9vw, 140px)",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    color: "#111",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    display: "block",
  };

  // Redesigned subtext — matches the page's typographic language
  const subWordStyle = {
    fontFamily: EPILOGUE,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "clamp(11px, 0.9vw, 14px)",
    lineHeight: 1.7,
    letterSpacing: "0.015em",
    color: "#6B7280",
    userSelect: "none",
    pointerEvents: "none",
    display: "block",
    textAlign: "right",
    maxWidth: "420px",
  };

  // Redesigned side tags — clean uppercase label style matching the site
  const sideTagStyle = {
    fontFamily: EPILOGUE,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "clamp(9px, 0.7vw, 11px)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#374151",
    lineHeight: 1.75,
    maxWidth: "160px",
  };

  const aboutLayerStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    padding: "0 5vw",
    pointerEvents: "none",
  };

  const aboutTextBase = {
    fontFamily: EPILOGUE,
    fontStyle: "normal",
    color: "#ffffff",
    textAlign: "center",
    margin: 0,
  };

  return (
    <section
      ref={pinRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#ffffffff",
        overflow: "hidden",
      }}
    >

      {/* Top-left headline */}
      <div
        ref={topWordRef}
        style={{
          position: "absolute",
          top: "4vw",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "flex-start",
          padding: "0 4vw",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <span style={bigWordStyle}>WorkshopEdge</span>
      </div>

      {/* Bottom-right subtext */}
      <div
        ref={botWordRef}
        style={{
          position: "absolute",
          bottom: "3vw",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 4vw",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <span style={subWordStyle}>
          Empowering modern garages with cutting-edge software solutions to
          streamline operations and maximize efficiency.
        </span>
      </div>

      {/* Left side tag */}
      <div
        ref={leftTagRef}
        style={{
          position: "absolute",
          left: "2.8vw",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          pointerEvents: "none",
          ...sideTagStyle,
        }}
      >
        cuts through the noise of<br />
        <strong style={{ fontWeight: 700, letterSpacing: "0.1em" }}>GARAGE OPERATIONS.</strong><br />
        built for those who know that<br />
        time wasted on paperwork
      </div>

      {/* Right side tag */}
      <div
        ref={rightTagRef}
        style={{
          position: "absolute",
          right: "2.8vw",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          textAlign: "right",
          pointerEvents: "none",
          ...sideTagStyle,
        }}
      >
        is money lost on<br />
        <strong style={{ fontWeight: 700, letterSpacing: "0.1em" }}>THE FLOOR.</strong>
      </div>

      {/* Video wrapper — centered via left/top + xPercent/yPercent */}
      <div
        ref={wrapperRef}
        style={{
          marginTop: "33px",  
          position: "absolute",
          overflow: "hidden",
          zIndex: 4,
          borderRadius: 0,
          // initial values set by gsap.set in useEffect
        }}
      >
        <video
          autoPlay loop muted playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            display: "block",
          }}
        >
          <source src="/garagevideo.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.65) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* Logo centred on video */}
        <div
          ref={logoOnVideoRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          <img
            src="/we.png"
            alt="WorkshopEdge"
            style={{
              height: "40px",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* About overlays */}
        <div ref={about1Ref} style={aboutLayerStyle}>
          <p style={{
            ...aboutTextBase,
            fontSize: "clamp(20px, 3vw, 50px)",
            fontWeight: 700,
            letterSpacing: "-0.022em",
            lineHeight: 1.12,
            textShadow: "0 2px 16px rgba(0,0,0,0.45)",
            maxWidth: "820px",
          }}>
            Built by people who work in garages.
            <br />
            <span style={{
              fontWeight: 400,
              fontSize: "0.68em",
              letterSpacing: "-0.01em",
              opacity: 0.82,
            }}>
              WorkshopEdge was built from the field.
            </span>
          </p>
        </div>

        <div ref={about2Ref} style={aboutLayerStyle}>
          <p style={{
            ...aboutTextBase,
            fontSize: "clamp(14px, 1.8vw, 26px)",
            fontWeight: 400,
            letterSpacing: "0.005em",
            lineHeight: 1.58,
            textShadow: "0 1px 10px rgba(0,0,0,0.38)",
            maxWidth: "680px",
            color: "rgba(255,255,255,0.91)",
          }}>
            The founders spent close to five years running service stations
            across the country and felt the need to create better tools.
          </p>
        </div>

        <div ref={about3Ref} style={aboutLayerStyle}>
          <p style={{
            ...aboutTextBase,
            fontSize: "clamp(26px, 4.2vw, 68px)",
            fontWeight: 800,
            letterSpacing: "-0.028em",
            lineHeight: 1.06,
            textShadow: "0 3px 20px rgba(0,0,0,0.48)",
          }}>
            They built this software.
          </p>
        </div>

      </div>{/* end wrapperRef */}

    </section>
  );
}