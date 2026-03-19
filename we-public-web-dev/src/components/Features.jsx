import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../home.css";

gsap.registerPlugin(ScrollTrigger);

const NEUE = `"Outfit", "Neue Haas Grotesk", "Helvetica Neue", Arial, sans-serif`;

const GRID_FEATURES = [
  { title: "Access Anywhere/ Any Device",  icon: "bi-display",        oneLiner: "Have 24x7 access to your workshop, from anywhere on any device."                          },
  { title: "One-Click Management",         icon: "bi-cursor",         oneLiner: "Find your destination file with just one click from your fingertips."                      },
  { title: "No Installation Required",     icon: "bi-cloud-check",    oneLiner: "No unnecessary step of installation — nothing extra to install."                           },
  { title: "Accounting",                   icon: "bi-calculator",     oneLiner: "Real numbers that count every aspect of your business."                                     },
  { title: "History",                      icon: "bi-clock-history",  oneLiner: "Vehicle, parts, income and expenses history all in one place."                             },
  { title: "Graphical Reports",            icon: "bi-bar-chart-line", oneLiner: "Periodic visual reports that make your business instantly clear."                           },
  { title: "Employee Management",          icon: "bi-people",         oneLiner: "Personal details, performance and experience all managed together."                         },
  { title: "Automatic Software Update",    icon: "bi-arrow-repeat",   oneLiner: "Software updates itself so you stay focused on growth."                                     },
  { title: "Integrated Inventory",         icon: "bi-box-seam",       oneLiner: "Real-time stock alerts and full purchase history built in."                                 },
];

// ── Single feature card: title+icon front, oneLiner revealed on hover ─────
function FeatureCard({ title, icon, oneLiner }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width:  "200px",
        height: "200px",
        borderRadius: "16px",
        border: "1px solid #E0E0E0",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        ...(hovered ? { boxShadow: "0 8px 28px rgba(0,0,0,0.12)", borderColor: "#ccc" } : {}),
      }}
    >
      {/* Front: icon + title */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "14px", padding: "20px",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity: hovered ? 0 : 1,
        transform: hovered ? "translateY(-12px)" : "translateY(0px)",
      }}>
        <i className={`bi ${icon}`} style={{ fontSize: "30px", color: "#111" }} />
        <span style={{
          fontFamily: NEUE, fontWeight: 600, fontSize: "13px",
          color: "#111", textAlign: "center", lineHeight: 1.3,
        }}>
          {title}
        </span>
      </div>

      {/* Back: oneLiner slides up on hover */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        background: "#111",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0px)" : "translateY(20px)",
      }}>
        <span style={{
          fontFamily: NEUE, fontWeight: 400, fontSize: "12.5px",
          color: "rgba(255,255,255,0.90)", textAlign: "center", lineHeight: 1.6,
        }}>
          {oneLiner}
        </span>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Features() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);   // horizontal scrolling track
  const rightRef    = useRef(null);   // right fixed panel

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track   = trackRef.current;

      if (!section || !track) return;

      // Amount the track needs to scroll left:
      // total track width minus the LEFT panel width (44vw)
      const leftPanelW = section.offsetWidth * 0.44;
      const scrollDist = track.scrollWidth - leftPanelW;

      if (scrollDist <= 0) return;

      // Pin the section and scrub the track leftward
      gsap.to(track, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start:   "top top",
          end:     () => `+=${scrollDist}`,
          scrub:   1.2,
          pin:     true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ITEMS = GRID_FEATURES;

  return (
    <section
      ref={sectionRef}
      id="features"
      style={{
        width:    "100%",
        height:   "100vh",
        background: "#F8F8F6",
        display:  "flex",
        flexDirection: "row",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════
          LEFT 44% — horizontally scrolling carousel of feature cards
          The track is wider than the panel; GSAP scrubs it left.
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        width:    "44%",
        height:   "100%",
        flexShrink: 0,
        overflow: "hidden",
        position: "relative",
        borderRight: "1px solid #E8E8E8",
        display:  "flex",
        alignItems: "center",
      }}>
        {/* Edge fade left + right */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          background: "linear-gradient(to right, #F8F8F6 0%, transparent 12%, transparent 88%, #F8F8F6 100%)",
        }} />

        {/* Scrolling track — wider than the container */}
        <div
          ref={trackRef}
          style={{
            display:  "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "18px",
            paddingLeft:  "32px",
            paddingRight: "32px",
            willChange: "transform",
            width: "max-content",
          }}
        >
          {ITEMS.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          RIGHT 56% — fixed: rectangular image + "Why Choose Us" content
      ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={rightRef}
        style={{
          width:    "56%",
          height:   "100%",
          display:  "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding:  "48px 5vw 48px 4vw",
          gap: "0px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Rectangular image box ── */}
        <div style={{
          width:  "100%",
          height: "clamp(140px, 22vh, 220px)",
          borderRadius: "14px",
          overflow: "hidden",
          marginBottom: "32px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          flexShrink: 0,
        }}>
          <img
            src="/india-garage-workshop-sadaramangala-bangalore.avif"
            alt="Garage Workshop"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* ── Label ── */}
        <p style={{
          fontFamily: NEUE, fontWeight: 500,
          fontSize: "clamp(10px, 0.72vw, 11.5px)",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#999", margin: "0 0 8px 0",
        }}>
          Simple-To-Use Features
        </p>

        {/* ── Headline ── */}
        <h2 style={{
          fontFamily: NEUE, fontWeight: 700,
          fontSize: "clamp(26px, 3.2vw, 50px)",
          letterSpacing: "-0.03em", color: "#111",
          lineHeight: 1.0, margin: "0 0 28px 0",
        }}>
          Why Choose Us?
        </h2>

        {/* ── Feature items ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { h: "Constant Improvement",  p: "Workshop Edge constantly improves itself and looks for the best and efficient way to manage your garage." },
            { h: "Seamless Experience",    p: "We strive to provide you a seamless and smooth experience so that you don't have to worry about managing." },
            { h: "Integrated Management", p: "We bring different aspects of garage management into one single place." },
            { h: "Simple-To-Use",         p: "We skip the complex steps and processes to bring you the best experience." },
            { h: "Customised Packages",   p: "Packages with specific needs suited best for every type of workshop business." },
          ].map((item, i) => (
            <div key={i} style={{ borderLeft: "2px solid #111", paddingLeft: "14px" }}>
              <h3 style={{
                fontFamily: NEUE, fontWeight: 600,
                fontSize: "clamp(13px, 1vw, 15.5px)",
                color: "#111", margin: "0 0 2px 0", lineHeight: 1.3,
              }}>
                {item.h}
              </h3>
              <p style={{
                fontFamily: NEUE, fontWeight: 400,
                fontSize: "clamp(11px, 0.78vw, 12.5px)",
                color: "#777", lineHeight: 1.55, margin: 0,
              }}>
                {item.p}
              </p>
            </div>
          ))}
        </div>

        {/* ── Hint ── */}
        <p style={{
          fontFamily: NEUE, fontSize: "10.5px",
          letterSpacing: "0.10em", textTransform: "uppercase",
          color: "#ccc", margin: "20px 0 0 0",
        }}>
          Hover cards to learn more · Scroll to explore
        </p>
      </div>

    </section>
  );
}