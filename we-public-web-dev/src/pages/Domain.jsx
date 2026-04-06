import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Floating domain badge ────────────────────────────────────── */
function DomainBadge({ domain, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(60,149,232,0.2)', borderRadius: 100,
        padding: '8px 18px',
        boxShadow: '0 4px 20px rgba(60,149,232,0.1)',
        fontSize: 13, fontWeight: 600, color: '#1b1b1bff',
        fontFamily: "'Epilogue', sans-serif",
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
      {domain}
    </motion.div>
  );
}

/* ── Browser Mock ─────────────────────────────────────────────── */
function BrowserMock({ children, url = 'yourgarage.workshopedge.in' }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20,
      boxShadow: '0 40px 100px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      <div style={{
        background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: '#EEF2F7', borderRadius: 8, padding: '6px 14px',
          display: 'flex', alignItems: 'center', gap: 8, minWidth: 0,
        }}>
          <i className="bi bi-lock-fill" style={{ fontSize: 10, color: '#10B981', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#64748B', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Feature Row ──────────────────────────────────────────────── */
function FeatureRow({ icon, title, desc, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}25` }}>
        <i className={`bi ${icon}`} style={{ fontSize: 18, color }} />
      </div>
      <div>
        <div style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 15, color: '#1b1b1bff', marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, fontFamily: "'Epilogue', sans-serif" }}>{desc}</div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Website() {
  const h1Ref = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(h1Ref.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }
    ).fromTo(subRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9 }, '-=0.6'
    );

    gsap.utils.toArray('.ws-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });

    gsap.to('.domain-float-1', { y: -8, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.domain-float-2', { y: -8, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.4 });
    gsap.to('.domain-float-3', { y: -8, duration: 3.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.8 });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const templates = [
    { name: 'Professional Garage', tag: 'Classic', color: '#3C95E8', icon: 'bi-wrench-adjustable' },
    { name: 'Multi-Service Center', tag: 'Premium', color: '#8B5CF6', icon: 'bi-tools' },
    { name: 'Luxury Auto Care', tag: 'Elite', color: '#F59E0B', icon: 'bi-car-front-fill' },
    { name: 'Quick Service Hub', tag: 'Modern', color: '#10B981', icon: 'bi-lightning-charge-fill' },
  ];

  const features = [
    { icon: 'bi-globe2', title: 'Your Own .in Domain', desc: 'Get a professional domain like yourgarage.workshopedge.in included — no extra setup needed.', color: '#3C95E8' },
    { icon: 'bi-palette-fill', title: 'Customizable Templates', desc: 'Choose from garage-specific templates. Add your logo, colors, services, and photos easily.', color: '#8B5CF6' },
    { icon: 'bi-calendar-check-fill', title: 'Online Appointment Booking', desc: 'Let customers book service slots from your website. Bookings sync instantly to your dashboard.', color: '#10B981' },
    { icon: 'bi-geo-alt-fill', title: 'Location & Hours', desc: 'Display branch locations, contact numbers, working hours and receive customer inquiries by email.', color: '#F59E0B' },
    { icon: 'bi-megaphone-fill', title: 'Blog & Offers', desc: 'Post service offers, seasonal discounts, and content to keep customers engaged.', color: '#EF4444' },
    { icon: 'bi-qr-code-scan', title: 'QR Code Sharing', desc: 'Generate a QR code for your site. Print on bills, cards, or banners to drive instant traffic.', color: '#06B6D4' },
  ];

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Navbar />

      <style>{`
        /* ── Layout grids ── */
        .ws-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .ws-two-ways-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .ws-template-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .ws-feat-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .ws-how-steps { display: grid; grid-template-columns: repeat(3, 1fr); background: rgba(0,0,0,0.04); border-radius: 24px; overflow: hidden; }
        .ws-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; border-radius: 24px; overflow: hidden; }
        .ws-domain-badges { display: flex; gap: 10px; margin-top: 36px; flex-wrap: wrap; }
        .ws-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .ws-hero-browser { display: block; }
        .ws-mobile-visual { display: none; }
        .ws-cta-btns { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

        /* ── Button hovers ── */
        .ws-btn-dark:hover { background: #243650 !important; transform: translateY(-2px); box-shadow: 0 12px 36px rgba(26,42,58,0.3) !important; }
        .ws-btn-outline:hover { border-color: #3C95E8 !important; color: #3C95E8 !important; transform: translateY(-2px); }
        .ws-btn-blue:hover { background: #2b84d7 !important; transform: translateY(-2px); box-shadow: 0 12px 36px rgba(60,149,232,0.4) !important; }
        .ws-btn-gold:hover {  background: #ffbb00ff !important; transform: translateY(-2px); box-shadow: 0 12px 36px rgba(255, 236, 158, 0.66) !important; }

        /* ── Tablet (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .ws-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .ws-hero-browser { display: none !important; }
          .ws-mobile-visual { display: flex !important; }
          .ws-two-ways-grid { grid-template-columns: 1fr !important; }
          .ws-template-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ws-feat-cols { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ws-how-steps { grid-template-columns: 1fr !important; }
          .ws-how-steps .ws-step-item { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.06) !important; }
          .ws-how-steps .ws-step-item:last-child { border-bottom: none !important; }
          .ws-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ws-section-pad { padding: 72px 20px !important; }
        }

        /* ── Mobile (≤ 640px) ── */
        @media (max-width: 640px) {
          .ws-hero-grid { gap: 2.5rem !important; }
          .ws-template-grid { grid-template-columns: 1fr !important; }
          .ws-hero-btns { flex-direction: column !important; }
          .ws-hero-btns a, .ws-hero-btns button { width: 100% !important; justify-content: center !important; }
          .ws-domain-badges { gap: 8px !important; }
          .ws-cta-btns { flex-direction: column !important; align-items: center !important; }
          .ws-cta-btns a { width: 100% !important; max-width: 300px !important; justify-content: center !important; }
          .ws-section-pad { padding: 60px 16px !important; }
          .ws-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ws-two-ways-card { padding: 32px 24px !important; }
          .ws-two-ways-card .ws-watermark { font-size: 100px !important; }
        }

        /* scrollbar hide for mobile domain strip */
        .ws-domain-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .ws-domain-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', paddingTop: 80,
        background: 'linear-gradient(160deg, #f8fbff 0%, #EBF5FF 55%, #f4f9ff 100%)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'radial-gradient(circle, rgba(60,149,232,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: '55vw', height: '55vw', background: '#3C95E8', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', background: '#8B5CF6', filter: 'blur(100px)', opacity: 0.06, borderRadius: '50%', zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="ws-hero-grid">

            {/* LEFT TEXT */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(60,149,232,0.08)', border: '1px solid rgba(60,149,232,0.2)', borderRadius: 100, padding: '7px 18px', marginBottom: 28 }}>
                <i className="bi bi-globe2" style={{ color: '#3C95E8', fontSize: 13 }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Epilogue', sans-serif" }}>Website & Branding Platform</span>
              </motion.div>

              <h1 ref={h1Ref} style={{ opacity: 0, fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(38px, 5.5vw, 72px)', lineHeight: 0.97, letterSpacing: '-0.04em', color: '#1b1b1bff', margin: '0 0 28px' }}>
                Your garage,<br />
                <span style={{ color: '#3C95E8' }}>on the web.</span>
              </h1>

              <p ref={subRef} style={{ opacity: 0, fontSize: 'clamp(14px, 1.1vw, 17px)', color: '#4B5563', lineHeight: 1.75, maxWidth: 460, marginBottom: 40, fontFamily: "'Epilogue', sans-serif" }}>
                Build your garage's digital identity with a professional website and your own domain. Choose a ready-made template or get a fully custom-built site — let customers find you, book online, and stay connected.
              </p>

              <motion.div className="ws-hero-btns" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.1 }}>
                <Link to="/contact" className="ws-btn-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 32px', borderRadius: 100, fontWeight: 700, fontSize: 15, background: '#3C95E8', color: '#fff', textDecoration: 'none', boxShadow: '0 8px 32px rgba(60,149,232,0.38)', fontFamily: "'Epilogue', sans-serif", transition: 'all 0.3s ease' }}>
                  <i className="bi bi-arrow-right-circle-fill" /> Create Your Website
                </Link>
                <a href="#how-it-works" className="ws-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 32px', borderRadius: 100, fontWeight: 700, fontSize: 15, background: 'transparent', color: '#1b1b1bff', border: '1.5px solid rgba(0,0,0,0.15)', textDecoration: 'none', fontFamily: "'Epilogue', sans-serif", transition: 'all 0.3s ease' }}>
                  <i className="bi bi-eye-fill" /> See How It Works
                </a>
              </motion.div>

              {/* Floating badges */}
              <motion.div className="ws-domain-badges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                <div className="domain-float-1"><DomainBadge domain="speedauto.workshopedge.in" delay={0} /></div>
                <div className="domain-float-2"><DomainBadge domain="rexgarage.workshopedge.in" delay={0.1} /></div>
                <div className="domain-float-3"><DomainBadge domain="yourname.workshopedge.in" delay={0.2} /></div>
              </motion.div>
            </div>

            {/* RIGHT — Desktop Browser */}
            <motion.div className="ws-hero-browser" initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <BrowserMock>
                <div>
                  <div style={{ background: '#1b1b1bff', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3C95E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-car-front-fill" style={{ color: '#fff', fontSize: 12 }} />
                      </div>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 12, fontFamily: "'Epilogue', sans-serif" }}>SpeedAuto Garage</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {['Services', 'About', 'Book'].map(l => <span key={l} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: "'Epilogue', sans-serif" }}>{l}</span>)}
                    </div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #EBF5FF, #F0F7FF)', padding: '28px 20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800, fontSize: 18, color: '#1b1b1bff', marginBottom: 6 }}>Expert Car Service</div>
                    <div style={{ fontSize: 11, color: '#64748B', marginBottom: 14 }}>Bangalore's trusted auto workshop since 2012</div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <div style={{ background: '#3C95E8', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>Book Service</div>
                      <div style={{ border: '1px solid #3C95E8', color: '#3C95E8', padding: '6px 16px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>Our Services</div>
                    </div>
                  </div>
                  <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[{ icon: 'bi-droplet-fill', label: 'Oil Change', color: '#F59E0B' }, { icon: 'bi-shield-check', label: 'Inspection', color: '#3C95E8' }, { icon: 'bi-gear-fill', label: 'Engine', color: '#8B5CF6' }, { icon: 'bi-lightning-charge-fill', label: 'AC Repair', color: '#10B981' }].map(({ icon, label, color }) => (
                      <div key={label} style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 10, background: `${color}0c` }}>
                        <i className={`bi ${icon}`} style={{ fontSize: 16, color, display: 'block', marginBottom: 4 }} />
                        <span style={{ fontSize: 9, color: '#64748B', fontFamily: "'Epilogue', sans-serif" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'monospace' }}>speedauto.workshopedge.in</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['bi-facebook', 'bi-instagram', 'bi-whatsapp'].map(ic => <i key={ic} className={`bi ${ic}`} style={{ fontSize: 11, color: '#3C95E8' }} />)}
                    </div>
                  </div>
                </div>
              </BrowserMock>
            </motion.div>

          </div>

          {/* ── Mobile/Tablet hero visual (replaces browser) ── */}
          <motion.div
            className="ws-mobile-visual"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ flexDirection: 'column', gap: 14, marginTop: 40 }}
          >
            {/* Scrollable domain strip */}
            <div className="ws-domain-scroll" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
              {['speedauto.workshopedge.in', 'rexgarage.workshopedge.in', 'elite.workshopedge.in'].map(d => (
                <div key={d} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EBF5FF', border: '1px solid rgba(60,149,232,0.2)', borderRadius: 100, padding: '8px 16px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1b1b1bff', fontFamily: "'Epilogue', sans-serif" }}>{d}</span>
                </div>
              ))}
            </div>
            {/* Compact preview card */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(60,149,232,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: '#3C95E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-car-front-fill" style={{ color: '#fff', fontSize: 13 }} />
                  </div>
                  <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 14, color: '#1b1b1bff' }}>SpeedAuto Garage</span>
                </div>
                <div style={{ background: '#10B981', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} /> Live
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[{ icon: 'bi-droplet-fill', label: 'Oil', color: '#F59E0B' }, { icon: 'bi-shield-check', label: 'Check', color: '#3C95E8' }, { icon: 'bi-gear-fill', label: 'Engine', color: '#8B5CF6' }, { icon: 'bi-lightning-charge-fill', label: 'AC', color: '#10B981' }].map(({ icon, label, color }) => (
                  <div key={label} style={{ textAlign: 'center', padding: '10px 4px', borderRadius: 12, background: `${color}0e` }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 20, color, display: 'block', marginBottom: 4 }} />
                    <span style={{ fontSize: 10, color: '#64748B', fontFamily: "'Epilogue', sans-serif" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: '12px 0 0', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'monospace' }}>speedauto.workshopedge.in</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['bi-facebook', 'bi-instagram', 'bi-whatsapp'].map(ic => <i key={ic} className={`bi ${ic}`} style={{ fontSize: 14, color: '#3C95E8' }} />)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TWO WAYS
      ══════════════════════════════════════════════════════════ */}
      <section className="ws-section-pad" style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ws-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Epilogue', sans-serif" }}>Two Paths to Your Online Presence</span>
            <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 4.5vw, 54px)', letterSpacing: '-0.04em', color: '#1b1b1bff', margin: '0 0 20px', lineHeight: 1.1 }}>
              Choose how you want<br />
              <span style={{ color: '#3C95E8' }}>your garage online.</span>
            </h2>
            <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 540, margin: '0 auto', lineHeight: 1.7, fontFamily: "'Epilogue', sans-serif" }}>
              Whether quick and polished or completely unique — we have the right path for you.
            </p>
          </div>

          <div className="ws-two-ways-grid">
            {/* Way 1 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="ws-two-ways-card"
              style={{ background: 'linear-gradient(145deg, #EBF5FF, #F0F7FF)', borderRadius: 32, padding: '44px 40px', border: '1.5px solid rgba(60,149,232,0.15)', position: 'relative', overflow: 'hidden' }}>
              <div className="ws-watermark" style={{ position: 'absolute', top: -20, right: -20, fontSize: 160, opacity: 0.04, color: '#3C95E8', fontFamily: "'Epilogue', sans-serif", fontWeight: 900, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>01</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3C95E8', borderRadius: 100, padding: '6px 16px', marginBottom: 22 }}>
                <i className="bi bi-lightning-charge-fill" style={{ color: '#fff', fontSize: 11 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', fontFamily: "'Epilogue', sans-serif" }}>INCLUDED IN PLANS</span>
              </div>
              <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 28px)', color: '#1b1b1bff', marginBottom: 12, letterSpacing: '-0.02em' }}>Template Website</h3>
              <p style={{ fontSize: 14.5, color: '#4B5563', lineHeight: 1.7, marginBottom: 28, fontFamily: "'Epilogue', sans-serif" }}>
                Add your garage details, logo, and services into a professionally designed template. Go live in minutes — included in your Enterprise and Lite plan at no extra cost.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Professional .in domain included', 'Pre-designed mobile-ready layouts', 'Add logo, colors & service list', 'Online booking & contact form', 'Integrated with your dashboard', 'Social media links & QR code'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#3C95E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className="bi bi-check" style={{ color: '#fff', fontSize: 11 }} />
                    </div>
                    <span style={{ fontSize: 13.5, color: '#374151', fontFamily: "'Epilogue', sans-serif", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="ws-btn-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 100, fontWeight: 700, fontSize: 14, background: '#3C95E8', color: '#fff', textDecoration: 'none', fontFamily: "'Epilogue', sans-serif", transition: 'all 0.3s ease' }}>
                Get Started <i className="bi bi-arrow-right" />
              </Link>
            </motion.div>

            {/* Way 2 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
              className="ws-two-ways-card"
              style={{ background: '#F0FDFA', borderRadius: 32, padding: '44px 40px', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(16,185,129,0.1)' }}>
              <div className="ws-watermark" style={{ position: 'absolute', top: -20, right: -20, fontSize: 160, opacity: 0.05, color: '#10B981', fontFamily: "'Epilogue', sans-serif", fontWeight: 900, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>02</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#10B981', borderRadius: 100, padding: '6px 16px', marginBottom: 22 }}>
                <i className="bi bi-stars" style={{ color: '#fff', fontSize: 11 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', fontFamily: "'Epilogue', sans-serif" }}>FULLY CUSTOM — ADD-ON</span>
              </div>
              <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 28px)', color: '#1b1b1bff', marginBottom: 12, letterSpacing: '-0.02em' }}>Custom Built Website</h3>
              <p style={{ fontSize: 14.5, color: '#374151', lineHeight: 1.7, marginBottom: 28, fontFamily: "'Epilogue', sans-serif" }}>
                Our team builds a completely custom website tailored to your brand — advanced features, unique design, and full flexibility. Available as an add-on.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Fully unique design for your brand', 'Advanced animations & interactions', 'Custom domain (.com, .in, etc.)', 'SEO-optimised structure', 'Custom booking & lead forms', 'Priority support & updates'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className="bi bi-check" style={{ color: '#fff', fontSize: 11 }} />
                    </div>
                    <span style={{ fontSize: 13.5, color: '#374151', fontFamily: "'Epilogue', sans-serif", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 100, fontWeight: 700, fontSize: 14, background: '#10B981', color: '#fff', textDecoration: 'none', fontFamily: "'Epilogue', sans-serif", transition: 'all 0.3s ease', boxShadow: '0 8px 24px rgba(16,185,129,0.25)' }}>
                Talk to Us <i className="bi bi-arrow-right" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════ */}
      <section className="ws-section-pad" style={{ padding: '100px 24px', background: '#fff' }} id="how-it-works">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ws-feat-cols">
            <div>
              <div className="ws-reveal">
                <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Epilogue', sans-serif" }}>Everything Included</span>
                <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 48px)', letterSpacing: '-0.04em', color: '#1b1b1bff', margin: '0 0 36px', lineHeight: 1.1 }}>
                  More than just<br />a website.
                </h2>
              </div>
              {features.map((f, i) => <FeatureRow key={f.title} {...f} delay={i * 0.07} />)}
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <div style={{ background: 'linear-gradient(145deg, #EBF5FF, #F4F8FF)', borderRadius: 32, padding: 36 }}>
                {/* Social */}
                <div style={{ marginBottom: 22 }}>
                  <div style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 11, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Social Media Integration</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[{ name: 'Instagram', icon: 'bi-instagram', color: '#E1306C' }, { name: 'Facebook', icon: 'bi-facebook', color: '#1877F2' }, { name: 'YouTube', icon: 'bi-youtube', color: '#FF0000' }, { name: 'Twitter X', icon: 'bi-twitter-x', color: '#374151' }, { name: 'LinkedIn', icon: 'bi-linkedin', color: '#0077B5' }].map(({ name, icon, color }, i) => (
                      <motion.div key={name} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600, fontFamily: "'Epilogue', sans-serif", background: `${color}12`, color, border: `1px solid ${color}25` }}>
                        <i className={`bi ${icon}`} style={{ fontSize: 12 }} />{name}
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* QR */}
                <div style={{ background: '#fff', borderRadius: 18, padding: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.06)', marginBottom: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 58, height: 58, borderRadius: 12, background: '#1b1b1bff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="bi bi-qr-code" style={{ fontSize: 28, color: '#fff' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 14, color: '#1b1b1bff', marginBottom: 4 }}>QR Code Generated</div>
                    <div style={{ fontSize: 12, color: '#6B7280', fontFamily: "'Epilogue', sans-serif", lineHeight: 1.5 }}>Print on bills and banners to drive instant traffic.</div>
                  </div>
                </div>
                {/* Blog */}
                <div style={{ background: '#fff', borderRadius: 18, padding: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 11, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Recent Posts</div>
                  {[{ title: '🎉 Monsoon Special: 20% off servicing', time: '2 days ago', tag: 'Offer', tagColor: '#10B981' }, { title: '🔧 How often should you change engine oil?', time: '1 week ago', tag: 'Blog', tagColor: '#3C95E8' }].map((post, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i === 0 ? '1px solid #F1F5F9' : 'none' }}>
                      <div style={{ minWidth: 0, marginRight: 10 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1b1b1bff', marginBottom: 2, fontFamily: "'Epilogue', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</div>
                        <div style={{ fontSize: 11, color: '#94A3B8' }}>{post.time}</div>
                      </div>
                      <span style={{ background: `${post.tagColor}18`, color: post.tagColor, padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{post.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <section className="ws-section-pad" style={{ padding: '100px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ws-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Epilogue', sans-serif" }}>Simple Setup</span>
            <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 50px)', letterSpacing: '-0.04em', color: '#1b1b1bff', margin: 0 }}>
              Go live in <span style={{ color: '#3C95E8' }}>3 steps.</span>
            </h2>
          </div>
          <div className="ws-how-steps">
            {[
              { num: '01', icon: 'bi-palette-fill', title: 'Pick a Template', desc: 'Choose from garage-specific templates. Each looks great on both mobile and desktop.', color: '#3C95E8' },
              { num: '02', icon: 'bi-pencil-fill', title: 'Fill Your Details', desc: 'Add your garage name, logo, services, location, hours, and contact info in minutes.', color: '#8B5CF6' },
              { num: '03', icon: 'bi-rocket-takeoff-fill', title: 'Go Live', desc: 'Published instantly on your .in domain. Share it, print the QR code, attract customers.', color: '#10B981' },
            ].map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
                className="ws-step-item"
                style={{ background: '#fff', padding: 'clamp(28px, 4vw, 48px) clamp(20px, 3vw, 40px)', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <div style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 11, color: '#D1D5DB', letterSpacing: '0.2em', marginBottom: 18 }}>{step.num}</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: `${step.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <i className={`bi ${step.icon}`} style={{ fontSize: 22, color: step.color }} />
                </div>
                <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800, fontSize: 19, color: '#1b1b1bff', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, fontFamily: "'Epilogue', sans-serif" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          METRICS — light bg
      ══════════════════════════════════════════════════════════ */}
      <section className="ws-section-pad" style={{ padding: '100px 24px', background: '#EBF5FF', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(60,149,232,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="ws-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 50px)', letterSpacing: '-0.04em', color: '#1b1b1bff', margin: '0 0 20px', lineHeight: 1.1 }}>
              Your brand, visible to<br />
              <span style={{ color: '#3C95E8' }}>the whole city.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#4B5563', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontFamily: "'Epilogue', sans-serif" }}>
              A professional web presence builds trust, drives walk-ins, and keeps customers connected after they leave.
            </p>
          </div>
          <div className="ws-metrics-grid" style={{ background: 'rgba(255,255,255,0.6)' }}>
            {[
              { val: '3x', label: 'More Customer Trust', icon: 'bi-shield-check' },
              { val: '40%', label: 'More Online Bookings', icon: 'bi-calendar-plus' },
              { val: '∞', label: 'Reach Beyond Walk-ins', icon: 'bi-globe2' },
              { val: '24/7', label: 'Your Garage is Open Online', icon: 'bi-clock-fill' },
            ].map(({ val, label, icon }, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: '#fff', padding: 'clamp(24px, 3vw, 40px) clamp(14px, 2.5vw, 32px)', textAlign: 'center' }}>
                <i className={`bi ${icon}`} style={{ fontSize: 24, color: '#3C95E8', display: 'block', marginBottom: 12 }} />
                <div style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 48px)', letterSpacing: '-0.04em', color: '#1b1b1bff', lineHeight: 1, marginBottom: 8 }}>{val}</div>
                <div style={{ fontSize: 11, color: '#6B7280', fontFamily: "'Epilogue', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.4 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="ws-section-pad" style={{ padding: '100px 24px', background: '#fff' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, background: '#EBF5FF', border: '1px solid rgba(60,149,232,0.2)', borderRadius: 100, padding: '8px 20px' }}>
            <i className="bi bi-building" style={{ color: '#3C95E8', fontSize: 13 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Epilogue', sans-serif" }}>Start Today</span>
          </div>
          <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 58px)', letterSpacing: '-0.04em', color: '#1b1b1bff', margin: '0 0 20px', lineHeight: 1.05 }}>
            Stop being invisible.<br />
            <span style={{ color: '#3C95E8' }}>Build your garage's identity.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.2vw, 18px)', color: '#4B5563', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.7, fontFamily: "'Epilogue', sans-serif" }}>
            Your domain. Your brand. Your customers — online, anytime. Reach out and we'll help you get started the right way.
          </p>
          <div className="ws-cta-btns">
            <Link to="/contact" className="ws-btn-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 100, fontWeight: 700, fontSize: 16, background: '#1b1b1bff', color: '#fff', textDecoration: 'none', boxShadow: '0 8px 30px rgba(26,42,58,0.2)', fontFamily: "'Epilogue', sans-serif", transition: 'all 0.3s ease' }}>
              Create Your Domain <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/pricing" className="ws-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 100, fontWeight: 700, fontSize: 16, background: 'transparent', color: '#1b1b1bff', border: '1.5px solid rgba(0,0,0,0.15)', textDecoration: 'none', fontFamily: "'Epilogue', sans-serif", transition: 'all 0.3s ease' }}>
              <i className="bi bi-grid" /> View Plans
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}