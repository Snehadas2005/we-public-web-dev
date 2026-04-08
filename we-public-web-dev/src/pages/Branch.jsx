import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   INDIA MAP SVG VISUALIZATION
═══════════════════════════════════════════════════════════ */
function IndiaMapViz() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const branches = [
    { id: 'bangalore', label: 'Garage 1', cx: 275, cy: 550, revenue: '₹2.4L', jobs: 142, staff: 8, perf: 84, color: '#10B981' },
    { id: 'pune', label: 'Garage 2', cx: 290, cy: 450, revenue: '₹1.8L', jobs: 98, staff: 6, perf: 71, color: '#3C95E8' },
    { id: 'mumbai', label: 'Garage 3', cx: 190, cy: 415, revenue: '₹1.2L', jobs: 76, staff: 5, perf: 63, color: '#F59E0B' },
    { id: 'chennai', label: 'Garage 4', cx: 310, cy: 580, revenue: '₹1.1L', jobs: 67, staff: 5, perf: 69, color: '#EF4444' },
    { id: 'north', label: 'Garage 5', cx: 285, cy: 292, revenue: '₹3.1L', jobs: 210, staff: 12, perf: 88, color: '#F43F5E' },
    { id: 'east', label: 'Garage 6', cx: 370, cy: 420, revenue: '₹1.5L', jobs: 89, staff: 6, perf: 74, color: '#06B6D4' }
  ];

  const hub = { cx: 260, cy: 480 };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate map in
    gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });


    // Animate nodes
    branches.forEach((b, i) => {
      const node = container.querySelector(`#node-${b.id}`);
      if (node) {
        gsap.fromTo(node,
          { scale: 0, opacity: 0, transformOrigin: `${b.cx}px ${b.cy}px` },
          { scale: 1, opacity: 1, duration: 0.6, delay: 1.5 + i * 0.2, ease: 'back.out(2)' }
        );
      }
    });

    branches.forEach((b, i) => {
      // Data flow animation
      gsap.fromTo(`.dash-path-${i}`, 
        { strokeDashoffset: 0, opacity: 0 },
        { 
          strokeDashoffset: -80, 
          opacity: 1,
          duration: 1.2, 
          repeat: -1, 
          ease: 'none',
          delay: 3.0 + i * 0.1 // Appear after pins
        }
      );

      gsap.to(`.dash-path-${i}-glow`, {
        opacity: 0.4,
        duration: 1,
        delay: 3.0 + i * 0.1,
        ease: 'power2.out'
      });

      // Node pulse animation
      gsap.fromTo(`.pulse-${b.id}`,
        { r: 6, opacity: 0.8 },
        {
          r: 20,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: 'power2.out',
          delay: 1.5 + i * 0.2
        }
      );
    });

    // Animate Hub paths
    branches.forEach((_, i) => {
      gsap.fromTo(`.hub-path-${i}`,
        { opacity: 0, strokeDashoffset: 100 },
        { opacity: 0.4, strokeDashoffset: 0, duration: 1.5, delay: 3.2 + i * 0.1, ease: 'power2.out' }
      );
    });


  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', opacity: 0 }}>
      <svg
        ref={svgRef}
        viewBox="200 280 560 530"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <g transform="translate(40, 40) scale(1.2)">
          {/* India map background */}
          <image
            href="/indian.svg"
            x="0"
            y="0"
            width="900"
            height="960"
            style={{ opacity: 0.25, filter: 'grayscale(1)' }}
          />

          {/* Network Connections */}
          {branches.map((b, i) => {
            if (i === 0) return null;

            const prev = branches[i - 1];

            const midX = (b.cx + prev.cx) / 2;
            const midY = (b.cy + prev.cy) / 2 - 80; // controls curve bulge

            const offsetY = 6;
            const path = `
              M ${prev.cx} ${prev.cy + offsetY}
              Q ${midX} ${midY}
                ${b.cx} ${b.cy + offsetY}
            `;

            return (
              <g key={`path-${i}`}>
                {/* Glow layer */}
                <path
                  d={path}
                  stroke="#52A9FF"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0"
                  style={{ filter: 'blur(6px)', opacity: 0 }}
                  className={`dash-path-${i}-glow`}
                />

                {/* Main dashed line */}
                <path
                  d={path}
                  stroke="rgba(60,149,232,0.8)"
                  strokeWidth="1.8"
                  fill="none"
                  strokeDasharray="3 10"
                  strokeLinecap="round"
                  style={{ opacity: 0 }}
                  className={`dash-path-${i}`}
                />
              </g>
            );
          })}

          {/* Hub Connections */}
          {branches.map((b, i) => {
            const midX = (b.cx + hub.cx) / 2;
            const midY = (b.cy + hub.cy) / 2 - 60;

            const path = `
              M ${hub.cx} ${hub.cy}
              Q ${midX} ${midY}
                ${b.cx} ${b.cy}
            `;

            return (
              <path
                key={`hub-${i}`}
                d={path}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5 5"
                style={{ opacity: 0 }}
                className={`hub-path-${i}`}
              />
            );
          })}

          {/* Branch nodes */}
          {branches.map((b) => (
            <g
              key={b.id}
              id={`node-${b.id}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredNode(b.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <g>
                <image
                  href="/pin.png"
                  x={b.cx - 12}
                  y={b.cy - 36}
                  width="30"
                  height="38"
                  style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,10,30,0.2))' }}
                />

                {/* Pin circle */}
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r="0.3"
                  fill="#52A9FF"
                />

                {/* Glow pulse */}
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r="2"
                  fill="none"
                  stroke="#52A9FF"
                  strokeWidth="1"
                  className={`pulse-${b.id}`}
                />
              </g>

            </g>
          ))}

          {/* Render Tooltip Last for Highest Z-Index */}
          {hoveredNode && branches.find(b => b.id === hoveredNode) && (() => {
            const b = branches.find(b => b.id === hoveredNode);
            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect x={b.cx + 20} y={b.cy - 50} width="100" height="60" rx="8" fill="#0d1f3c" stroke={b.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={b.cx + 26} y={b.cy - 34} fill={b.color} fontSize="8.5" fontWeight="700" fontFamily="'Epilogue',sans-serif">{b.label}</text>
                <text x={b.cx + 26} y={b.cy - 20} fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="'Epilogue',sans-serif">Rev: {b.revenue}</text>
                <text x={b.cx + 26} y={b.cy - 8} fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="'Epilogue',sans-serif">Jobs: {b.jobs}</text>
                <text x={b.cx + 26} y={b.cy + 4} fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="'Epilogue',sans-serif">Staff: {b.staff}</text>
              </g>
            );
          })()}
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COUNT-UP
═══════════════════════════════════════════════════════════ */
function CountUp({ end, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: ref.current, start: 'top 88%', once: true,
      onEnter: () => gsap.to(obj, {
        v: end, duration: 2.2, ease: 'power3.out',
        onUpdate() { if (ref.current) ref.current.textContent = Math.round(obj.v) + suffix; },
        onComplete() { if (ref.current) ref.current.textContent = end + suffix; },
      }),
    });
  }, [end, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   BRANCH CARD
═══════════════════════════════════════════════════════════ */
function BranchCard({ name, location, jobs, revenue, staff, uptime, partial, idx }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: idx * 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true } }
    );
  }, [idx]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    gsap.to(e.currentTarget, { rotateX: (y - cy) / 14, rotateY: (cx - x) / 14, transformPerspective: 800, duration: 0.4, ease: 'power2.out' });
  };

  const onMouseLeave = (e) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  };

  const perfColor = uptime >= 80 ? '#10B981' : uptime >= 65 ? '#F59E0B' : '#EF4444';

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{
      opacity: 0, background: '#fff', borderRadius: 22, padding: '24px 22px',
      border: '1px solid rgba(60,149,232,0.12)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d',
      transition: 'box-shadow 0.3s ease', cursor: 'default'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${perfColor}, ${perfColor}44)`, borderRadius: '22px 22px 0 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 14, color: '#1F2937', marginBottom: 4 }}>{name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6B7280' }}>
            <i className="bi bi-geo-alt-fill" style={{ color: '#3C95E8', fontSize: 9 }} />{location}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#ECFDF5', borderRadius: 100, padding: '3px 9px', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#10B981', fontFamily: "'Epilogue',sans-serif" }}>LIVE</span>
          </div>
          {partial && <div style={{ fontSize: 9, fontWeight: 700, background: '#EFF6FF', color: '#3C95E8', borderRadius: 100, padding: '2px 8px', border: '1px solid rgba(60,149,232,0.2)', fontFamily: "'Epilogue',sans-serif" }}>SPLIT PAY</div>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'Jobs', val: jobs, icon: 'bi-journal-check', color: '#3C95E8' },
          { label: 'Revenue', val: revenue, icon: 'bi-currency-rupee', color: '#10B981' },
          { label: 'Staff', val: staff, icon: 'bi-people-fill', color: '#8B5CF6' },
        ].map(({ label, val, icon, color }) => (
          <div key={label} style={{ background: '#F8FAFC', borderRadius: 10, padding: '10px 6px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.04)' }}>
            <i className={`bi ${icon}`} style={{ fontSize: 12, color, display: 'block', marginBottom: 3 }} />
            <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 13, color: '#1F2937' }}>{val}</div>
            <div style={{ fontSize: 9, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif", textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif" }}>Monthly Target</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: perfColor, fontFamily: "'Epilogue',sans-serif" }}>{uptime}%</span>
        </div>
        <div style={{ height: 3, background: '#EBF5FF', borderRadius: 99 }}>
          <div style={{ height: '100%', width: `${uptime}%`, background: `linear-gradient(90deg,${perfColor},${perfColor}88)`, borderRadius: 99, transition: 'width 1s ease' }} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MISSION CONTROL FEED
═══════════════════════════════════════════════════════════ */
function MissionControlFeed() {
  const ref = useRef(null);
  const events = [
    { id: 1, branch: 'Koramangala', event: 'Job Card #JC-1824 marked complete', time: '2s ago', type: 'complete' },
    { id: 2, branch: 'Whitefield', event: 'Invoice INV-0391 generated — ₹4,200', time: '14s ago', type: 'invoice' },
    { id: 3, branch: 'JP Nagar', event: 'New vehicle check-in: KA-01-AB-2293', time: '31s ago', type: 'checkin' },
    { id: 4, branch: 'Pune', event: 'Payment received: ₹2,800 via UPI', time: '1m ago', type: 'payment' },
    { id: 5, branch: 'Koramangala', event: 'Inventory alert: Engine Oil stock low', time: '2m ago', type: 'alert' },
    { id: 6, branch: 'Chennai', event: 'Staff login: Ravi Kumar — 09:15 AM', time: '3m ago', type: 'staff' },
  ];
  const colors = { complete: '#10B981', invoice: '#3C95E8', checkin: '#8B5CF6', payment: '#F59E0B', alert: '#EF4444', staff: '#06B6D4' };
  const icons = { complete: 'bi-check-circle-fill', invoice: 'bi-receipt', checkin: 'bi-car-front-fill', payment: 'bi-currency-rupee', alert: 'bi-exclamation-triangle-fill', staff: 'bi-person-check-fill' };

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.feed-row'),
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true } }
    );
  }, []);

  return (
    <div ref={ref} style={{ background: '#fff', borderRadius: 22, border: '1px solid rgba(60,149,232,0.1)', overflow: 'hidden', boxShadow: '0 8px 40px rgba(60,149,232,0.07)', marginTop: 28 }}>
      <div style={{ background: 'linear-gradient(135deg,#0a1628 0%,#0d2247 100%)', padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.7)' }} />
          <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 11, color: '#fff', letterSpacing: '0.08em' }}>NETWORK PULSE — LIVE FEED</span>
        </div>
        <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 9.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>5 BRANCHES ONLINE</span>
      </div>
      <div>
        {events.map((ev, i) => (
          <div key={ev.id} className="feed-row" style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderBottom: '1px solid rgba(0,0,0,0.04)', background: i % 2 === 0 ? '#fff' : '#FAFCFF' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${colors[ev.type]}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className={`bi ${icons[ev.type]}`} style={{ fontSize: 12, color: colors[ev.type] }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 9, color: colors[ev.type], textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{ev.branch}</div>
              <div style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 12.5, color: '#374151', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.event}</div>
            </div>
            <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 10, color: '#9CA3AF', flexShrink: 0 }}>{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DIGITAL LOCKER VISUAL
═══════════════════════════════════════════════════════════ */
function DigitalLockerVisual() {
  const ref = useRef(null);
  useEffect(() => {
    const files = ref.current.querySelectorAll('.locker-file');
    gsap.fromTo(files, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)', scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true } });
    gsap.to('.lf1', { y: -8, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.lf2', { y: -10, duration: 3.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 });
    gsap.to('.lf3', { y: -6, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 });
    gsap.to('.lf4', { y: -9, duration: 3.3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.3 });
  }, []);

  const files = [
    { label: 'Vendor_Bill_Mar.pdf', icon: 'bi-file-earmark-pdf-fill', color: '#EF4444', bg: '#FEF2F2', cls: 'lf1', style: { top: '8%', left: '0%', transform: 'rotate(-6deg)' } },
    { label: 'Stock_Report.xlsx', icon: 'bi-file-earmark-excel-fill', color: '#10B981', bg: '#ECFDF5', cls: 'lf2', style: { top: '2%', right: '0%', transform: 'rotate(7deg)' } },
    { label: 'Inspection_Photos/', icon: 'bi-folder-fill', color: '#F59E0B', bg: '#FFFBEB', cls: 'lf3', style: { bottom: '12%', left: '0%', transform: 'rotate(-4deg)' } },
    { label: 'Salary_April.docx', icon: 'bi-file-earmark-word-fill', color: '#3C95E8', bg: '#EFF6FF', cls: 'lf4', style: { bottom: '6%', right: '0%', transform: 'rotate(5deg)' } },
  ];

  return (
    <div ref={ref} style={{ position: 'relative', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
      <div style={{ width: 130, height: 110, background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(60,149,232,0.2)', boxShadow: '0 16px 50px rgba(60,149,232,0.14)', zIndex: 2 }}>
        <i className="bi bi-cloud-fill" style={{ fontSize: 32, color: '#3C95E8', marginBottom: 4 }} />
        <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 10, color: '#3C95E8' }}>Cloud Locker</div>
        <div style={{ fontSize: 9, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif", marginTop: 2 }}>5 Branches</div>
      </div>
      {files.map((f) => (
        <div key={f.label} className={`locker-file ${f.cls}`} style={{ position: 'absolute', ...f.style, background: f.bg, borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 6px 20px rgba(0,0,0,0.08)', border: `1px solid ${f.color}22`, zIndex: 3, opacity: 0, whiteSpace: 'nowrap' }}>
          <i className={`bi ${f.icon}`} style={{ fontSize: 15, color: f.color, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 600, fontSize: 9.5, color: '#374151' }}>{f.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CUSTOMER PHONE MOCK
═══════════════════════════════════════════════════════════ */
function CustomerPhoneMock() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true } });
    gsap.to('.notif-ring', { scale: 2, opacity: 0, duration: 1.4, repeat: -1, ease: 'power2.out', delay: 1 });
  }, []);

  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', opacity: 0 }}>
      <div style={{ width: 190, background: '#111', borderRadius: 28, padding: '10px 6px 6px', boxShadow: '0 28px 70px rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: 36, height: 10, background: '#000', borderRadius: 6, margin: '0 auto 8px' }} />
        <div style={{ background: '#EBF5FF', borderRadius: 20, overflow: 'hidden', padding: '12px 10px 14px', height: 320 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '10px', marginBottom: 10, boxShadow: '0 3px 12px rgba(0,0,0,0.07)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#10B981', zIndex: 2 }}>
              <div className="notif-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981', opacity: 0.6 }} />
            </div>
            <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: 7, background: '#3C95E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="bi bi-car-front-fill" style={{ color: '#fff', fontSize: 10 }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 8.5, color: '#1F2937', marginBottom: 2 }}>WorkshopEdge</div>
                <div style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 8.5, color: '#374151', lineHeight: 1.4 }}>Your KA-01-AB-2293 service is complete ✓</div>
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: '9px 10px', marginBottom: 7 }}>
            <div style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 7, color: '#9CA3AF', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Service Status</div>
            <div style={{ display: 'flex', gap: 3 }}>
              {['Check-in', 'Service', 'QC', 'Ready'].map((s) => (
                <div key={s} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ width: '100%', height: 3, background: '#3C95E8', borderRadius: 99, marginBottom: 3 }} />
                  <div style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 6, color: '#3C95E8', fontWeight: 600 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#EFF6FF', borderRadius: 9, padding: '7px 9px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 8, color: '#3C95E8', fontWeight: 700 }}>Invoice INV-0391</span>
            <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 9, fontWeight: 800, color: '#1F2937' }}>₹4,200</span>
          </div>
          <div style={{ marginTop: 10, background: '#F0FDF4', borderRadius: 9, padding: '7px 9px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="bi bi-whatsapp" style={{ color: '#25D366', fontSize: 11 }} />
            <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 8, color: '#374151', fontWeight: 500 }}>WhatsApp update sent</span>
          </div>
        </div>
        <div style={{ width: 32, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 3, margin: '7px auto 0' }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROBLEM SOLUTION SPLIT
═══════════════════════════════════════════════════════════ */
function ProblemSolutionSplit() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current.querySelector('.prob-left'), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } });
    gsap.fromTo(ref.current.querySelector('.prob-right'), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } });
  }, []);

  return (
    <div ref={ref} style={{ display: 'flex', gap: 24, alignItems: 'stretch', flexWrap: 'wrap' }}>
      {/* Before */}
      <div className="prob-left" style={{ flex: 1, minWidth: 260, opacity: 0, background: 'linear-gradient(135deg,#FEF2F2,#FFF7ED)', borderRadius: 22, padding: 32, border: '1px solid rgba(239,68,68,0.12)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEE2E2', borderRadius: 100, padding: '4px 12px', marginBottom: 20 }}>
          <i className="bi bi-x-circle-fill" style={{ color: '#EF4444', fontSize: 10 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#EF4444', fontFamily: "'Epilogue',sans-serif", letterSpacing: '0.1em' }}>WITHOUT WORKSHOPEDGE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Calling each branch for daily updates', 'WhatsApp screenshots as "reports"', 'No idea which branch is underperforming', 'Lost bills, missing invoices', 'Staff disputes with no attendance proof'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <i className="bi bi-x" style={{ color: '#EF4444', fontSize: 14, flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#3C95E8,#60aff0)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(60,149,232,0.3)' }}>
          <i className="bi bi-arrow-right" style={{ color: '#fff', fontSize: 16 }} />
        </div>
      </div>
      {/* After */}
      <div className="prob-right" style={{ flex: 1, minWidth: 260, opacity: 0, background: 'linear-gradient(135deg,#ECFDF5,#EFF6FF)', borderRadius: 22, padding: 32, border: '1px solid rgba(16,185,129,0.15)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#D1FAE5', borderRadius: 100, padding: '4px 12px', marginBottom: 20 }}>
          <i className="bi bi-check-circle-fill" style={{ color: '#10B981', fontSize: 10 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', fontFamily: "'Epilogue',sans-serif", letterSpacing: '0.1em' }}>WITH WORKSHOPEDGE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Live branch dashboard — every update, real-time', 'Auto-generated PDF/Excel reports in 1 click', 'Performance ranking across all branches', 'Cloud locker for every bill and document', 'Role-based staff access with digital logs'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <i className="bi bi-check2" style={{ color: '#10B981', fontSize: 14, flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontFamily: "'Epilogue',sans-serif", fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function Branch() {
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.88 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(heroBadgeRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(heroTitleRef.current, { opacity: 0, y: 60, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, '-=0.3')
      .fromTo(heroSubRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
      .fromTo(heroBtnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');

    gsap.fromTo('.stat-pill', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.stats-strip', start: 'top 88%', once: true } });
    gsap.utils.toArray('.sec-head').forEach((el) => { gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
    gsap.fromTo('.how-step', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.how-wrap', start: 'top 86%', once: true } });
    gsap.fromTo('.eco-card', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.eco-grid', start: 'top 86%', once: true } });

    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const branches = [
    { name: 'SpeedAuto — Koramangala', location: 'Bengaluru South', jobs: '142', revenue: '₹2.4L', staff: '8', uptime: 84, partial: true },
    { name: 'SpeedAuto — Whitefield', location: 'Bengaluru East', jobs: '98', revenue: '₹1.8L', staff: '6', uptime: 71, partial: false },
    { name: 'SpeedAuto — JP Nagar', location: 'Bengaluru SW', jobs: '76', revenue: '₹1.2L', staff: '5', uptime: 63, partial: true },
    { name: 'SpeedAuto — Pune', location: 'Kothrud, Pune', jobs: '54', revenue: '₹0.9L', staff: '4', uptime: 57, partial: false },
  ];

  const ecoFeatures = [
    {
      cluster: 'Operations System', color: '#3C95E8', icon: 'bi-kanban-fill', items: [
        { title: 'One Dashboard. Total Domain.', desc: 'Unified command over job cards, invoices, and payments across every branch — updated the instant they happen.', icon: 'bi-layout-wtf' },
        { title: 'Comparative Branch Analytics', desc: 'Side-by-side performance. Pinpoint which location leads — and which needs your attention today.', icon: 'bi-bar-chart-line-fill' },
        { title: 'One-Click Report Generation', desc: 'Generate PDF/Excel financial reports per branch or network-wide in a single action.', icon: 'bi-file-earmark-bar-graph-fill' },
      ]
    },
    {
      cluster: 'Customer Experience', color: '#10B981', icon: 'bi-phone-fill', items: [
        { title: 'Live Service Tracking', desc: 'Customers receive live service status, job card updates, and WhatsApp alerts — staying connected after every visit.', icon: 'bi-bell-fill' },
        { title: 'Two-Way Appointment System', desc: 'Bookings flow from the customer app directly to your dashboard, eliminating scheduling confusion.', icon: 'bi-calendar-check-fill' },
        { title: 'Branch Digital Identity', desc: 'Each branch gets its own website, domain, and social feeds — visible online 24/7.', icon: 'bi-globe2' },
      ]
    },
    {
      cluster: 'Growth & Scale', color: '#8B5CF6', icon: 'bi-graph-up-arrow', items: [
        { title: 'Instant Branch Expansion', desc: 'Add new branches in minutes. Configure services, staff roles, and inventory without rebuilding from scratch.', icon: 'bi-plus-circle-fill' },
        { title: 'Inventory & Supplier Hub', desc: 'Centralized stock levels and purchase management across every location — preventing shortages before they happen.', icon: 'bi-boxes' },
        { title: 'Digital Locker Per Branch', desc: 'Cloud-organized file storage sorted by branch. Every bill, photo, and record — structured and searchable.', icon: 'bi-folder2-open' },
      ]
    },
  ];

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Navbar />

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .hero-cta-primary { display:inline-flex;align-items:center;gap:10px;padding:15px 32px;border-radius:100px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none;font-family:'Epilogue',sans-serif;border:none;background:#3C95E8;color:#fff;box-shadow:0 8px 28px rgba(60,149,232,0.38);transition:all 0.3s ease; }
        .hero-cta-primary:hover { background:#2b84d7;transform:translateY(-3px);box-shadow:0 18px 40px rgba(60,149,232,0.48); }
        .cta-light { display:inline-flex;align-items:center;gap:10px;padding:15px 32px;border-radius:100px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none;font-family:'Epilogue',sans-serif;background:transparent;color:#1F2937;border:1.5px solid rgba(0,0,0,0.14);transition:all 0.3s ease; }
        .cta-light:hover { border-color:#3C95E8;color:#3C95E8;transform:translateY(-2px); }
        .cta-white { display:inline-flex;align-items:center;gap:10px;padding:15px 32px;border-radius:100px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none;font-family:'Epilogue',sans-serif;background:transparent;color:#004d8dff;border:1.5px solid rgba(0,77,141,0.35);transition:all 0.3s ease; }
        .cta-white:hover { border-color:#004d8dff;background:rgba(0,77,141,0.06);transform:translateY(-2px); }
        .eco-card { opacity:0;transition:box-shadow 0.3s ease,transform 0.3s ease; }
        .eco-card:hover { box-shadow:0 16px 44px rgba(60,149,232,0.1)!important;transform:translateY(-4px)!important; }
        .how-step { opacity:0; }
        .branch-card-hover:hover { box-shadow:0 16px 48px rgba(60,149,232,0.14)!important; }

        @media(max-width:900px){
          .hero-split { flex-direction:column!important; }
          .hero-map-col { height:360px!important; }
          .hero-text-col { max-width:100%!important; }
          .how-wrap { grid-template-columns:1fr 1fr!important; }
          .ecosystem-split { flex-direction:column!important; }
          .eco-cluster { grid-template-columns:1fr 1fr!important; }
          .problem-split { flex-direction:column!important; }
          .problem-arrow { transform:rotate(90deg); }
        }

        @media(max-width:600px){
          .hero-badges { flex-direction:column!important;gap:8px!important; }
          .how-wrap { grid-template-columns:1fr!important; }
          .how-step { border-right:none!important;border-bottom:1px solid rgba(0,0,0,0.05)!important; }
          .stats-strip { grid-template-columns:1fr 1fr!important; }
          .branches-grid { grid-template-columns:1fr!important; }
          .eco-cluster { grid-template-columns:1fr!important; }
          .hero-btns { flex-direction:column!important;width:100%!important; }
          .hero-btns a { width:100%!important;justify-content:center!important; }
          .final-cta-btns { flex-direction:column!important;align-items:center!important; }
        }
      `}</style>

      {/* ─── HERO — DARK IMMERSIVE WITH INDIA MAP ─── */}
      <section style={{ minHeight: '100vh', paddingTop: 60, background: 'linear-gradient(160deg, #74aeffff 0%, #bcdaffff 45%, #5297ffff 100%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Dot grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,80,150,0.08) 1px,transparent 1px)', backgroundSize: '36px 36px', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%', zIndex: 1, background: 'linear-gradient(to top, #74aeffff, transparent)' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 60px 0', position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="hero-split" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>

            {/* LEFT — copy */}
            <div className="hero-text-col" style={{ flex: '0 0 48%', minWidth: 0 }}>
              <div ref={heroBadgeRef} style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(60,149,232,0.15)', border: '1px solid rgba(0,81,156,0.8)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#66ffcc', boxShadow: '0 0 6px rgba(102,255,204,0.9)', animation: 'blink 1.8s ease infinite' }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: '#004d8dff', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Epilogue',sans-serif" }}>Multi-Branch Command System</span>
              </div>

              <h1 ref={heroTitleRef} style={{ opacity: 0, fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(36px,5.2vw,76px)', lineHeight: 0.98, letterSpacing: '-0.04em', color: '#ecf5ff', margin: '0 0 26px' }}>
                Control Every<br />Branch.{' '}
                <span style={{ color: '#003f7dff' }}>In Real</span><br />
                <span style={{ WebkitTextStroke: '1.5px rgba(0,40,80,0.55)', WebkitTextFillColor: 'transparent' }}>Time.</span>
              </h1>

              <p ref={heroSubRef} style={{ opacity: 0, fontSize: 'clamp(13px,1.05vw,16px)', color: 'rgba(0,0,0,0.58)', lineHeight: 1.8, maxWidth: 440, marginBottom: 40, fontFamily: "'Epilogue',sans-serif" }}>
                Live job cards, revenue, staff activity, and inventory — across your entire garage network. No calls. No WhatsApp reports. One dashboard.
              </p>

              <div ref={heroBtnRef} className="hero-btns" style={{ opacity: 0, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/contact" className="hero-cta-primary"><i className="bi bi-lightning-charge-fill" /> Activate Command</Link>
                <Link to="/pricing" className="cta-white"><i className="bi bi-grid-fill" /> View Plans</Link>
              </div>

              <div className="hero-badges" style={{ display: 'flex', gap: 20, marginTop: 40, flexWrap: 'wrap' }}>
                {[{ icon: 'bi-lightning-charge-fill', label: 'Real-Time Sync', col: '#3da1ff' }, { icon: 'bi-shield-fill-check', label: 'Role-Based Access', col: '#0cdb96' }, { icon: 'bi-phone-fill', label: 'Mobile-First', col: '#8B5CF6' }].map(({ icon, label, col }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className={`bi ${icon}`} style={{ color: col, fontSize: 11 }} />
                    <span style={{ fontSize: 11, color: '#1F2937', fontWeight: 600, fontFamily: "'Epilogue',sans-serif" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — India map */}
            <div style={{ position: 'absolute', right: '0', top: '0', height: '100%', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, overflow: 'visible' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <IndiaMapViz />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="stats-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'rgba(60,149,232,0.07)', borderRadius: 22, overflow: 'hidden' }}>
            {[
              { icon: 'bi-buildings', val: 500, sfx: '+', label: 'Garages Networked' },
              { icon: 'bi-journal-check', val: 12, sfx: 'K+', label: 'Daily Job Cards' },
              { icon: 'bi-lightning-charge', val: 99, sfx: '%', label: 'Uptime Guarantee' },
              { icon: 'bi-clock-history', val: 3, sfx: 'x', label: 'Faster Operations' },
            ].map(({ icon, val, sfx, label }, i) => (
              <div key={i} className="stat-pill" style={{ opacity: 0, background: '#fff', padding: 'clamp(28px,3.5vw,44px) 20px', textAlign: 'center' }}>
                <i className={`bi ${icon}`} style={{ fontSize: 20, color: '#3C95E8', display: 'block', marginBottom: 8 }} />
                <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(28px,3.8vw,46px)', letterSpacing: '-0.04em', color: '#1F2937', lineHeight: 1 }}>
                  <CountUp end={val} suffix={sfx} />
                </div>
                <div style={{ fontSize: 10.5, color: '#9CA3AF', fontFamily: "'Epilogue',sans-serif", fontWeight: 600, marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM → SOLUTION ─── */}
      <section style={{ padding: '100px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-head" style={{ textAlign: 'center', marginBottom: 56, opacity: 0 }}>
            <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Epilogue',sans-serif" }}>The Shift</span>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(24px,4vw,50px)', letterSpacing: '-0.04em', color: '#1F2937', margin: '0 0 14px', lineHeight: 1.1 }}>
              From chaos to{' '}
              <span style={{ color: '#3C95E8' }}>structured control.</span>
            </h2>
          </div>
          <ProblemSolutionSplit />
        </div>
      </section>

      {/* ─── REAL-TIME OPERATIONAL PULSE ─── */}
      <section style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="sec-head" style={{ marginBottom: 48, opacity: 0, maxWidth: 660 }}>
            <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Epilogue',sans-serif" }}>Real-Time Visibility</span>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(24px,4vw,50px)', letterSpacing: '-0.04em', color: '#1F2937', margin: '0 0 14px', lineHeight: 1.1 }}>
              Real-Time<br /><span style={{ color: '#3C95E8' }}>Operational Pulse.</span>
            </h2>
            <p style={{ fontSize: 15.5, color: '#6B7280', lineHeight: 1.72, fontFamily: "'Epilogue',sans-serif" }}>
              See everything your branches do — the moment it happens. No more calling each location for updates.
            </p>
          </div>
          <div className="branches-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 0 }}>
            {branches.map((b, i) => <BranchCard key={b.name} {...b} idx={i} />)}
          </div>
          <MissionControlFeed />
        </div>
      </section>

      {/* ─── FEATURE ECOSYSTEM ─── */}
      <section style={{ padding: '100px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="sec-head" style={{ textAlign: 'center', marginBottom: 72, opacity: 0 }}>
            <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Epilogue',sans-serif" }}>The Ecosystem</span>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(24px,4.5vw,54px)', letterSpacing: '-0.04em', color: '#1F2937', margin: '0 0 16px', lineHeight: 1.1 }}>
              Three systems.<br /><span style={{ color: '#3C95E8' }}>Total command.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.72, fontFamily: "'Epilogue',sans-serif" }}>
              Operations, Customer Experience, and Growth — every feature engineered to eliminate the chaos of running multiple locations.
            </p>
          </div>
          <div className="eco-grid" style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
            {ecoFeatures.map(({ cluster, color, icon, items }) => (
              <div key={cluster}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}22` }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 16, color }} />
                  </div>
                  <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 12, color, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{cluster}</span>
                  <div style={{ flex: 1, height: 1, background: `${color}18` }} />
                </div>
                <div className="eco-cluster" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
                  {items.map((item) => (
                    <div key={item.title} className="eco-card" style={{ background: '#fff', borderRadius: 20, padding: '28px 24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 3px 16px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                      <i className={`bi ${item.icon}`} style={{ position: 'absolute', right: -16, bottom: -16, fontSize: 100, color, opacity: 0.04, pointerEvents: 'none' }} />
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, border: `1px solid ${color}20` }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize: 18, color }} />
                      </div>
                      <h3 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 15, color: '#1F2937', marginBottom: 8, lineHeight: 1.25 }}>{item.title}</h3>
                      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, fontFamily: "'Epilogue',sans-serif", margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIGITAL LOCKER + CUSTOMER CONNECT ─── */}
      <section style={{ padding: '100px 24px', background: '#EBF5FF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="sec-head" style={{ textAlign: 'center', marginBottom: 60, opacity: 0 }}>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(24px,4vw,50px)', letterSpacing: '-0.04em', color: '#1F2937', margin: '0 0 14px', lineHeight: 1.1 }}>
              Beyond management —<br /><span style={{ color: '#3C95E8' }}>a complete digital ecosystem.</span>
            </h2>
            <p style={{ fontSize: 15.5, color: '#4B5563', maxWidth: 520, margin: '0 auto', lineHeight: 1.72, fontFamily: "'Epilogue',sans-serif" }}>
              The Digital Locker and Customer App aren't add-ons. They're the proof that WorkshopEdge connects every layer of your garage business.
            </p>
          </div>
          <div className="ecosystem-split" style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 26, padding: 'clamp(24px,3.5vw,44px)', border: '1px solid rgba(60,149,232,0.1)', boxShadow: '0 10px 36px rgba(60,149,232,0.07)' }}>
              <span style={{ display: 'block', fontSize: 9.5, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Epilogue',sans-serif" }}>Digital Archive Locker</span>
              <h3 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 'clamp(18px,2.2vw,26px)', color: '#1F2937', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Every file. Every branch.<br />Always retrievable.</h3>
              <DigitalLockerVisual />
              <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.68, fontFamily: "'Epilogue',sans-serif", marginTop: 90 }}>
                Vendor bills, inspection photos, salary records, and expense reports — organized by branch in a secure cloud archive. No more searching through WhatsApp folders.
              </p>
            </div>
            <div style={{ flex: 1, background: '#fff', borderRadius: 26, padding: 'clamp(24px,3.5vw,44px)', border: '1px solid rgba(16,185,129,0.1)', boxShadow: '0 10px 36px rgba(16,185,129,0.06)' }}>
              <span style={{ display: 'block', fontSize: 9.5, fontWeight: 700, color: '#10B981', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Epilogue',sans-serif" }}>Customer Experience System</span>
              <h3 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 'clamp(18px,2.2vw,26px)', color: '#1F2937', letterSpacing: '-0.02em', margin: '0 0 32px' }}>Customers stay connected.<br />Long after they leave.</h3>
              <CustomerPhoneMock />
              <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.68, fontFamily: "'Epilogue',sans-serif", marginTop: 24 }}>
                Live service tracking, job card updates, and WhatsApp notifications — your brand inside every customer's pocket. No repeated calls, no confusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPANSION BLUEPRINT ─── */}
      <section style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-head" style={{ textAlign: 'center', marginBottom: 56, opacity: 0 }}>
            <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, color: '#3C95E8', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Epilogue',sans-serif" }}>The Expansion Blueprint</span>
            <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(22px,3.8vw,48px)', letterSpacing: '-0.04em', color: '#1F2937', margin: 0, lineHeight: 1.1 }}>
              Adding a branch should feel like<br /><span style={{ color: '#3C95E8' }}>a growth strategy — not a headache.</span>
            </h2>
          </div>
          <div className="how-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, background: 'rgba(60,149,232,0.05)', borderRadius: 24, overflow: 'hidden' }}>
            {[
              { num: '01', icon: 'bi-plus-circle-fill', title: 'Register Branch', desc: 'Name, address, contact, and hours — your new branch is live in under 3 minutes.', color: '#3C95E8' },
              { num: '02', icon: 'bi-people-fill', title: 'Assign Your Team', desc: 'Set role-based access for each staff member. They see exactly what they need.', color: '#10B981' },
              { num: '03', icon: 'bi-boxes', title: 'Configure Inventory', desc: 'Bring over product catalogs or start fresh. Smart auto-fill handles supplier data.', color: '#8B5CF6' },
              { num: '04', icon: 'bi-eye-fill', title: 'Go Live & Monitor', desc: 'Your new branch appears on Command Dashboard instantly — data flows in real-time.', color: '#F59E0B' },
            ].map((step, i) => (
              <div key={step.num} className="how-step" style={{ background: '#fff', padding: 'clamp(22px,2.5vw,40px) clamp(14px,2vw,30px)', borderRight: i < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 9.5, color: '#D1D5DB', letterSpacing: '0.18em', marginBottom: 12 }}>{step.num}</div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${step.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <i className={`bi ${step.icon}`} style={{ fontSize: 18, color: step.color }} />
                </div>
                <h3 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 14.5, color: '#1F2937', marginBottom: 7 }}>{step.title}</h3>
                <p style={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.62, fontFamily: "'Epilogue',sans-serif" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '110px 24px', background: 'linear-gradient(160deg, #74aeffff 0%, #bcdaffff 50%, #5297ffff 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70vw', height: '70vw', background: 'radial-gradient(circle,rgba(60,149,232,0.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(60,149,232,0.07) 1px,transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }} />
        <div className="sec-head" style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', opacity: 0, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, background: 'rgba(60,149,232,0.15)', border: '1px solid rgba(0,81,156,0.8)', borderRadius: 100, padding: '7px 18px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#66ffcc', animation: 'blink 1.6s ease infinite' }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#004d8dff', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Epilogue',sans-serif" }}>Your Network Awaits</span>
          </div>
          <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 'clamp(26px,5.5vw,66px)', letterSpacing: '-0.04em', color: '#1F2937', margin: '0 0 18px', lineHeight: 1.04 }}>
            Stop Managing.<br /><span style={{ color: '#004d8dff' }}>Start Controlling.</span>
          </h2>
          <p style={{ fontSize: 'clamp(13px,1.2vw,17px)', color: 'rgba(0,0,0,0.58)', maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.78, fontFamily: "'Epilogue',sans-serif" }}>
            500+ garages trust WorkshopEdge to replace scattered WhatsApp reports and daily branch visits with one live command dashboard.
          </p>
          <div className="final-cta-btns" style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/contact" className="hero-cta-primary">Get Started <i className="bi bi-arrow-right" /></Link>
            <Link to="/pricing" className="cta-white"><i className="bi bi-calendar-check" /> Book a Demo</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}