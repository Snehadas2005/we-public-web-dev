import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

// ── Word-split utility (mirrors landing page pattern) ──────────────────
function splitWordsManual(el) {
  if (!el || el.dataset.split) return el ? el.querySelectorAll('.sw-i') : [];
  const raw = el.dataset.raw || el.innerText;
  el.dataset.raw = raw;
  el.dataset.split = '1';
  el.innerHTML = raw
    .split(' ')
    .map((w) => `<span class="sw-o"><span class="sw-i">${w}</span></span>`)
    .join(' ');
  return el.querySelectorAll('.sw-i');
}

// ── Animated counter ────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2.0,
          ease: 'power3.out',
          onUpdate() {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
          },
          onComplete() {
            if (ref.current) ref.current.textContent = value + suffix;
          },
        });
      },
    });
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ── Magnetic button hook ────────────────────────────────────────────────
function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength]);
  return ref;
}

// ── Reveal section wrapper ──────────────────────────────────────────────
const RevealSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Pricing = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const heroRef      = useRef(null);
  const heroTitleRef = useRef(null);
  const statsRef     = useRef(null);
  const overviewRef  = useRef(null);
  const tableRef     = useRef(null);
  const benefitsRef  = useRef(null);
  const cardsRef     = useRef(null);
  const guidanceRef  = useRef(null);
  const ctaRef       = useRef(null);
  const lineRef      = useRef(null);
  const eyebrowRef   = useRef(null);

  // ── Hero entrance — word-split title + stagger ───────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow letter-by-letter
      if (eyebrowRef.current) {
        const text = eyebrowRef.current.textContent;
        eyebrowRef.current.innerHTML = text
          .split('')
          .map((c) => (c === ' ' ? ' ' : `<span class="eb-char" style="display:inline-block;opacity:0;transform:translateY(12px)">${c}</span>`))
          .join('');
        gsap.to('.eb-char', {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.025, ease: 'power3.out', delay: 0.2,
        });
      }

      // Title word-split reveal (same as Features/landing page)
      if (heroTitleRef.current) {
        const words = splitWordsManual(heroTitleRef.current);
        gsap.set(words, { yPercent: 110, opacity: 0 });
        gsap.to(words, {
          yPercent: 0, opacity: 1,
          duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.45,
        });
      }

      // Underline draw
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.0, ease: 'power4.inOut', delay: 0.85 }
        );
      }

      // Description fade up
      gsap.fromTo('.pricing-hero-desc',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 }
      );

      // Stats stagger
      gsap.fromTo('.ph-stat',
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        }
      );

      // Overview cards — clip-path curtain reveal
      gsap.fromTo('.overview-item',
        { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 20 },
        {
          opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0,
          duration: 0.85, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: overviewRef.current, start: 'top 80%', once: true },
        }
      );

      // Section headers — word-split like landing
      document.querySelectorAll('.pricing-section-title').forEach((el) => {
        const words = splitWordsManual(el);
        gsap.set(words, { yPercent: 105 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(words, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'power4.out' });
          },
        });
      });

      // Table rows — cascade
      gsap.fromTo('.comparison-table tr',
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.018, ease: 'power2.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 78%', once: true,
            onEnter: () => tableRef.current.classList.add('gsap-triggered'),
          },
        }
      );

      // Benefits — staggered scale pop
      gsap.fromTo('.benefit-card',
        { opacity: 0, scale: 0.82, y: 32 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 82%', once: true },
        }
      );

      // Plan cards — dramatic slide-up with subtle rotation
      gsap.fromTo('.plan-card',
        { opacity: 0, y: 80, rotationX: 12, scale: 0.94, transformPerspective: 800 },
        {
          opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.95, stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', once: true },
        }
      );

      // Guidance cards — clip wipe from left (same as Features bullets)
      gsap.fromTo('.guidance-card',
        { opacity: 0, x: -50, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: guidanceRef.current, start: 'top 82%', once: true },
        }
      );

      // CTA — scale + blur clear
      gsap.fromTo('.pricing-cta-box',
        { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%', once: true },
        }
      );

      // CTA bg parallax scrub
      gsap.fromTo('.cta-bg-image',
        { yPercent: -12 },
        {
          yPercent: 12, ease: 'none',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top bottom', end: 'bottom top', scrub: 1.4,
          },
        }
      );

      // Floating "Most Popular" badge
      gsap.to('.plan-tag', {
        y: -5, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.8,
      });

      // ── Why cards are now handled by Framer Motion below for robust visibility ───

    });
    return () => ctx.revert();
  }, []);

  const scrollToDiv = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <div className="pricing-page" style={{ overflowX: 'hidden' }}>
      <Navbar />

      <style>{`
        /* ── Word-split helpers ── */
        .sw-o { display: inline-block; overflow: hidden; vertical-align: bottom; }
        .sw-i { display: inline-block; }

        /* ── Hero page-entry line ── */
        .pricing-hero-line-el {
          height: 3px;
          background: var(--primary-color);
          width: 80px;
          margin: 0 auto 24px;
          border-radius: 2px;
          transform-origin: left center;
        }

        /* ── Section title overflow clip ── */
        .pricing-section-title-wrap { overflow: hidden; }

        /* ── Plan card cursor glow ── */
        .plan-card { position: relative; }
        .plan-card-inner { position: relative; overflow: hidden; border-radius: inherit; width: 100%; height: 100%; }
        .plan-card-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(60,149,232,0.08) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          border-radius: inherit;
        }
        .plan-card:hover .plan-card-inner::after { opacity: 1; }

        /* ── Benefit card shine sweep ── */
        .benefit-card { position: relative; overflow: hidden; }
        .benefit-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          transition: none;
          pointer-events: none;
        }
        .benefit-card:hover::before {
          animation: shineSweep 0.55s ease forwards;
        }
        @keyframes shineSweep {
          to { left: 160%; }
        }

        /* ── Overview icon bounce ── */
        .overview-item:hover i {
          animation: iconBounce 0.5s cubic-bezier(0.36,0.07,0.19,0.97);
        }
        @keyframes iconBounce {
          0%,100% { transform: translateY(0); }
          30%     { transform: translateY(-8px); }
          60%     { transform: translateY(-3px); }
        }

        /* ── Guidance card icon rotate on hover ── */
        .guidance-card:hover .guidance-icon-wrapper {
          background: var(--primary-color);
          transform: rotate(-12deg) scale(1.08);
        }
        .guidance-card:hover .guidance-icon-wrapper i { color: white; }

        /* ── FAQ accordion icon ── */
        .faq-icon-spin { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); }
        .faq-item.active .faq-icon-spin { transform: rotate(135deg); color: var(--primary-color); }

        /* ── CTA buttons ── */
        .cta-buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .pricing-hero-line-el { margin: 0 0 24px; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pricing-intro container" ref={heroRef} style={{ paddingTop: '80px', paddingBottom: '40px', textAlign: 'center' }}>
        <div className="pricing-header" style={{ position: 'relative' }}>

          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--primary-color)',
              marginBottom: '20px',
            }}
          >
            Transparent Pricing
          </span>

          {/* Title — word-split reveal */}
          <div className="pricing-section-title-wrap" style={{ marginBottom: '12px' }}>
            <h1
              ref={heroTitleRef}
              className="pricing-hero-title"
              data-raw="Flexible Plans for Every Workshop"
              style={{ lineHeight: 1.1, fontWeight: 800 }}
            >
              Flexible Plans for Every Workshop
            </h1>
          </div>

          {/* Animated underline */}
          <div
            ref={lineRef}
            className="pricing-hero-line-el"
            style={{ opacity: 1, transform: 'scaleX(0)' }}
          />

          <p className="pricing-hero-desc" style={{ opacity: 0 }}>
            WorkshopEdge offers simple and scalable pricing designed for workshops of every size. Replace scattered tools with a complete digital ecosystem that connects operations, customers, staff, and your brand into one structured system.
          </p>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem,6vw,6rem)', marginTop: '52px', flexWrap: 'wrap' }}
        >
          {[
            { val: 500, suffix: '+', label: 'Workshops' },
            { val: 100,  suffix: '%', label: 'Satisfaction' },
            { val: 3,   suffix: ' Plans', label: 'Simple Pricing' },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="ph-stat"
              style={{ textAlign: 'center', opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.04em', color: 'var(--primary-color)', lineHeight: 1 }}>
                <AnimatedNumber value={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: '6px' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PLAN OVERVIEW ─────────────────────────────────────────────── */}
      <section className="plan-overview-section">
        <div className="container">
          <RevealSection>
            <div className="section-header pricing-section-title-wrap" id="overview-hdr">
              <h2 className="pricing-section-title" data-raw="Find the Right Plan for Your Garage">
                Find the Right Plan for Your Garage
              </h2>
            </div>
          </RevealSection>
          <div className="overview-grid" ref={overviewRef}>
            {[
              { icon: 'bi-lightning-charge', title: 'Lite',       desc: 'Best for small garages and independent mechanics who need essential tools to manage jobs, customers, and daily operations.' },
              { icon: 'bi-star-fill',        title: 'Prime',      desc: 'Ideal for growing workshops that need advanced reporting, GST invoicing, inventory tracking, and better staff coordination.' },
              { icon: 'bi-boxes',            title: 'Enterprise', desc: 'Designed for large garages and multi-location businesses that require full operational control and customized solutions.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="overview-item"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <i className={`bi ${item.icon}`}></i>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────── */}
      <section className="comparison-section container" ref={tableRef}>
        <RevealSection>
          <div className="comparison-header pricing-section-title-wrap" id="table-hdr">
            <h2 className="pricing-section-title" data-raw="See what's included">See what&apos;s included</h2>
            <p>Compare features across all three tiers to find the perfect fit for your workshop.</p>
          </div>
        </RevealSection>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-category-col"></th>
                <th className="tier-col">Lite</th>
                <th className="tier-col">Prime</th>
                <th className="tier-col">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="category-row"><td colSpan="4">Core Capabilities</td></tr>
              {[
                ['Unlimited job cards', true, true, true],
                ['Unlimited invoices', true, true, true],
                ['Non-GST / Non-Tax invoices', true, true, true],
                ['GST / Tax invoices', false, true, true],
                ['Staff management', true, true, true],
                ['Staff login', false, true, true],
                ['Staff mobile app', true, true, true],
                ['Customer mobile app (live status)', true, true, true],
                ['Dashboard level', 'Basic', 'Advanced', 'Full'],
              ].map(([feat, l, p, e], i) => (
                <tr key={i} className={i % 2 === 1 ? 'alt-bg' : ''}>
                  <td>{feat}</td>
                  {[l, p, e].map((v, j) => (
                    <td key={j}>
                      {typeof v === 'boolean'
                        ? <i className={`bi ${v ? 'bi-check green' : 'bi-x red'}`}></i>
                        : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr className="category-row"><td colSpan="4">Reporting & Analytics</td></tr>
              {[
                ['Detailed reports', false, true, true],
                ['Sales reports', true, true, true],
                ['Profit reports', false, true, true],
                ['Export reports as PDF', false, true, true],
              ].map(([feat, l, p, e], i) => (
                <tr key={i} className={i % 2 === 1 ? 'alt-bg' : ''}>
                  <td>{feat}</td>
                  {[l, p, e].map((v, j) => (
                    <td key={j}><i className={`bi ${v ? 'bi-check green' : 'bi-x red'}`}></i></td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr className="category-row"><td colSpan="4">Inventory & Operations</td></tr>
              {[
                ['Inventory management', false, true, true],
                ['Purchase management', false, true, true],
                ['Expense tracking', true, true, true],
                ['Counter spare parts sale', true, true, true],
                ['Appointment booking (Customers)', true, true, true],
                ['Appointment booking (Public)', false, false, true],
                ['Email notifications', false, false, true],
                ['Website (.in domain)', false, false, true],
                ['Data export as Excel', true, true, true],
                ['Data export as CSV', false, false, true],
                ['Data export as PDF', false, false, true],
              ].map(([feat, l, p, e], i) => (
                <tr key={i} className={i % 2 === 1 ? 'alt-bg' : ''}>
                  <td>{feat}</td>
                  {[l, p, e].map((v, j) => (
                    <td key={j}><i className={`bi ${v ? 'bi-check green' : 'bi-x red'}`}></i></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CORE BENEFITS ─────────────────────────────────────────────── */}
      <section className="benefits-section" ref={benefitsRef}>
        <div className="container">
          <RevealSection>
            <div className="section-header pricing-section-title-wrap" id="benefits-hdr">
              <h2 className="pricing-section-title" data-raw="Core Platform Benefits">Core Platform Benefits</h2>
              <p>All WorkshopEdge plans are designed to simplify daily workshop operations and improve efficiency.</p>
            </div>
          </RevealSection>
          <div className="benefits-grid">
            {[
              { icon: 'bi-diagram-3',         text: 'Dynamic inventory scaling with automated part deduction' },
              { icon: 'bi-person-lines-fill',  text: 'Self-updating customer service records and history' },
              { icon: 'bi-truck',              text: 'Full supplier tracking including GST and contact details' },
              { icon: 'bi-graph-up-arrow',     text: 'Advanced financial reports with custom date filters' },
              { icon: 'bi-cash-coin',          text: 'Comprehensive expense tracking for utility and bills' },
              { icon: 'bi-calendar-heart',     text: 'Integrated mobile and web appointment system' },
            ].map((b) => (
              <motion.div
                key={b.icon}
                className="benefit-card"
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              >
                <i className={`bi ${b.icon}`}></i>
                <p>{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN CARDS ────────────────────────────────────────────────── */}
      <section className="plan-selection-section container" ref={cardsRef}>
        <RevealSection>
          <div className="plan-selection-header pricing-section-title-wrap">
            <h2 className="pricing-section-title" data-raw="Choose Your Plan">Choose Your Plan</h2>
            <p>Transparent and Flexible Pricing built to support workshops at different stages of growth.</p>
          </div>
        </RevealSection>

        <div className="plan-cards-container">
          {[
            {
              name: 'Lite', featured: false,
              subtitle: 'Ideal for workshops looking for essential tools to enhance daily operations.',
              features: ['Job Management & Service History', 'Basic Sales & Purchase Tracking', 'Supplier & Staff Records', 'Excel Data Export', 'Registration Number Tracking', 'Integrated Help Ticket System', 'Quarterly Software Updates'],
              btnClass: 'btn-plan-outline', btnText: 'Free Trial',
            },
            {
              name: 'Prime', featured: true,
              subtitle: 'Designed for workshops that require comprehensive tools.',
              features: ['Lite +', 'Dynamic Inventory Scaling', 'GST/Tax Compliant Invoices', 'Detailed Reporting & Filters', 'Miscellaneous Expense Tracking', 'Excel & PDF Export', 'Monthly Updates'],
              btnClass: 'btn-plan-solid', btnText: 'Free Trial',
            },
            {
              name: 'Enterprise', featured: false,
              subtitle: 'Perfect for businesses involved in vehicle trade.',
              features: ['Prime +', 'Cloud Garage Locker (Files/Folders)', 'Two-Way Appointment System', 'Custom Financial Breakthroughs', 'Track Total Workshop Costs', 'Weekly Software Updates'],
              btnClass: 'btn-plan-dark', btnText: 'Contact Sales',
            },
          ].map((card, i) => (
            <motion.div
              key={card.name}
              className={`plan-card ${card.featured ? 'featured' : ''}`}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
                e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
              }}
              whileHover={{
                y: card.featured ? -16 : -12,
                boxShadow: card.featured
                  ? '0 32px 64px rgba(60,149,232,0.28)'
                  : '0 24px 52px rgba(60,149,232,0.16)',
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {card.featured && <div className="plan-tag">MOST POPULAR</div>}
              <div className="plan-card-inner">
                <h3>{card.name}</h3>
                <p className="plan-subtitle">{card.subtitle}</p>
                <ul className="plan-features">
                  {card.features.map((f, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -12 }}
                      animate={hoveredCard === i ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.04, duration: 0.35 }}
                    >
                      {j === 0 && (f === 'Lite +' || f === 'Prime +')
                        ? <span className="include-text">{f.replace(' +', '')} <i className="bi bi-plus"></i></span>
                        : <><i className="bi bi-check-lg"></i> {f}</>
                      }
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className={card.btnClass}
                  onClick={() => scrollToDiv('contact-form')}
                  whileHover={{ y: -2, boxShadow: '0 8px 20px rgba(0,0,0,0.14)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {card.btnText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY WORKSHOPEDGE ─────────────────────────────────────────── */}
      <section className="why-we-section" style={{ backgroundColor: '#F0F7FF', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container">
          <RevealSection>
            <div className="section-header pricing-section-title-wrap" id="why-we-hdr">
              <h2 className="pricing-section-title" data-raw="Why WorkshopEdge?" style={{ fontWeight: 700 }}>Why WorkshopEdge?</h2>
              <p className="section-desc" style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>Experience the industry-leading standards that set us apart.</p>
            </div>
          </RevealSection>
          <div className="why-we-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '1100px', margin: '40px auto 0' }}>
            {[
              { icon: 'bi-boxes',       title: 'Dynamic Inventory scaling', desc: 'Automatic inventory deduction as you scale parts. Complete customer records with history and quantity saved instantly.' },
              { icon: 'bi-cart-check',  title: 'End-to-End Sales & Purchase', desc: 'Track spare parts sales and client purchases. Inventory syncs automatically for new items or existing stock.' },
              { icon: 'bi-people',      title: 'Supplier & Staff Directory', desc: 'Maintain records for suppliers (GST, address) and staff (joining, leaving, salary, roles) in one central system.' },
              { icon: 'bi-receipt',     title: 'Smart Expense Tracking', desc: 'Keep track of electricity bills, utility costs, and other non-inventory expenses to monitor your total overhead.' },
              { icon: 'bi-calendar-event', title: 'Two-Way Appointments', desc: 'Unified scheduling from both ends—the customer mobile app and your garage owner dashboard.' },
              { icon: 'bi-bar-chart-line', title: 'Advanced Financial Analysis', desc: 'Detailed financial breakdowns: Revenue, Profit, Expenses, and Salary. Filter by month, year, or specific dates across all payment modes (CASH, UPI, CARD, BANK).' },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="why-we-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                style={{ backgroundColor: 'white', padding: '40px 30px', borderRadius: '24px', border: '1px solid rgba(60,149,232,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
              >
                <div className="guidance-icon-wrapper" style={{ width: '64px', height: '64px', backgroundColor: '#E5F1FF', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                  <i className={`bi ${card.icon}`} style={{ fontSize: '28px', color: 'var(--primary-color)' }}></i>
                </div>
                <h4 style={{ fontSize: '19px', fontWeight: 600, marginBottom: '15px' }}>{card.title}</h4>
                <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#6B7280' }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPGRADE GUIDANCE ──────────────────────────────────────────── */}
      <section className="upgrade-guidance" ref={guidanceRef}>
        <div className="container">
          <RevealSection>
            <div className="guidance-header pricing-section-title-wrap" id="guidance-hdr">
              <h2 className="pricing-section-title" data-raw="When Should You Move to the Next Plan?">
                When Should You Move to the Next Plan?
              </h2>
              <p>Growth brings new challenges. WorkshopEdge is designed to scale alongside your workshop, ensuring you always have the tools you need.</p>
            </div>
          </RevealSection>

          <div className="guidance-grid">
            {[
              { icon: 'bi-graph-up-arrow', title: 'Scaling Volume',    text: 'When your workshop begins handling more vehicles each month and manual tracking becomes a bottleneck.' },
              { icon: 'bi-pie-chart-fill', title: 'Advanced Insights', text: 'When you need deeper data analysis and custom reporting to optimize your business performance.' },
              { icon: 'bi-people-fill',    title: 'Team Expansion',    text: 'When your team grows and you require granular staff permissions and better coordination tools.' },
              { icon: 'bi-cpu-fill',       title: 'Full Automation',   text: 'When you want to fully automate inventory, invoicing, and customer notifications for maximum efficiency.' },
            ].map((g) => (
              <motion.div
                key={g.title}
                className="guidance-card"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <motion.div
                  className="guidance-icon-wrapper"
                  whileHover={{ rotate: -12, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <i className={`bi ${g.icon}`}></i>
                </motion.div>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="pricing-cta-section" id="contact-form" ref={ctaRef}>
        <div className="pricing-cta-box">
          <img src="/workshop-footer.png" alt="CTA Background" className="cta-bg-image" />
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Ready to streamline</h2>
            <p>Start managing your workshop better today with WorkshopEdge</p>
            <div className="cta-buttons">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="btn-primary">Start Free Trial</Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="btn-glass">Start Demo</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        .overview-item { transition: transform 0.35s cubic-bezier(0.2,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease; will-change: transform; cursor: default; }
        .plan-card { transition: box-shadow 0.4s ease; will-change: transform; }
        .plan-card.featured::before { content:''; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(135deg,rgba(60,149,232,0.06) 0%,transparent 60%); pointer-events:none; }
        .btn-plan-outline, .btn-plan-solid, .btn-plan-dark { transition: transform 0.22s ease, box-shadow 0.22s ease !important; }
        .comparison-table tbody tr:not(.category-row):hover { background:rgba(60,149,232,0.04)!important; transition:background 0.2s ease; }
        @keyframes iconPop { 0%{transform:scale(0)rotate(-20deg);opacity:0}70%{transform:scale(1.2)rotate(5deg)}100%{transform:scale(1)rotate(0);opacity:1} }
        .comparison-table td .green, .comparison-table td .red { display:inline-block; animation:iconPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; animation-play-state:paused; }
        .comparison-section.gsap-triggered .comparison-table td .green, .comparison-section.gsap-triggered .comparison-table td .red { animation-play-state:running; }
        .plan-card-inner { display:flex; flex-direction:column; height:100%; }
      `}</style>
    </div>
  );
};

export default Pricing;