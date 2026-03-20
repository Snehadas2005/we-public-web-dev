import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../home.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Anywhere,\nAny Device",
    tagline: "Have 24×7 access to your workshop from anywhere, on any device.",
    body: "No need to always log in from a PC or Desktop. WorkshopEdge runs in your browser — phone, tablet, or laptop. Your entire workshop is in your pocket.",
    bullets: [
      "Mobile-first design",     "Tablet & desktop ready",
      "Real-time sync",          "Zero installation required",
      "Offline-resilient",       "Cross-platform access",
    ],
    img: "/india-garage-workshop-sadaramangala-bangalore.avif",
  },
  {
    title: "One-Click\nManagement",
    tagline: "Find any file, job card, or record with a single click.",
    body: "No worries about digging through hundreds of pages. Smart navigation gets you exactly where you need to be — instantly.",
    bullets: [
      "Smart global search",     "Instant job card access",
      "Quick filters",           "Pinned shortcuts",
      "Recent history",          "One-click invoicing",
    ],
    img: "/india-garage-working-person.jpg",
  },
  {
    title: "Accounting\n& Billing",
    tagline: "Real numbers that count every aspect of your business.",
    body: "From GST invoicing to expense tracking — manage your finances in one place. A full accounting suite built for workshops.",
    bullets: [
      "GST / Tax invoices",      "Non-GST invoices",
      "Expense tracking",        "Profit & loss reports",
      "Counter sales",           "PDF export",
    ],
    img: "/india-garage-workshop-sadaramangala-bangalore.avif",
  },
  {
    title: "Inventory &\nReporting",
    tagline: "Track stock levels, purchases and history effortlessly.",
    body: "Never lose track of parts again. Real-time stock updates, low-stock alerts, and graphical reports — all in one dashboard.",
    bullets: [
      "Inventory management",    "Purchase tracking",
      "Graphical reports",       "Excel & CSV export",
      "Low-stock alerts",        "Sales analytics",
    ],
    img: "/india-garage-working-person.jpg",
  },
  {
    title: "Team &\nCustomers",
    tagline: "Manage your staff and keep customers in the loop.",
    body: "From performance tracking to live job status — manage your team with ease. Customers get a mobile app to track their vehicle in real time.",
    bullets: [
      "Staff management",        "Staff login & app",
      "Customer mobile app",     "Live job status",
      "Appointment booking",     "Service history",
    ],
    img: "/india-garage-workshop-sadaramangala-bangalore.avif",
  },
];

const TOTAL = FEATURES.length;

/* ── word-split ─────────────────────────────────────────────── */
function splitWords(el) {
  if (!el || el.dataset.split) return el ? el.querySelectorAll(".fsw-i") : [];
  const raw = el.dataset.raw || el.innerText;
  el.dataset.raw   = raw;
  el.dataset.split = "1";
  el.innerHTML = raw
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map((w) => `<span class="fsw-o"><span class="fsw-i">${w}</span></span>`)
        .join(" ")
    )
    .join("<br/>");
  return el.querySelectorAll(".fsw-i");
}

