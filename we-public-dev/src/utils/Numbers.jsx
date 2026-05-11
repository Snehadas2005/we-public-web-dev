import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCms } from "../context/CmsContext";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_STATS = [
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
  const { stats: statsData } = useCms();

  const parseStatValue = (raw) => {
    const text = String(raw ?? "").trim();
    const match = text.match(/^([\d.]+)\s*([A-Za-z%+]*)$/);
    if (!match) return { value: 0, suffix: "", rawText: "0" };

    const baseValue = Number(match[1]) || 0;
    const suffix = match[2] || "";
    const normalizedSuffix = suffix.replace("+", "");
    const multiplierMap = { K: 1000, M: 1000000, B: 1000000000 };
    const multiplier = multiplierMap[normalizedSuffix] || 1;

    return {
      value: baseValue * multiplier,
      suffix,
      rawText: text,
    };
  };

  const formatAnimatedValue = (value, suffix) => {
    if (suffix.includes("%")) return `${Math.round(value)}%`;
    if (suffix.includes("K")) return `${Math.round(value / 1000)}${suffix}`;
    if (suffix.includes("M")) return `${Math.round(value / 1000000)}${suffix}`;
    if (suffix.includes("B")) return `${Math.round(value / 1000000000)}${suffix}`;
    return `${Math.round(value)}${suffix}`;
  };

  const stats = useMemo(() => {
    if (!statsData) return DEFAULT_STATS;
    const users = parseStatValue(statsData.total_users_count);
    const services = parseStatValue(statsData.total_services_count);
    const cities = parseStatValue(statsData.total_city_count);
    const invoices = parseStatValue(statsData.worth_invoice_generated);

    return [
      { value: users.value, suffix: users.suffix, label: "Total Users", rawText: users.rawText },
      { value: services.value, suffix: services.suffix, label: "Total Services", rawText: services.rawText },
      { value: cities.value, suffix: cities.suffix, label: "Total Cities", rawText: cities.rawText },
      { value: invoices.value, suffix: invoices.suffix, label: "Worth Invoice Generated", rawText: invoices.rawText },
    ];
  }, [statsData]);

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
          const stat = stats[i];
          tl.to(
            { val: 0 },
            {
              val: stat.value,
              duration: 2.2,
              ease: "expo.out",
              onUpdate() {
                el.textContent = formatAnimatedValue(this.targets()[0].val, stat.suffix);
              },
              onComplete() {
                el.textContent = stat.rawText || formatAnimatedValue(stat.value, stat.suffix);
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
  }, [stats]);

  return (
    <>
      <section id="numbers-section" ref={sectionRef}>
        <div className="num-bg-mesh" />
        
        <div className="num-inner">
          <div className="num-header">
            <p className="num-title">Trusted by workshops<br />across India</p>
            <p className="num-subtitle">Real numbers from real garages running on WorkshopEdge</p>
            <div className="num-line" ref={lineRef} />
          </div>

          <div className="num-grid">
            {stats.map((stat, i) => (
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
