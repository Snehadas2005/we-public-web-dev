import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EP = `"Epilogue", sans-serif`;
const SS = `"Source Sans 3", sans-serif`;

const COMPARISON_DATA = [
  {
    category: "Brand & Growth",
    we: "Professional domain, built-in website, and customer-facing apps.",
    them: "Rarely included; requires paying for expensive third-party tools.",
    icon: "bi-globe2"
  },
  {
    category: "Customer Loyalty",
    we: "Live status tracking, 2-way chat, and easy booking apps.",
    them: "Fragmented SMS/WhatsApp messages that get lost in the noise.",
    icon: "bi-heart-fill"
  },
  {
    category: "Garage Management",
    we: "Seamless digital job cards, billing, and automated inventory sync.",
    them: "Manual data entry or disjointed invoicing-only software.",
    icon: "bi-journal-check"
  },
  {
    category: "Scaling Business",
    we: "Centralized Admin Command Center to oversee multiple branches.",
    them: "Often limited to single sites or requires separate logins.",
    icon: "bi-diagram-3-fill"
  },
  {
    category: "Data & Insights",
    we: "360° visibility with real-time profit and expense analytics.",
    them: "Basic reporting that provides little actionable intelligence.",
    icon: "bi-bar-chart-line-fill"
  }
];

export default function Comparison() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header reveal ──
      gsap.from(".cmp-h-item", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
      });

      // ── Rows reveal ──
      // Using a simpler trigger and ensuring we don't 'hide' elements forever
      gsap.from(".cmp-row-item", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: {
          trigger: ".cmp-table-body",
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="comparison" ref={containerRef} style={{ background: "#FFFFFF", padding: "120px 20px", position: "relative", zIndex: 10, width: "100%", fontFamily: SS }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        
        {/* Header section */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "80px" }}>
           <div className="cmp-h-item" style={{ 
             display: "inline-block", padding: "8px 24px", background: "#EBF5FF", borderRadius: "100px", 
             color: "#3C95E8", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px",
             fontFamily: EP
           }}>
             Comparison
           </div>
           <h2 className="cmp-h-item" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#111827", lineHeight: 1.1, marginBottom: "20px", fontFamily: EP }}>
             Why the <span style={{ color: "#3C95E8" }}>Edge</span> is essential.
           </h2>
           <p className="cmp-h-item" style={{ color: "#64748B", fontSize: "18px", maxWidth: "600px", margin: "0 auto", fontWeight: 500 }}>
            Old-school software manages data. Workshop Edge manages your growth, your customers, and your professional reputation.
          </p>
        </div>

        {/* Table Container */}
        <div style={{ background: "#FFFFFF", borderRadius: "40px", boxShadow: "0 20px 80px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9", overflow: "hidden" }}>
          
          {/* Legend */}
          <div style={{ 
             display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#F8FAFC", 
             padding: "30px 48px", borderBottom: "1px solid #F1F5F9", gap: "20px"
          }}>
             <div style={{ color: "#94A3B8", fontWeight: 800, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</div>
             <div style={{ color: "#000000ff", fontWeight: 800, fontSize: "15px", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "10px", fontFamily: EP }}>
               <img src="/we.png" alt="Logo" style={{ height: "21px", objectFit: "contain" }} /> Workshop Edge
             </div>
             <div style={{ color: "#CBD5E1", fontWeight: 800, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Other Software</div>
          </div>

          {/* Table Body */}
          <div className="cmp-table-body">
            {COMPARISON_DATA.map((item, i) => (
              <div key={i} className="cmp-row-item" style={{ 
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "40px 48px", 
                borderBottom: i === COMPARISON_DATA.length - 1 ? "none" : "1px solid #F1F5F9", gap: "40px", alignItems: "center"
              }}>
                {/* col 1 */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#F0F9FF", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(60,149,232,0.1)" }}>
                     <i className={`bi ${item.icon}`} style={{ fontSize: "20px", color: "#3C95E8" }} />
                  </div>
                  <div style={{ fontWeight: 800, color: "#1E293B", fontSize: "16px" }}>{item.category}</div>
                </div>
                {/* col 2 (WE) */}
                <div style={{ color: "#334155", fontSize: "15px", fontWeight: 500, lineHeight: 1.6, display: "flex", gap: "10px" }}>
                  <i className="bi bi-check-circle-fill" style={{ color: "#3C95E8", fontSize: "18px", flexShrink: 0 }} />
                  {item.we}
                </div>
                {/* col 3 (THEM) */}
                <div style={{ color: "#64748B", fontSize: "15px", lineHeight: 1.6, display: "flex", gap: "10px" }}>
                  <i className="bi bi-dash-circle" style={{ color: "#E2E8F0", fontSize: "18px", flexShrink: 0 }} />
                  {item.them}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CSS workaround for mobile */}
        <style>{`
          @media (max-width: 900px) {
            #comparison .cmp-row-item { grid-template-columns: 1fr !important; padding: 30px !important; gap: 20px !important; }
            #comparison .cmp-grid-legend { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}