export default function Features() {
  const spacerRef = useRef(null);
  const stickyRef = useRef(null);
  const slideRefs = useRef([]);
  const imgRefs   = useRef([]);
  const titleRefs = useRef([]);
  // guard against rapid-fire scroll ticks triggering overlapping transitions
  const isAnimating = useRef(false);
  const pendingSlide = useRef(null);

  useEffect(() => {
    /* ── initial visibility ─────────────────────────────────── */
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 });
    });
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.06 });
    });

    if (titleRefs.current[0]) splitWords(titleRefs.current[0]);

    const wm = document.getElementById("fs-wm");
    if (wm) wm.textContent = "01";
    document.getElementById("fs-dot-0")?.classList.add("active");

    let activeSlide = 0;

    /* ── slide transition ──────────────────────────────────── */
    function goTo(next, dir) {
      if (next === activeSlide) return;

      // if already mid-transition, queue the latest target and bail
      if (isAnimating.current) {
        pendingSlide.current = { next, dir };
        return;
      }
      isAnimating.current = true;

      const prev = activeSlide;
      activeSlide = next;

      // dots
      for (let i = 0; i < TOTAL; i++) {
        document.getElementById(`fs-dot-${i}`)?.classList.toggle("active", i === next);
      }

      // watermark flip
      if (wm) {
        gsap.to(wm, {
          opacity: 0,
          y: dir * -28,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            wm.textContent = String(next + 1).padStart(2, "0");
            gsap.fromTo(
              wm,
              { opacity: 0, y: dir * 28 },
              { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
            );
          },
        });
      }

      /* ── EXIT previous slide ── */
      const pSlide = slideRefs.current[prev];
      const pImg   = imgRefs.current[prev];

      if (pSlide) {
        const words   = pSlide.querySelectorAll(".fsw-i");
        const body    = pSlide.querySelector(".fs-body");
        const bullets = pSlide.querySelectorAll(".fs-bullet");

        // words fly out — nice long duration with a slight stagger overlap
        gsap.to(words, {
          yPercent: dir * -115,
          opacity: 0,
          duration: 0.7,
          stagger: { each: 0.04, from: "start" },
          ease: "power2.in",
        });
        gsap.to(body, {
          opacity: 0,
          y: dir * -20,
          duration: 0.55,
          ease: "power2.in",
          delay: 0.05,
        });
        gsap.to(bullets, {
          opacity: 0,
          x: -18,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.in",
          delay: 0.05,
        });
        // hide slide after words are gone
        gsap.to(pSlide, { autoAlpha: 0, duration: 0.1, delay: 0.65 });
      }

      if (pImg) {
        gsap.to(pImg, {
          autoAlpha: 0,
          scale: 1.05,
          duration: 0.75,
          ease: "power2.inOut",
        });
      }

      const ENTER_DELAY = 0.35; 

      const nSlide = slideRefs.current[next];
      const nImg   = imgRefs.current[next];

      if (titleRefs.current[next]) splitWords(titleRefs.current[next]);

      if (nSlide) {
        const words   = nSlide.querySelectorAll(".fsw-i");
        const body    = nSlide.querySelector(".fs-body");
        const bullets = nSlide.querySelectorAll(".fs-bullet");

        // reset enter positions
        gsap.set(nSlide,  { autoAlpha: 1 });
        gsap.set(words,   { yPercent: dir * 115, opacity: 1 });
        gsap.set(body,    { opacity: 0, y: dir * 24 });
        gsap.set(bullets, { opacity: 0, x: -20 });

        gsap.to(words, {
          yPercent: 0,
          duration: 1.0,
          stagger: { each: 0.055, from: "start" },
          ease: "power3.out",
          delay: ENTER_DELAY,
        });
        gsap.to(body, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          delay: ENTER_DELAY + 0.22,
        });
        gsap.to(bullets, {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power2.out",
          delay: ENTER_DELAY + 0.38,
          onComplete: () => {
            isAnimating.current = false;
            if (pendingSlide.current !== null) {
              const { next: pn, dir: pd } = pendingSlide.current;
              pendingSlide.current = null;
              goTo(pn, pd);
            }
          },
        });
      }

      if (nImg) {
        gsap.set(nImg,  { scale: 1.07, autoAlpha: 0 });
        gsap.to(nImg, {
          scale: 1,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power2.out",
          delay: ENTER_DELAY - 0.1, // image leads the text slightly
        });
      }

      // safety unlock in case bullets onComplete never fires (e.g. 0 bullets)
      gsap.delayedCall(ENTER_DELAY + 1.5, () => {
        if (isAnimating.current) {
          isAnimating.current = false;
          if (pendingSlide.current !== null) {
            const { next: pn, dir: pd } = pendingSlide.current;
            pendingSlide.current = null;
            goTo(pn, pd);
          }
        }
      });
    }

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: spacerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (TOTAL - 1)}`,
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate(self) {
            const raw    = self.progress * (TOTAL - 1);
            const target = Math.min(TOTAL - 1, Math.round(raw));
            const dir    = target > activeSlide ? 1 : -1;
            goTo(target, dir);

            const bar = document.getElementById("fs-prog-fill");
            if (bar) bar.style.width = `${self.progress * 100}%`;
          },
        });
      });
      return () => ctx.revert();
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .fsw-o { display:inline-block; overflow:hidden; vertical-align:bottom; }
        .fsw-i { display:inline-block; }

        #fs-sticky {
          width: 100%;
          height: 100vh;
          display: grid;
          grid-template-columns: 48% 52%;
          background: #ecf4feff;
          overflow: hidden;
          position: relative;
        }

        #fs-left {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .fs-slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 4vw 0 6vw;
        }

        .fs-counter {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.35;
          margin-bottom: 2rem;
          color: #0f0f0f;
          font-family: 'Epilogue', sans-serif;
        }

        .fs-title {
          font-family: 'Epilogue', 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: clamp(46px, 5.6vw, 86px);
          line-height: 0.94;
          letter-spacing: -0.045em;
          color: #0f0f0f;
          margin: 0 0 2.2rem;
          white-space: pre-line;
        }

        .fs-tagline {
          font-size: clamp(14px, 1.1vw, 17px);
          font-weight: 600;
          line-height: 1.45;
          color: #0f0f0f;
          margin: 0 0 0.7rem;
          max-width: 390px;
          font-family: 'Epilogue', sans-serif;
        }

        .fs-body-text {
          font-size: clamp(12.5px, 0.85vw, 14.5px);
          line-height: 1.8;
          color: #0f0f0f;
          opacity: 0.55;
          max-width: 380px;
          margin: 0 0 2.6rem;
          font-family: 'Epilogue', sans-serif;
        }

        .fs-bullets {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 1.6rem;
        }

        .fs-bullet {
          font-size: clamp(11px, 0.75vw, 13px);
          display: flex;
          align-items: center;
          gap: 7px;
          color: #0f0f0f;
          opacity: 0.65;
          font-family: 'Epilogue', sans-serif;
        }
        .fs-bullet::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #0f0f0f;
          opacity: 0.45;
          flex-shrink: 0;
        }

        #fs-right {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 3vh 3vw 3vh 1.5vw;
        }

        .fs-img-wrap {
          position: relative;
          width: 100%;
          height: 86%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
        }

        .fs-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        #fs-prog {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(0,0,0,0.07);
          z-index: 9999;
          pointer-events: none;
        }
        #fs-prog-fill {
          height: 100%;
          background: #0f0f0f;
          width: 0%;
          transition: width 0.2s ease;
        }

        #fs-dots {
          position: fixed;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 9px;
          z-index: 9999;
          pointer-events: all;
        }
        .fs-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(0,0,0,0.22);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .fs-dot.active {
          height: 20px;
          border-radius: 3px;
          background: #111 !important;
        }

        #fs-wm {
          position: absolute;
          bottom: -0.05em;
          left: 4.5vw;
          font-family: 'Epilogue', sans-serif;
          font-weight: 900;
          font-size: clamp(90px, 13vw, 170px);
          letter-spacing: -0.06em;
          color: rgba(0, 0, 0, 0.04);
          pointer-events: none;
          user-select: none;
          line-height: 1;
          z-index: 0;
        }

        @media (max-width: 768px) {
          #fs-sticky {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
            height: 100svh;
          }
          #fs-left  { height: auto; }
          #fs-right { height: 38vh; padding: 0 1rem 1rem; }
          .fs-img-wrap { height: 100%; border-radius: 12px; }
          .fs-slide  { padding: 4.5rem 1.4rem 1rem; }
          .fs-title  { font-size: clamp(36px, 10vw, 54px); }
          #fs-dots   { display: none; }
        }
      `}</style>

      <div id="fs-prog"><div id="fs-prog-fill" /></div>

      <div id="fs-dots">
        {FEATURES.map((_, i) => (
          <div
            key={i}
            id={`fs-dot-${i}`}
            className="fs-dot"
            onClick={() => {
              if (!spacerRef.current) return;
              const top = spacerRef.current.offsetTop + i * window.innerHeight;
              window.scrollTo({ top, behavior: "smooth" });
            }}
          />
        ))}
      </div>

      <div ref={spacerRef} id="features" style={{ position: "relative" }}>
        <div ref={stickyRef} id="fs-sticky">

          <div id="fs-left">
            <div id="fs-wm" aria-hidden="true">01</div>

            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="fs-slide"
                ref={(el) => (slideRefs.current[i] = el)}
                style={{ visibility: "hidden" }}
              >
                <p className="fs-counter">
                  {String(i + 1).padStart(2, "0")} — {String(TOTAL).padStart(2, "0")}
                </p>
                <h2
                  className="fs-title"
                  ref={(el) => (titleRefs.current[i] = el)}
                  data-raw={feat.title}
                >
                  {feat.title}
                </h2>
                <div className="fs-body">
                  <p className="fs-tagline">{feat.tagline}</p>
                  <p className="fs-body-text">{feat.body}</p>
                  <div className="fs-bullets">
                    {feat.bullets.map((b, j) => (
                      <span key={j} className="fs-bullet">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="fs-right">
            <div className="fs-img-wrap">
              {FEATURES.map((feat, i) => (
                <img
                  key={i}
                  ref={(el) => (imgRefs.current[i] = el)}
                  className="fs-img"
                  src={feat.img}
                  alt={feat.title}
                  style={{ visibility: "hidden" }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}