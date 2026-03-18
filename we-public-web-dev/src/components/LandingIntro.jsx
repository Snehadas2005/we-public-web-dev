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

        gsap.set(wrapper,  { width: "40vw", height: "20vw"});
        gsap.set(logoVid,  { opacity: 0.78, scale: 3 });
        gsap.set(leftTag,  { opacity: 0, x: -18 });
        gsap.set(rightTag, { opacity: 0, x:  18 });

        gsap.set([about1, about2, about3], { opacity: 0, y: 32 });

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

        tl.to(wrapper, {
          width: "70vw", height: "44vw",
          borderRadius: "14px",
          duration: 0.20, ease: "power2.inOut",
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

        tl.to(wrapper, {
          width:  "calc(100vw - 16px)",
          height: "calc(100vh - 16px)",
          borderRadius: "10px",
          duration: 0.30, ease: "power2.inOut",
        }, 0.24);

        tl.to(about1, {
          opacity: 1, y: 0,
          duration: 0.08, ease: "power3.out",
        }, 0.56);

        tl.to(about1, {
          opacity: 0, y: -20,
          duration: 0.06, ease: "power2.in",
        }, 0.66);

        tl.to(about2, {
          opacity: 1, y: 0,
          duration: 0.08, ease: "power3.out",
        }, 0.70);

        tl.to(about2, {
          opacity: 0, y: -20,
          duration: 0.06, ease: "power2.in",
        }, 0.79);

        tl.to(about3, {
          opacity: 1, y: 0,
          duration: 0.08, ease: "power3.out",
        }, 0.83);

        tl.to(about3, {
          opacity: 0, y: -20,
          duration: 0.06, ease: "power2.in",
        }, 0.93);

      }, pinRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const NEUE = `"Neue", "Neue Haas Grotesk", "Helvetica Neue", Arial, sans-serif`;

  const bigWordStyle = {
    fontFamily: NEUE,
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: "clamp(72px, 12.5vw, 196px)",
    lineHeight: 0.88,
    letterSpacing: "-0.03em",
    color: "#111",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    display: "block",
  };

  const sideTagStyle = {
    fontFamily: NEUE,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "clamp(10px, 0.82vw, 13px)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#111",
    lineHeight: 1.6,
    maxWidth: "170px",
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
    fontFamily: NEUE,
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
        background: "#F8F8F6",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <div
        ref={topWordRef}
        style={{
          position: "absolute",
          top: "1.8vw",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <span style={bigWordStyle}>WORKSHOP</span>
      </div>

      <div
        ref={botWordRef}
        style={{
          position: "absolute",
          bottom: "-0.3vw",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <span style={bigWordStyle}>EDGE</span>
      </div>

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
        <strong style={{ fontWeight: 700 }}>GARAGE OPERATIONS.</strong><br />
        built for those who know that<br />
        time wasted on paperwork
      </div>

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
        <strong style={{ fontWeight: 700 }}>THE FLOOR.</strong>
      </div>

      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          zIndex: 4,
          boxShadow: "0 22px 64px rgba(0,0,0,0.28)",
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

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.65) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

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