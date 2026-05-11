import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { API_BASE_URL } from "../config/env";
import "../style/home.css";

gsap.registerPlugin(ScrollTrigger);

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

export default function Features({ onReady }) {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading]   = useState(true);

  /* DOM refs — always present, never swapped */
  const spacerRef    = useRef(null);
  const stickyRef    = useRef(null);
  const slideRefs    = useRef([]);
  const imgRefs      = useRef([]);
  const titleRefs    = useRef([]);

  /* GSAP state refs */
  const isAnimating  = useRef(false);
  const pendingSlide = useRef(null);
  const gsapCtxRef   = useRef(null);
  const gsapReady    = useRef(false); // guard against StrictMode double-fire

  /* ── fetch feature slides ──────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/feature-slides`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((item) => ({
            ...item,
            img: item.image_url,
          }));
          setFeatures(mapped);
        }
      })
      .catch((err) => console.error("Features fetch error:", err))
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  /* ── GSAP init — fires once after slides are in DOM ─────────── */
  useEffect(() => {
    if (features.length === 0) return;
    if (gsapReady.current) return; // StrictMode guard — only init once
    gsapReady.current = true;

    const TOTAL = features.length;

    /* ── wait one extra frame for React to commit all slide refs ── */
    const timer = setTimeout(() => {
      /* initial GSAP visibility */
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

      /* ── slide transition ── */
      function goTo(next, dir) {
        if (next === activeSlide) return;

        if (isAnimating.current) {
          pendingSlide.current = { next, dir };
          return;
        }
        isAnimating.current = true;

        const prev = activeSlide;
        activeSlide = next;

        /* dots */
        for (let i = 0; i < TOTAL; i++) {
          document.getElementById(`fs-dot-${i}`)?.classList.toggle("active", i === next);
        }

        /* watermark */
        if (wm) {
          gsap.to(wm, {
            opacity: 0, y: dir * -28, duration: 0.5, ease: "power2.in",
            onComplete: () => {
              wm.textContent = String(next + 1).padStart(2, "0");
              gsap.fromTo(wm,
                { opacity: 0, y: dir * 28 },
                { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
              );
            },
          });
        }

        /* EXIT previous */
        const pSlide = slideRefs.current[prev];
        const pImg   = imgRefs.current[prev];
        if (pSlide) {
          const words   = pSlide.querySelectorAll(".fsw-i");
          const body    = pSlide.querySelector(".fs-body");
          const bullets = pSlide.querySelectorAll(".fs-bullet");
          gsap.to(words,   { yPercent: dir * -115, opacity: 0, duration: 0.7, stagger: { each: 0.04, from: "start" }, ease: "power2.in" });
          gsap.to(body,    { opacity: 0, y: dir * -20, duration: 0.55, ease: "power2.in", delay: 0.05 });
          gsap.to(bullets, { opacity: 0, x: -18, duration: 0.45, stagger: 0.04, ease: "power2.in", delay: 0.05 });
          gsap.to(pSlide,  { autoAlpha: 0, duration: 0.1, delay: 0.65 });
        }
        if (pImg) {
          gsap.to(pImg, { autoAlpha: 0, scale: 1.05, duration: 0.75, ease: "power2.inOut" });
        }

        const ENTER_DELAY = 0.35;
        const nSlide = slideRefs.current[next];
        const nImg   = imgRefs.current[next];

        if (titleRefs.current[next]) splitWords(titleRefs.current[next]);

        if (nSlide) {
          const words   = nSlide.querySelectorAll(".fsw-i");
          const body    = nSlide.querySelector(".fs-body");
          const bullets = nSlide.querySelectorAll(".fs-bullet");

          gsap.set(nSlide,  { autoAlpha: 1 });
          gsap.set(words,   { yPercent: dir * 115, opacity: 1 });
          gsap.set(body,    { opacity: 0, y: dir * 24 });
          gsap.set(bullets, { opacity: 0, x: -20 });

          gsap.to(words,   { yPercent: 0, duration: 1.0, stagger: { each: 0.055, from: "start" }, ease: "power3.out", delay: ENTER_DELAY });
          gsap.to(body,    { opacity: 1, y: 0, duration: 0.85, ease: "power2.out", delay: ENTER_DELAY + 0.22 });
          gsap.to(bullets, {
            opacity: 1, x: 0, duration: 0.65, stagger: 0.07, ease: "power2.out", delay: ENTER_DELAY + 0.38,
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
          gsap.set(nImg, { scale: 1.07, autoAlpha: 0 });
          gsap.to(nImg,  { scale: 1, autoAlpha: 1, duration: 1.1, ease: "power2.out", delay: ENTER_DELAY - 0.1 });
        }

        /* safety unlock */
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

      /* ── ScrollTrigger ── */
      gsapCtxRef.current = gsap.context(() => {
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

      /*
       * Refresh ALL ScrollTriggers after the Features pin spacer is inserted.
       * Two rAFs are needed: the first lets GSAP commit the spacer to the DOM,
       * the second lets the browser fully repaint before we re-measure.
       * Without this, Packages' trigger fires at the wrong scroll offset.
       */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          onReady?.(); // Tell parent: pin spacer is in DOM, Packages can safely mount
        });
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
      gsapReady.current  = false;
    };
  }, [features]);

  const TOTAL = features.length;

  /* ── render ─────────────────────────────────────────────────── */
  return (
    <>
      <div id="fs-prog"><div id="fs-prog-fill" /></div>

      {/* Dots — only show when slides are ready */}
      {!loading && TOTAL > 0 && (
        <div id="fs-dots">
          {features.map((_, i) => (
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
      )}

      {/*
        The outer scaffold (spacerRef / stickyRef) is ALWAYS in the DOM.
        This prevents the DOM-swap that was breaking ScrollTrigger:
        the loading state renders inside the same wrapper, keeping refs stable.
      */}
      <div ref={spacerRef} id="features" className="feat-spacer-root">
        <div ref={stickyRef} id="fs-sticky">

          {loading ? (
            /* Loading skeleton — same grid layout, no scroll interference */
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "rgba(15,15,15,0.3)",
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Epilogue', sans-serif",
              }}
            >
              Loading…
            </div>
          ) : (
            <>
              <div id="fs-left">
                <div id="fs-wm" aria-hidden="true">01</div>

                {features.map((feat, i) => (
                  <div
                    key={feat.id ?? i}
                    className="fs-slide fs-slide--prehide"
                    ref={(el) => (slideRefs.current[i] = el)}
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
                  {features.map((feat, i) => (
                    <img
                      key={feat.id ?? i}
                      ref={(el) => (imgRefs.current[i] = el)}
                      className="fs-img fs-img--prehide"
                      src={feat.img}
                      alt={feat.title}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}