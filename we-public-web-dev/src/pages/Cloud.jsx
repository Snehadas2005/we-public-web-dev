import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* Three.js Canvas Module */
function CloudCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 4.5;

    const geo = new THREE.BufferGeometry();
    const count = 320;
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i] = Math.random() * 3 + 1;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0x3C95E8,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    const sphGeo = new THREE.SphereGeometry(1.6, 18, 18);
    const sphMat = new THREE.MeshBasicMaterial({
      color: 0x3C95E8,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const sphere = new THREE.Mesh(sphGeo, sphMat);
    scene.add(sphere);

    const torGeo = new THREE.TorusGeometry(2.2, 0.008, 8, 120);
    const torMat = new THREE.MeshBasicMaterial({
      color: 0x3C95E8, transparent: true, opacity: 0.12,
    });
    const torus = new THREE.Mesh(torGeo, torMat);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.02;
      sphere.rotation.y = t * 0.07;
      sphere.rotation.x = t * 0.03;
      torus.rotation.z = t * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

/* File Icon Component */
function FileIcon({ type, color, delay = 0 }) {
  const icons = {
    pdf:   { icon: 'bi-file-earmark-pdf-fill',   bg: '#FFE8E8', col: '#E53E3E' },
    img:   { icon: 'bi-file-earmark-image-fill',  bg: '#E8F4FF', col: '#3C95E8' },
    xls:   { icon: 'bi-file-earmark-excel-fill',  bg: '#E8FFF0', col: '#10B981' },
    doc:   { icon: 'bi-file-earmark-word-fill',   bg: '#E8F0FF', col: '#3B5BDB' },
    zip:   { icon: 'bi-file-earmark-zip-fill',    bg: '#FFF8E8', col: '#D97706' },
    folder:{ icon: 'bi-folder-fill',              bg: '#FEF3C7', col: '#D97706' },
  };
  const { icon, bg, col } = icons[type] || icons.doc;
  return (
    <div
      className="file-icon-anim"
      style={{
        width: 52, height: 52, borderRadius: 12, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        animationDelay: `${delay}s`,
      }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: 24, color: col }} />
    </div>
  );
}

/* Storage Bar Component */
function StorageBar({ label, pct, color }) {
  const barRef = useRef(null);
  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(barRef.current,
      { width: '0%' },
      { width: `${pct}%`, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: barRef.current, start: 'top 90%', once: true } }
    );
  }, [pct]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: '#4B5563', fontFamily: "'Epilogue',sans-serif", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif" }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: '#E5E7EB', borderRadius: 99, overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', background: color, borderRadius: 99, width: 0 }} />
      </div>
    </div>
  );
}

