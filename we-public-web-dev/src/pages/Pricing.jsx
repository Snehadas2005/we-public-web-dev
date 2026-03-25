import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

// ── Reusable hook: fade-up reveal on scroll ──────────────────────────────
function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll
      ? ref.current.querySelectorAll('[data-reveal]')
      : [ref.current];

    const targets = els.length ? els : [ref.current];

    gsap.fromTo(
      targets,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: options.duration || 0.85,
        stagger: options.stagger || 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || 'top 82%',
          once: true,
        },
      }
    );
  }, []);
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
          duration: 1.6,
          ease: 'power2.out',
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

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // ── Refs ──────────────────────────────────────────────────────────────
  const heroRef       = useRef(null);
  const statsRef      = useRef(null);
  const overviewRef   = useRef(null);
  const tableRef      = useRef(null);
  const benefitsRef   = useRef(null);
  const cardsRef      = useRef(null);
  const guidanceRef   = useRef(null);
  const faqRef        = useRef(null);
  const ctaRef        = useRef(null);

  // ── Master timeline: hero entrance ───────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title + desc
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.pricing-hero-eyebrow',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          '.pricing-hero-title',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.3'
        )
        .fromTo(
          '.pricing-hero-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.pricing-hero-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, ease: 'power4.inOut' },
          '-=0.4'
        );

      // Stats counter row
      gsap.fromTo(
        '.ph-stat',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        }
      );

      // Overview cards — staggered slide-up with slight rotation
      gsap.fromTo(
        '.overview-item',
        { opacity: 0, y: 60, rotateX: 8 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: overviewRef.current, start: 'top 80%', once: true },
        }
      );

      // Section headers
      ['#overview-hdr', '#table-hdr', '#benefits-hdr', '#guidance-hdr', '#faq-hdr'].forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      // Table rows — cascade in
      gsap.fromTo(
        '.comparison-table tr',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.025, ease: 'power2.out',
          scrollTrigger: { 
            trigger: tableRef.current, 
            start: 'top 78%', 
            once: true,
            onEnter: () => tableRef.current.classList.add('gsap-triggered')
          },
        }
      );

      // Benefit cards
      gsap.fromTo(
        '.benefit-card',
        { opacity: 0, scale: 0.88, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 80%', once: true },
        }
      );

      // Plan cards — dramatic stagger
      gsap.fromTo(
        '.plan-card',
        { opacity: 0, y: 70, scale: 0.93 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.18, ease: 'power4.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', once: true },
        }
      );

      // Guidance cards — slide from left with clip-path wipe
      gsap.fromTo(
        '.guidance-card',
        { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: guidanceRef.current, start: 'top 80%', once: true },
        }
      );

      // FAQ items
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 82%', once: true },
        }
      );

      // CTA box — scale reveal
      gsap.fromTo(
        '.pricing-cta-box',
        { opacity: 0, scale: 0.94, y: 40 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%', once: true },
        }
      );

      // Parallax on CTA image (move centered within its taller container)
      gsap.fromTo('.cta-bg-image', 
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Floating label on featured card
      gsap.to('.plan-tag', {
        y: -4, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.5,
      });

    });

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: 'What is WorkshopEdge?',
      answer: 'WorkshopEdge is a web-based platform built for workshop owners and managers. It handles scheduling, job tracking, inventory management, and customer communication in one place. The system cuts through the noise and gets straight to what matters—running your business efficiently.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We provide email support, phone support during business hours, and a knowledge base with video tutorials. Your dedicated account manager is there when you need guidance on best practices.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Your data is encrypted and backed up daily on secure servers. We comply with industry standards and regularly audit our systems. Your business information stays protected.',
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes. You can upgrade or change your plan anytime as your workshop grows.',
    },
  ];

  return (
    <div className="pricing-page">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pricing-intro container" ref={heroRef}>
        <div className="pricing-header" style={{ position: 'relative' }}>
          {/* Eyebrow */}
          <span
            className="pricing-hero-eyebrow"
            style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--primary-color)',
              marginBottom: '16px',
              opacity: 0,
            }}
          >
            Transparent Pricing
          </span>

          <h1
            className="pricing-hero-title"
            style={{ opacity: 0 }}
          >
            Flexible Plans for Every Workshop
          </h1>

          {/* Animated underline */}
          <div
            className="pricing-hero-line"
            style={{
              height: '3px',
              background: 'var(--primary-color)',
              width: '80px',
              margin: '0 auto 24px',
              borderRadius: '2px',
              opacity: 0,
              transform: 'scaleX(0)',
            }}
          />

          <p
            className="pricing-hero-desc"
            style={{ opacity: 0 }}
          >
            WorkshopEdge offers simple and scalable pricing designed for workshops of every size. Whether you are running a small garage or managing multiple service locations, our plans help you organize operations, track jobs, manage staff, and monitor performance from one platform.
          </p>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(2rem, 6vw, 6rem)',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { val: 500, suffix: '+', label: 'Workshops' },
            { val: 98, suffix: '%', label: 'Satisfaction' },
            { val: 3, suffix: ' Plans', label: 'Simple Pricing' },
          ].map((s) => (
            <div
              key={s.label}
              className="ph-stat"
              style={{ textAlign: 'center', opacity: 0 }}
            >
              <div
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  letterSpacing: '-0.04em',
                  color: 'var(--primary-color)',
                  lineHeight: 1,
                }}
              >
                <AnimatedNumber value={s.val} suffix={s.suffix} />
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-light)',
                  marginTop: '6px',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLAN OVERVIEW ─────────────────────────────────────────────── */}
      <section className="plan-overview-section">
        <div className="container">
          <div className="section-header" id="overview-hdr" style={{ opacity: 0 }}>
            <h2>Find the Right Plan for Your Garage</h2>
          </div>
          <div className="overview-grid" ref={overviewRef}>
            <div className="overview-item">
              <i className="bi bi-lightning-charge"></i>
              <h3>Lite</h3>
              <p>Best for small garages and independent mechanics who need essential tools to manage jobs, customers, and daily operations.</p>
            </div>
            <div className="overview-item">
              <i className="bi bi-star-fill"></i>
              <h3>Prime</h3>
              <p>Ideal for growing workshops that need advanced reporting, GST invoicing, inventory tracking, and better staff coordination.</p>
            </div>
            <div className="overview-item">
              <i className="bi bi-boxes"></i>
              <h3>Enterprise</h3>
              <p>Designed for large garages and multi-location businesses that require full operational control, advanced integrations, and customized solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
            <section className="comparison-section container" ref={tableRef}>
                <div className="comparison-header" id="table-hdr">
                    <h2>See what's included</h2>
                    <p>Compare features across all three tiers to find the perfect fit for your workshop.</p>
                </div>

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
                        
                        {/* Core Capabilities */}
                        <tbody>
                            <tr className="category-row">
                                <td colSpan="4">Core Capabilities</td>
                            </tr>
                            <tr>
                                <td>Unlimited job cards</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Unlimited invoices</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Non-GST / Non-Tax invoices</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>GST / Tax invoices</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Staff management</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Staff login</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Staff mobile app</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Customer mobile app (live status)</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Dashboard level</td>
                                <td>Basic</td>
                                <td>Advanced</td>
                                <td>Full</td>
                            </tr>
                        </tbody>

                        {/* Reporting & Analytics */}
                        <tbody>
                            <tr className="category-row">
                                <td colSpan="4">Reporting & Analytics</td>
                            </tr>
                            <tr>
                                <td>Detailed reports</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Sales reports</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Profit reports</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Export reports as PDF</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                        </tbody>

                        {/* Inventory & Operations */}
                        <tbody>
                            <tr className="category-row">
                                <td colSpan="4">Inventory & Operations</td>
                            </tr>
                            <tr>
                                <td>Inventory management</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Purchase management</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Expense tracking</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Counter spare parts sale</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Appointment booking (Customers)</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Appointment booking (Public)</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Email notifications</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Website (.in domain)</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Data export as Excel</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Data export as CSV</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Data export as PDF</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

      {/* ── CORE BENEFITS ─────────────────────────────────────────────── */}
      <section className="benefits-section" ref={benefitsRef}>
        <div className="container">
          <div className="section-header" id="benefits-hdr" style={{ opacity: 0 }}>
            <h2>Core Platform Benefits</h2>
            <p>All WorkshopEdge plans are designed to simplify daily workshop operations and improve efficiency.</p>
          </div>
          <div className="benefits-grid">
            {[
              { icon: 'bi-diagram-3',      text: 'Centralized job and vehicle history tracking' },
              { icon: 'bi-person-lines-fill', text: 'Easy customer and service record management' },
              { icon: 'bi-cloud-check',    text: 'Cloud-based system accessible from anywhere' },
              { icon: 'bi-graph-up-arrow', text: 'Automated reporting and analytics' },
              { icon: 'bi-shield-lock',    text: 'Secure data storage and regular system updates' },
              { icon: 'bi-window',         text: 'Simple interface designed specifically for garage owners' },
            ].map((b) => (
              <div key={b.icon} className="benefit-card">
                <i className={`bi ${b.icon}`}></i>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN CARDS ────────────────────────────────────────────────── */}
      <section className="plan-selection-section container" ref={cardsRef}>
        <div className="plan-selection-header">
          <h2>Choose Your Plan</h2>
          <p>Transparent and Flexible Pricing built to support workshops at different stages of growth.</p>
        </div>

        <div className="plan-cards-container">
          {/* Lite */}
          <div className="plan-card">
            <div className="plan-card-inner">
              <h3>Lite</h3>
              <p className="plan-subtitle">Ideal for workshops looking for essential tools to enhance daily operations.</p>
              <ul className="plan-features">
                <li><i className="bi bi-check-lg"></i> Job Management &amp; Vehicle History</li>
                <li><i className="bi bi-check-lg"></i> Purchase &amp; Sale Management</li>
                <li><i className="bi bi-check-lg"></i> Powerful Searching</li>
                <li><i className="bi bi-check-lg"></i> Excel Export Data</li>
                <li><i className="bi bi-check-lg"></i> Registration Number Tracking</li>
                <li><i className="bi bi-check-lg"></i> Customer, Supplier &amp; Employee</li>
                <li><i className="bi bi-check-lg"></i> Quarterly Software Updates</li>
              </ul>
              <button className="btn-plan-outline" onClick={() => scrollToDiv('contact-form')}>Free Trial</button>
            </div>
          </div>

          {/* Prime */}
          <div className="plan-card featured">
            <div className="plan-tag">MOST POPULAR</div>
            <div className="plan-card-inner">
              <h3>Prime</h3>
              <p className="plan-subtitle">Designed for workshops that require comprehensive tools.</p>
              <ul className="plan-features">
                <li className="include-text">Lite <i className="bi bi-plus"></i></li>
                <li><i className="bi bi-check-lg"></i> Inventory Management</li>
                <li><i className="bi bi-check-lg"></i> GST/Tax Invoice</li>
                <li><i className="bi bi-check-lg"></i> Customize Reports</li>
                <li><i className="bi bi-check-lg"></i> Excel &amp; PDF Export</li>
                <li><i className="bi bi-check-lg"></i> Monthly Updates</li>
              </ul>
              <button className="btn-plan-solid" onClick={() => scrollToDiv('contact-form')}>Free Trial</button>
            </div>
          </div>

          {/* Enterprise */}
          <div className="plan-card">
            <div className="plan-card-inner">
              <h3>Enterprise</h3>
              <p className="plan-subtitle">Perfect for businesses involved in vehicle trade.</p>
              <ul className="plan-features">
                <li className="include-text">Prime <i className="bi bi-plus"></i></li>
                <li><i className="bi bi-check-lg"></i> Weekly Software Updates</li>
                <li><i className="bi bi-check-lg"></i> Export Data on Mail</li>
                <li><i className="bi bi-check-lg"></i> Manage Images/Documents</li>
                <li><i className="bi bi-check-lg"></i> Track Workshop Cost</li>
                <li><i className="bi bi-check-lg"></i> Client Vehicle Preview</li>
              </ul>
              <button className="btn-plan-dark" onClick={() => scrollToDiv('contact-form')}>Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPGRADE GUIDANCE ──────────────────────────────────────────── */}
      <section className="upgrade-guidance" ref={guidanceRef}>
        <div className="container">
          <div className="guidance-header" id="guidance-hdr" style={{ opacity: 0 }}>
            <h2>When Should You Move to the Next Plan?</h2>
            <p>Growth brings new challenges. WorkshopEdge is designed to scale alongside your workshop, ensuring you always have the tools you need.</p>
          </div>

          <div className="guidance-grid">
            {[
              { icon: 'bi-graph-up-arrow', title: 'Scaling Volume',      text: 'When your workshop begins handling more vehicles each month and manual tracking becomes a bottleneck.' },
              { icon: 'bi-pie-chart-fill', title: 'Advanced Insights',   text: 'When you need deeper data analysis and custom reporting to optimize your business performance.' },
              { icon: 'bi-people-fill',    title: 'Team Expansion',      text: 'When your team grows and you require granular staff permissions and better coordination tools.' },
              { icon: 'bi-cpu-fill',       title: 'Full Automation',     text: 'When you want to fully automate inventory, invoicing, and customer notifications for maximum efficiency.' },
            ].map((g) => (
              <div key={g.title} className="guidance-card">
                <div className="guidance-icon-wrapper">
                  <i className={`bi ${g.icon}`}></i>
                </div>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="pricing-faq bg-light-blue" ref={faqRef}>
        <div className="container">
          <div className="section-header" id="faq-hdr" style={{ opacity: 0 }}>
            <h1>FAQs</h1>
            <p>Find answers to common questions about WorkshopEdge and how it can transform your garage operations</p>
          </div>
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <div className="faq-icon">
                    <i className="bi bi-plus-lg"></i>
                  </div>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="pricing-cta-section" id="contact-form" ref={ctaRef}>
        <div className="pricing-cta-box">
          <img src="/workshop-footer.png" alt="CTA Background" className="cta-bg-image" />
          <div className="cta-content">
            <h2>Ready to streamline</h2>
            <p>Start managing your workshop better today with WorkshopEdge</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">Start Free Trial</Link>
              <Link to="/contact" className="btn-glass">Start Demo</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Extra animation styles (hover polish) ─────────────────────── */}
      <style>{`
        .overview-item {
          transition: transform 0.35s cubic-bezier(0.2,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
          will-change: transform;
          cursor: default;
        }
        .overview-item:hover {
          transform: translateY(-10px) scale(1.02) !important;
        }

        .benefit-card {
          transition: transform 0.35s cubic-bezier(0.2,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
          will-change: transform;
          cursor: default;
        }
        .benefit-card:hover {
          transform: translateY(-8px) scale(1.03) !important;
        }

        .plan-card {
          transition: transform 0.4s cubic-bezier(0.2,1,0.3,1), box-shadow 0.4s ease;
          will-change: transform;
        }
        .plan-card:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 24px 50px rgba(60,149,232,0.18) !important;
        }
        .plan-card.featured:hover {
          transform: translateY(-14px) !important;
          box-shadow: 0 28px 60px rgba(60,149,232,0.28) !important;
        }

        .guidance-card {
          will-change: transform;
          transition: transform 0.4s cubic-bezier(0.2,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .guidance-card:hover {
          transform: translateY(-8px) !important;
        }

        /* Smooth check icon pop-in */
        @keyframes iconPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .comparison-table td .green,
        .comparison-table td .red {
          display: inline-block;
          animation: iconPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
          animation-play-state: paused;
        }
        .comparison-section.gsap-triggered .comparison-table td .green,
        .comparison-section.gsap-triggered .comparison-table td .red {
          animation-play-state: running;
        }

        /* Smooth height transition for plan cards  */
        .plan-card-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Subtle gradient shimmer on featured card */
        .plan-card.featured::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(60,149,232,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Button micro-interaction */
        .btn-plan-outline,
        .btn-plan-solid,
        .btn-plan-dark {
          transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.22s ease !important;
        }
        .btn-plan-outline:hover,
        .btn-plan-solid:hover,
        .btn-plan-dark:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 18px rgba(0,0,0,0.14) !important;
        }
        .btn-plan-outline:active,
        .btn-plan-solid:active,
        .btn-plan-dark:active {
          transform: translateY(0) !important;
        }

        /* Table row hover */
        .comparison-table tbody tr:not(.category-row):hover {
          background: rgba(60, 149, 232, 0.04) !important;
          transition: background 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default Pricing;