/* Main Page Component */
export default function Cloud() {
  const pageRef      = useRef(null);
  const heroRef      = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroH1Ref    = useRef(null);
  const heroSubRef   = useRef(null);
  const heroBtnRef   = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(heroBadgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(heroH1Ref.current,    { opacity: 0, y: 60, filter: 'blur(12px)' },
                                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }, '-=0.3')
      .fromTo(heroSubRef.current,   { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
      .fromTo(heroBtnRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');

    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => gsap.to({ v: 0 }, {
          v: target, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].v) + (el.dataset.suffix || ''); },
          onComplete() { el.textContent = target + (el.dataset.suffix || ''); },
        }),
      });
    });

    gsap.utils.toArray('.cloud-reveal').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });

    gsap.utils.toArray('.cloud-reveal-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
      );
    });

    gsap.utils.toArray('.cloud-reveal-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
      );
    });

    gsap.fromTo('.feat-card-cloud',
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.feat-cards-grid', start: 'top 82%', once: true } }
    );

    gsap.fromTo('.file-float-item',
      { opacity: 0, scale: 0.5, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.file-float-grid', start: 'top 82%', once: true } }
    );

    gsap.to('.ticker-inner', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const features = [
    { icon: 'bi-shield-lock-fill', title: 'Bank-Grade Security', desc: 'AES-256 encryption at rest and in transit. Your files are protected with the same standards used by financial institutions.', color: '#3C95E8' },
    { icon: 'bi-lightning-charge-fill', title: 'Instant Access', desc: 'Retrieve any document in milliseconds. Our distributed CDN ensures sub-second load times regardless of your location.', color: '#10B981' },
    { icon: 'bi-arrow-repeat', title: 'Auto-Sync', desc: 'Changes made anywhere sync instantly across all your devices. No manual uploads, no version conflicts, ever.', color: '#8B5CF6' },
    { icon: 'bi-people-fill', title: 'Team Collaboration', desc: 'Share files and folders with your staff instantly. Set granular permissions for each team member.', color: '#F59E0B' },
    { icon: 'bi-clock-history', title: 'Version History', desc: 'Accidentally deleted a file? Recover any previous version up to 90 days. Full audit trail included.', color: '#EF4444' },
    { icon: 'bi-phone-fill', title: 'Mobile First', desc: 'Full-featured mobile app lets you access and manage your garage archive from anywhere on the floor.', color: '#06B6D4' },
  ];

  const useCases = [
    {
      title: 'Expense Records & Bills',
      desc: 'Upload vendor records, expense records, and purchase bills. Never lose a receipt again. Exportable for accounting.',
      files: ['pdf', 'xls', 'zip'],
      icon: 'bi-calculator-fill',
    },
    {
      title: 'Photos & Service Media',
      desc: 'Capture and store photos for every vehicle. Build a visual service history that provides proof of work and builds trust.',
      files: ['img', 'img', 'folder'],
      icon: 'bi-camera-fill',
    },
    {
      title: 'Folders & Organised Archive',
      desc: 'Create custom folders to organise your garage data. A structured cloud folder system designed for workshop efficiency.',
      files: ['folder', 'folder', 'zip'],
      icon: 'bi-folder2-open',
    },
    {
      title: 'Internal Documents',
      desc: 'Organize files for staff contracts, certifications, and internal documents with secure, role-based access control.',
      files: ['doc', 'pdf', 'folder'],
      icon: 'bi-file-earmark-text-fill',
    },
  ];

  return (
    <div ref={pageRef} style={{ overflowX: 'hidden', background: '#fff' }}>
      <Navbar />

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes floatFile {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-3px) rotate(1.5deg); }
          66% { transform: translateY(-1px) rotate(-1deg); }
        }
        .file-icon-anim {
          animation: floatFile 4s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .file-icon-anim:hover { transform: scale(1.1) !important; }

        .cloud-hero-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; border-radius: 100px; font-weight: 700;
          font-size: 15px; cursor: pointer; transition: all 0.3s ease;
          font-family: 'Epilogue', sans-serif; letter-spacing: 0.02em;
          text-decoration: none;
        }
        .cloud-hero-btn.primary {
          background: #3C95E8; color: #fff; border: none;
          box-shadow: 0 8px 32px rgba(60,149,232,0.38);
        }
        .cloud-hero-btn.primary:hover {
          background: #2b84d7; transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(60,149,232,0.45);
        }
        .cloud-hero-btn.outline {
          background: transparent; color: #111;
          border: 1.5px solid rgba(0,0,0,0.15);
        }
        .cloud-hero-btn.outline:hover {
          border-color: #3C95E8; color: #3C95E8;
          transform: translateY(-2px);
        }

        .feat-card-cloud {
          background: #fff; border: 1px solid rgba(0,0,0,0.06);
          border-radius: 24px; padding: 36px 30px;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          cursor: default; position: relative; overflow: hidden;
        }
        .feat-card-cloud::before {
          content: ''; position: absolute; inset: 0; border-radius: 24px;
          background: radial-gradient(circle at 50% -20%, rgba(60,149,232,0.06), transparent 70%);
          opacity: 0; transition: opacity 0.4s;
        }
        .feat-card-cloud:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.09); border-color: #3C95E8; }
        .feat-card-cloud:hover::before { opacity: 1; }

        .use-case-tab {
          padding: 14px 24px; border-radius: 50px; font-size: 14px;
          font-weight: 600; cursor: pointer; transition: all 0.3s ease;
          border: 1.5px solid transparent;
          font-family: 'Epilogue', sans-serif; white-space: nowrap;
        }
        .use-case-tab.active {
          background: #3C95E8; color: #fff;
          box-shadow: 0 4px 16px rgba(60,149,232,0.3);
        }
        .use-case-tab:not(.active) {
          background: #F3F4F6; color: #4B5563; border-color: transparent;
        }
        .use-case-tab:not(.active):hover { border-color: #3C95E8; color: #3C95E8; background: #E8F4FF; }

        .ticker-wrap { overflow: hidden; background: #F0F7FF; padding: 16px 0; border-top: 1px solid rgba(60,149,232,0.12); border-bottom: 1px solid rgba(60,149,232,0.12); }
        .ticker-inner { display: flex; width: max-content; gap: 0; }
        .ticker-item { display: flex; align-items: center; gap: 10px; padding: 0 32px; white-space: nowrap; font-family: 'Epilogue',sans-serif; font-size: 13px; font-weight: 600; color: #3C95E8; letter-spacing: 0.04em; }

        .storage-card {
          background: linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 60%, #122654 100%);
          border-radius: 32px; overflow: hidden; position: relative;
        }

        .plan-highlight-card {
          border-radius: 28px; padding: 40px; position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1); border: 1px solid transparent;
        }
        .plan-highlight-card:hover { transform: translateY(-6px); }

        .big-cta-section {
          background: linear-gradient(135deg, #0a1628 0%, #0d2247 50%, #0a1628 100%);
          position: relative; overflow: hidden;
        }

        .file-hover-effect:hover {
          background: #EBF5FF !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(60,149,232,0.12);
        }

        /* ══════════════════════════════════════════════════════════
           TABLET RESPONSIVE (768px – 992px)
        ══════════════════════════════════════════════════════════ */
        @media (max-width: 992px) {
          /* Hero */
          .hero-flex { flex-direction: column !important; text-align: center; align-items: center !important; gap: 2rem !important; }
          .hero-canvas-wrap { width: 100% !important; height: 380px !important; margin-top: 0 !important; }
          .cloud-hero-btn { padding: 14px 28px !important; font-size: 14px !important; }

          /* Use case content */
          .use-case-content-grid { flex-direction: column !important; }
          .use-case-content-grid > div { width: 100% !important; }

          /* Bento grid: 2 cols on tablet */
          .bento-features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .feat-card-bento { grid-column: span 1 !important; min-height: 280px !important; }

          /* Stats grid */
          .cloud-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* How it works */
          .how-it-works-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .how-it-works-grid > div:last-child { border-right: none !important; }

          /* Security section */
          .security-grid { grid-template-columns: 1fr !important; }

          /* Use case sidebar */
          .use-case-sidebar { width: 100% !important; }
          .use-case-main { width: 100% !important; }
          .use-case-mockup { height: 480px !important; }
        }

        /* ══════════════════════════════════════════════════════════
           MOBILE RESPONSIVE (≤ 768px)
        ══════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          /* Hero */
          .hero-flex { flex-direction: column !important; text-align: center; align-items: center !important; gap: 1.5rem !important; padding: 40px 16px 20px !important; }
          .hero-canvas-wrap { width: 100% !important; height: 280px !important; }
          .hero-badge-wrap { justify-content: center !important; }
          .cloud-hero-btn-wrap { justify-content: center !important; flex-wrap: wrap; gap: 10px !important; }
          .cloud-hero-btn { padding: 13px 22px !important; font-size: 13px !important; }
          .hero-trust-badges { justify-content: center !important; flex-wrap: wrap; gap: 12px !important; }

          /* File explorer mock inside hero */
          .hero-file-mock { display: none !important; }

          /* Ticker */
          .ticker-item { padding: 0 20px !important; font-size: 11px !important; }

          /* Stats */
          .cloud-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1px !important; }
          .cloud-stat-item { padding: 28px 16px !important; }

          /* Features bento — single column */
          .bento-features-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .feat-card-bento { grid-column: span 1 !important; min-height: auto !important; padding: 28px !important; }
          .cloud-features-section { padding: 60px 16px !important; }

          /* Use cases section */
          .cloud-use-cases-section { padding: 60px 16px !important; }
          .use-case-content-grid { flex-direction: column !important; gap: 24px !important; }
          .use-case-sidebar { width: 100% !important; }
          .use-case-sidebar-inner { flex-direction: column !important; gap: 12px !important; }
          .use-case-sidebar-item { padding: 16px 20px !important; }
          .use-case-main-workspace { height: auto !important; min-height: 360px !important; }
          .use-case-mockup-content { flex-direction: column !important; }
          .use-case-mockup-sidebar { display: none !important; }
          .use-case-main { width: 100% !important; }
          /* Tabs on mobile */
          .use-case-tabs-scroll { display: flex; overflow-x: auto; gap: 10px; padding-bottom: 6px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .use-case-tabs-scroll::-webkit-scrollbar { display: none; }
          .use-case-tab { padding: 10px 18px !important; font-size: 12px !important; flex-shrink: 0; }

          /* How it works */
          .how-it-works-section { padding: 60px 16px !important; }
          .how-it-works-grid { grid-template-columns: 1fr !important; }
          .how-it-works-step { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.06) !important; padding: 28px 20px !important; }
          .how-it-works-step:last-child { border-bottom: none !important; }

          /* Security section */
          .security-section { padding: 60px 16px !important; }
          .security-grid { grid-template-columns: 1fr !important; gap: 32px !important; }

          /* CTA section */
          .cloud-cta-section { padding: 60px 16px !important; }
          .cloud-cta-btn-wrap { flex-direction: column !important; align-items: center !important; }
          .cloud-cta-btn-wrap .cloud-hero-btn { width: 100%; max-width: 280px; justify-content: center; }

          /* Section headers */
          .cloud-section-header { margin-bottom: 40px !important; }
          .cloud-section-header h2 { font-size: clamp(26px, 7vw, 36px) !important; }

          /* Stats text */
          .cloud-stat-value { font-size: clamp(28px, 8vw, 42px) !important; }
        }

        /* Very small screens */
        @media (max-width: 400px) {
          .cloud-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-canvas-wrap { height: 220px !important; }
          .hero-file-mock { padding: 16px !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh', paddingTop: 80,
          background: 'linear-gradient(165deg, #f8fbff 0%, #EBF5FF 55%, #f0f7ff 100%)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(60,149,232,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Decorative Glowing Orbs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw', background: '#3C95E8', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: '#8B5CF6', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%', zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="hero-flex" style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>

            {/* LEFT */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div ref={heroBadgeRef} className="hero-badge-wrap" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E8F4FF', border: '1px solid rgba(60,149,232,0.25)', borderRadius: 100, padding: '7px 18px', marginBottom: 28 }}>
                <i className="bi bi-cloud-fill" style={{ color: '#3C95E8', fontSize: 13 }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Epilogue',sans-serif" }}>Digital Archive Locker</span>
              </div>

              <h1
                ref={heroH1Ref}
                style={{
                  opacity: 0, fontFamily: "'Epilogue',sans-serif", fontWeight: 900,
                  fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 0.97,
                  letterSpacing: '-0.04em', color: '#0a0f1e', margin: '0 0 28px',
                }}
              >
                Your garage,<br />
                <span style={{ background: 'linear-gradient(135deg, #3C95E8 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '0.1em' }}>archived</span><br />
                <span style={{ fontWeight: 400, color: '#6B7280', fontSize: '0.75em' }}>in the cloud.</span>
              </h1>

              <p
                ref={heroSubRef}
                style={{
                  opacity: 0, fontSize: 'clamp(14px, 1.2vw, 18px)', color: '#4B5563',
                  lineHeight: 1.75, maxWidth: 460, marginBottom: 40,
                  fontFamily: "'Epilogue',sans-serif",
                }}
              >
                WorkshopEdge Cloud gives your garage a secure, organized digital space to store every file, folder, expense records, photos and documents — accessible anytime.
              </p>

              <div ref={heroBtnRef} className="cloud-hero-btn-wrap" style={{ opacity: 0, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/contact" className="cloud-hero-btn primary">
                  <i className="bi bi-cloud-upload-fill" /> Get Cloud Storage
                </Link>
                <Link to="/pricing" className="cloud-hero-btn outline">
                  <i className="bi bi-grid-fill" /> View Plans
                </Link>
              </div>

              <div className="hero-trust-badges" style={{ display: 'flex', gap: 10, marginTop: 40, flexWrap: 'wrap' }}>
                {[
                  { icon: 'bi-shield-check', label: 'AES-256 Encrypted' },
                  { icon: 'bi-hdd-fill', label: '99.9% Uptime' },
                  { icon: 'bi-phone', label: 'Mobile Ready' },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: 100, border: '1px solid rgba(60,149,232,0.15)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <i className={`bi ${icon}`} style={{ color: '#3C95E8', fontSize: 13 }} />
                    <span style={{ fontSize: 11.5, color: '#374151', fontWeight: 700, letterSpacing: '0.02em', fontFamily: "'Epilogue',sans-serif" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Three.js canvas + mock UI */}
            <div
              className="hero-canvas-wrap"
              style={{ flex: 1, minWidth: 0, height: 560, position: 'relative' }}
            >
              <CloudCanvas />

              {/* Floating file explorer mock */}
              <div
                className="hero-file-mock"
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
                  borderRadius: 24, padding: '28px 28px 22px',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.16)',
                  width: 'min(400px, 90%)', border: '1px solid rgba(255,255,255,0.8)',
                  zIndex: 2,
                  animation: 'floatY 10s ease-in-out infinite',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                    <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                  ))}
                  <div style={{ flex: 1, background: '#F3F4F6', borderRadius: 8, padding: '5px 12px', marginLeft: 8, fontSize: 11, color: '#9CA3AF', fontFamily: 'monospace' }}>
                    cloud.workshopedge.com
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 15, color: '#111' }}>My Garage Archive</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E8F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="bi bi-grid" style={{ fontSize: 12, color: '#3C95E8' }} />
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3C95E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="bi bi-cloud-upload-fill" style={{ fontSize: 12, color: '#fff' }} />
                    </div>
                  </div>
                </div>

                {[
                  { name: 'Vendor_Bill_March.pdf',      size: '245 KB', type: 'pdf',  time: '2m ago' },
                  { name: 'Expense_Record_2026.pdf',    size: '156 KB', type: 'pdf',  time: '15m ago' },
                  { name: 'Vehicle_Inspection_Photos/',  size: '12 files',type: 'folder', time: 'Today' },
                  { name: 'Internal_Documents/',         size: '4 files', type: 'folder', time: 'Yesterday' },
                ].map((file, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px',
                    borderRadius: 10, marginBottom: 4,
                    background: i === 0 ? 'rgba(60,149,232,0.06)' : 'transparent',
                    border: i === 0 ? '1px solid rgba(60,149,232,0.12)' : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}>
                    <FileIcon type={file.type} delay={i * 0.3} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: '#111', fontFamily: "'Epilogue',sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif" }}>{file.size} • {file.time}</div>
                    </div>
                    <i className="bi bi-three-dots" style={{ color: '#D1D5DB', fontSize: 14 }} />
                  </div>
                ))}

                <div style={{ marginTop: 16, padding: '12px 0 0', borderTop: '1px solid #F3F4F6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif" }}>Storage used</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#3C95E8', fontFamily: "'Epilogue',sans-serif" }}> 5 GB</span>
                  </div>
                  <div style={{ height: 5, background: '#E5E7EB', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: '8%', background: 'linear-gradient(90deg, #3C95E8, #5AC8FA)', borderRadius: 99 }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ticker Strip */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(2)].map((_, rep) =>
            ['SECURE STORAGE', 'INSTANT ACCESS', 'AUTO BACKUP', 'MOBILE READY', 'TEAM SHARING', 'VERSION HISTORY', 'AES-256 ENCRYPTED', 'UNLIMITED FILES', 'NO PAPER TRAILS', 'ALWAYS AVAILABLE'].map((item, i) => (
              <div key={`${rep}-${i}`} className="ticker-item">
                <i className="bi bi-cloud-fill" style={{ fontSize: 10 }} />
                {item}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stats Section */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="cloud-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: 'rgba(0,0,0,0.06)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              { val: 500, suffix: '+', label: 'Garages Archiving', icon: 'bi-buildings' },
              { val: 99,  suffix: '.9%', label: 'Uptime Guarantee', icon: 'bi-lightning' },
              { val: 5,  suffix: 'GB',  label: 'Storage Per Garage', icon: 'bi-hdd-stack' },
              { val: 256, suffix: '-bit', label: 'AES Encryption', icon: 'bi-shield-lock' },
            ].map(({ val, suffix, label, icon }, i) => (
              <div key={i} className="cloud-reveal cloud-stat-item" style={{ background: '#fff', padding: '40px 32px', textAlign: 'center' }}>
                <i className={`bi ${icon}`} style={{ fontSize: 26, color: '#3C95E8', marginBottom: 14, display: 'block' }} />
                <div className="cloud-stat-value" style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(36px,4vw,52px)', letterSpacing: '-0.04em', color: '#0a0f1e', lineHeight: 1 }}>
                  <span data-count={val} data-suffix={suffix}>0{suffix}</span>
                </div>
                <div style={{ fontSize: 13, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif", fontWeight: 600, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Bento Hub */}
      <section className="cloud-features-section" style={{ padding: '120px 24px', background: '#f0f6fcff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="cloud-reveal cloud-section-header" style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid rgba(60,149,232,0.15)', borderRadius: 100, padding: '8px 20px', marginBottom: 20, boxShadow: '0 4px 12px rgba(60,149,232,0.08)' }}>
              <i className="bi bi-gear-fill" style={{ color: '#3C95E8', fontSize: 13 }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#3C95E8', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Epilogue',sans-serif" }}>Built for Workshop Operations</span>
            </div>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 5vw, 56px)', letterSpacing: '-0.04em', color: '#0a0f1e', margin: '0 0 20px', lineHeight: 1.1 }}>
              Everything your garage needs,<br />
              <span style={{ color: '#3C95E8' }}>securely harmonized.</span>
            </h2>
            <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 620, margin: '0 auto', lineHeight: 1.7, fontFamily: "'Epilogue',sans-serif" }}>
              A purpose-built cloud ecosystem that doesn't just store files — it organizes your workshop's entire digital pulse.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="bento-features-grid">
            {features.map((f, i) => {
              const isLarge = i === 0 || i === 3 || i === 5;
              return (
                <div
                  key={i}
                  className="feat-card-bento cloud-reveal"
                  style={{
                    gridColumn: isLarge ? 'span 2' : 'span 1',
                    background: '#fff',
                    borderRadius: 32,
                    padding: isLarge ? '48px' : '36px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: isLarge ? '340px' : '320px'
                  }}
                >
                  <i
                    className={`bi ${f.icon}`}
                    style={{
                      position: 'absolute', right: -20, bottom: -20,
                      fontSize: 160, color: f.color, opacity: 0.04,
                      transform: 'rotate(-15deg)', pointerEvents: 'none'
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: `${f.color}12`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 28, border: `1px solid ${f.color}25`
                    }}>
                      <i className={`bi ${f.icon}`} style={{ fontSize: 24, color: f.color }} />
                    </div>
                    <h3 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: isLarge ? 24 : 20, color: '#0a0f1e', marginBottom: 14 }}>{f.title}</h3>
                    <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, fontFamily: "'Epilogue',sans-serif", maxWidth: isLarge ? '80%' : '100%', margin: 0 }}>
                      {f.desc}
                    </p>
                  </div>

                  {isLarge && (
                    <div style={{ position: 'relative', zIndex: 1, marginTop: 24, display: 'flex', gap: 8 }}>
                       {[1, 2, 3].map(j => (
                         <div key={j} style={{ height: 4, flex: 1, background: j === 1 ? f.color : `${f.color}20`, borderRadius: 10 }} />
                       ))}
                    </div>
                  )}

                  {!isLarge && (
                     <div style={{ position: 'relative', zIndex: 1, marginTop: 24 }}>
                        <div style={{ width: 40, height: 2, background: `${f.color}40`, borderRadius: 2 }} />
                     </div>
                  )}
                </div>
              );
            })}
          </div>

          <style>{`
            .feat-card-bento:hover {
              transform: translateY(-8px) scale(1.01);
              box-shadow: 0 30px 60px rgba(0,0,0,0.08);
              border-color: rgba(60,149,232,0.2);
            }
          `}</style>
        </div>
      </section>

      {/* Use Cases Workspace */}
      <section className="cloud-use-cases-section" style={{ padding: '120px 24px', background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(60,149,232,0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="cloud-reveal cloud-section-header" style={{ marginBottom: 64 }}>
            <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Epilogue',sans-serif" }}>Interactive Workspace</span>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 56px)', letterSpacing: '-0.04em', color: '#0a0f1e', margin: 0, lineHeight: 1.1 }}>
              Tailored for <span style={{ color: '#3C95E8' }}>Automotive workflow.</span>
            </h2>
          </div>

          {/* Mobile tab strip */}
          <div className="use-case-tabs-scroll" style={{ display: 'none', marginBottom: 20 }}>
            {useCases.map((u, i) => (
              <div
                key={i}
                className={`use-case-tab ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {u.title}
              </div>
            ))}
          </div>

          <div className="use-case-content-grid" style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>

            {/* LEFT: Sidebar */}
            <div className="use-case-sidebar cloud-reveal-left" style={{ width: '380px', flexShrink: 0 }}>
              <div className="use-case-sidebar-inner" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {useCases.map((u, i) => (
                  <div
                    key={i}
                    className="use-case-sidebar-item"
                    onClick={() => setActiveTab(i)}
                    style={{
                      padding: '24px 28px',
                      borderRadius: 24,
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      background: activeTab === i ? '#fff' : 'transparent',
                      border: '1px solid',
                      borderColor: activeTab === i ? 'rgba(60,149,232,0.15)' : 'transparent',
                      boxShadow: activeTab === i ? '0 12px 40px rgba(0,0,0,0.04)' : 'none',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {activeTab === i && (
                      <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 4, background: '#3C95E8', borderRadius: '0 4px 4px 0' }} />
                    )}

                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: activeTab === i ? '#3C95E8' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: activeTab === i ? '0 8px 16px rgba(60,149,232,0.3)' : '0 4px 12px rgba(0,0,0,0.03)',
                        transition: 'all 0.3s'
                      }}>
                        <i className={`bi ${u.icon}`} style={{ fontSize: 20, color: activeTab === i ? '#fff' : '#3C95E8' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 17, color: activeTab === i ? '#0a0f1e' : '#4B5563' }}>{u.title}</h4>
                        {activeTab === i && (
                          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#6B7280', lineHeight: 1.5, fontFamily: "'Epilogue',sans-serif" }}>
                            {u.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 40, padding: '24px', borderRadius: 24, background: 'rgba(60,149,232,0.04)', border: '1px dashed rgba(60,149,232,0.2)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-shield-fill-check" style={{ color: '#3C95E8', fontSize: 18 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0a0f1e', fontFamily: "'Epilogue',sans-serif" }}>Secure Encryption</div>
                  <div style={{ fontSize: 11, color: '#6B7280', fontFamily: "'Epilogue',sans-serif" }}>All files are AES-256 protected</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Main Workspace */}
            <div className="use-case-main cloud-reveal-right" style={{ flex: 1, minWidth: 0 }}>
              <div
                className="use-case-main-workspace"
                style={{
                  background: '#fff',
                  borderRadius: 32,
                  boxShadow: '0 40px 100px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
                  height: '620px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                {/* Browser Header */}
                <div style={{
                  height: 64, borderBottom: '1px solid #F1F5F9', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between', padding: '0 28px',
                  background: '#FCFDFF', flexShrink: 0
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                     <div style={{ display: 'flex', gap: 8 }}>
                       {[1, 2, 3].map(j => <div key={j} style={{ width: 10, height: 10, borderRadius: '50%', background: '#E2E8F0' }} />)}
                     </div>
                     <div style={{ height: 32, width: 'min(240px, 35vw)', background: '#F1F5F9', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
                       <i className="bi bi-search" style={{ fontSize: 11, color: '#94A3B8' }} />
                       <div style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'monospace', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>archive/CloudStorage/</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="bi bi-cloud-upload" style={{ color: '#3C95E8', fontSize: 14 }} />
                    </div>
                    <div style={{ height: 34, padding: '0 14px', borderRadius: 8, background: '#3C95E8', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Epilogue',sans-serif", whiteSpace: 'nowrap' }}>
                      New Folder
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="use-case-mockup-content" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                   {/* Main list */}
                   <div style={{ flex: 1, padding: 'clamp(16px, 3vw, 32px)', borderRight: '1px solid #F1F5F9', overflowY: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                        <h5 style={{ margin: 0, fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 18 }}>{useCases[activeTab].title}</h5>
                        <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>12 Files</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 20 }}>
                        {useCases[activeTab].files.map((file, idx) => (
                          <div key={idx} style={{
                            textAlign: 'center',
                            animation: `floatY ${8 + (idx * 2)}s ease-in-out infinite`
                          }}>
                            <div style={{ padding: 16, borderRadius: 20, background: '#F8FAFC', marginBottom: 12, transition: 'all 0.3s', cursor: 'pointer' }}
                                 className="file-hover-effect">
                              <FileIcon type={file} delay={idx * 0.15} />
                            </div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B', fontFamily: "'Epilogue',sans-serif" }}>
                              {file === 'folder' ? 'Project_Data' : `Record_0${idx+1}.${file}`}
                            </div>
                          </div>
                        ))}
                        {[1, 2, 3].map(p => (
                          <div key={p} style={{ opacity: 0.3, textAlign: 'center' }}>
                            <div style={{ padding: 16, borderRadius: 20, background: '#F8FAFC', marginBottom: 12 }}>
                              <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E2E8F0', margin: '0 auto' }} />
                            </div>
                            <div style={{ width: 60, height: 8, background: '#E2E8F0', borderRadius: 4, margin: '0 auto' }} />
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* Sidebar inside mockup */}
                   <div className="use-case-mockup-sidebar" style={{ width: 220, background: '#FCFDFF', padding: 24, flexShrink: 0 }}>
                      <div style={{ marginBottom: 32 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Preview</div>
                        <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 12, background: '#F1F5F9', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={`bi ${useCases[activeTab].icon}`} style={{ fontSize: 32, color: '#CBD5E1' }} />
                        </div>
                      </div>
                      <div style={{ marginBottom: 32 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Storage Stats</div>
                        <StorageBar label="Current Category" pct={68} color="#3C95E8" />
                      </div>
                      <div style={{ padding: 16, borderRadius: 16, background: '#0a0f1e', color: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, marginBottom: 4 }}>SECURITY TOKEN</div>
                        <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em' }}>WSX-RE-8821</div>
                        <div style={{ width: '100%', height: 2, background: 'rgba(255,255,255,0.1)', margin: '12px 0' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                          <span style={{ fontSize: 10, fontWeight: 600 }}>ENCRYPTED</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" style={{ padding: '100px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="cloud-reveal cloud-section-header" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Epilogue',sans-serif" }}>Simple to Get Started</span>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,48px)', letterSpacing: '-0.03em', color: '#0a0f1e', margin: 0 }}>
              Up and running in minutes.
            </h2>
          </div>

          <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, position: 'relative' }}>
            {[
              { num: '01', icon: 'bi-person-check-fill', title: 'Subscribe to a Plan', desc: 'Choose any WorkshopEdge plan — Cloud is included with Prime and Enterprise.' },
              { num: '02', icon: 'bi-archive-fill', title: 'Create Your Archive', desc: 'Set up folders for expenses, photos, records, and documents in seconds.' },
              { num: '03', icon: 'bi-upload', title: 'Upload Your Files', desc: 'Drag & drop from desktop or capture directly from your mobile camera.' },
              { num: '04', icon: 'bi-phone-vibrate-fill', title: 'Access Anywhere', desc: 'View, download, and share files from any device — on the floor or off-site.' },
            ].map((step, i) => (
              <div key={i} className="cloud-reveal how-it-works-step" style={{
                padding: '40px 32px', position: 'relative',
                borderRight: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 13, color: '#D1D5DB', letterSpacing: '0.1em' }}>{step.num}</span>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#E8F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`bi ${step.icon}`} style={{ fontSize: 20, color: '#3C95E8' }} />
                  </div>
                </div>
                <h3 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 17, color: '#0a0f1e', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7, fontFamily: "'Epilogue',sans-serif" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Details Section */}
      <section className="security-section" style={{ padding: '100px 24px', background: '#E5F1FF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="security-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div className="cloud-reveal-left">
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Epilogue',sans-serif" }}>Enterprise-Grade Security</span>
              <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3vw,44px)', letterSpacing: '-0.03em', color: '#0a0f1e', margin: '0 0 20px', lineHeight: 1.1 }}>
                Your data is safe.<br />
                <span style={{ color: '#3C95E8' }}>Always.</span>
              </h2>
              <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.8, maxWidth: 420, fontFamily: "'Epilogue',sans-serif", marginBottom: 36 }}>
                From the moment a file is uploaded, it's encrypted with AES-256. We follow the same security standards trusted by banks and hospitals.
              </p>
              {[
                { icon: 'bi-lock-fill', title: 'AES-256 Encryption', desc: 'Every file encrypted at rest and in transit.' },
                { icon: 'bi-eye-slash-fill', title: 'Private by Default', desc: 'Only you and your authorized staff can access files.' },
                { icon: 'bi-arrow-counterclockwise', title: 'Automated Backups', desc: 'Daily redundant backups across multiple data centers.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(60,149,232,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`bi ${item.icon}`} style={{ fontSize: 16, color: '#3C95E8' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 14, color: '#0a0f1e', marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 13, color: '#6B7280' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cloud-reveal-right">
              <div style={{ padding: 40, background: '#fff', borderRadius: 32, border: '1px solid rgba(60,149,232,0.12)', boxShadow: '0 20px 50px rgba(60,149,232,0.08)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,149,232,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(60,149,232,0.1)', border: '2px solid rgba(60,149,232,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <i className="bi bi-shield-lock-fill" style={{ fontSize: 32, color: '#3C95E8' }} />
                    </div>
                    <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 18, color: '#0a0f1e' }}>Security Status</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif", marginTop: 4 }}>All systems operational</div>
                  </div>
                  {[
                    { label: 'Encryption', status: 'Active', ok: true },
                    { label: 'Backup', status: 'Last: 2h ago', ok: true },
                    { label: 'Access Logs', status: 'Monitoring', ok: true },
                    { label: 'Threats', status: 'None detected', ok: true },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                    }}>
                      <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 13, color: '#6B7280' }}>{item.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.3)' }} />
                        <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 12, fontWeight: 600, color: '#10B981' }}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cloud-cta-section" style={{ padding: '100px 24px', background: '#E5F1FF', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
        <div className="cloud-reveal" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 44px)',
            letterSpacing: '-0.02em',
            color: '#0a0f1e',
            marginBottom: '16px'
          }}>
            Ready to digitize your workshop?
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: '#6B7280',
            maxWidth: '560px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
            fontFamily: "'Epilogue', sans-serif"
          }}>
            Join 500+ garages leveraging WorkshopEdge Cloud for a safer, faster, and paperless business.
          </p>
          <div className="cloud-cta-btn-wrap" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/contact" className="cloud-hero-btn primary">
              Start Today <i className="bi bi-arrow-right" style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile-specific overrides for use-case tabs visibility */}
      <style>{`
        @media (max-width: 768px) {
          .use-case-tabs-scroll { display: flex !important; }
          .use-case-sidebar { display: none !important; }
        }
        @media (min-width: 769px) {
          .use-case-tabs-scroll { display: none !important; }
        }
      `}</style>
    </div>
  );
}