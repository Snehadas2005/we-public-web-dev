import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   THREE.JS BACKGROUND
───────────────────────────────────────────── */
function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, points;
    const mount = mountRef.current;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      const count = 1800;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 12;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 0.02,
        color: '#3C95E8',
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // Animation with GSAP (slow ambient rotation)
      gsap.to(points.rotation, {
        y: Math.PI * 2,
        duration: 240,
        repeat: -1,
        ease: 'none'
      });

      // Scroll reactivity
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          gsap.to(points.position, {
            y: self.progress * 2,
            duration: 1.2,
            ease: 'power2.out'
          });
        }
      });

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    };

    init();

    return () => {
      mount.innerHTML = '';
      renderer?.dispose();
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />;
}

/* ─────────────────────────────────────────────
   VIDEO DATA
───────────────────────────────────────────── */
const VIDEOS = [
  { id: 1, videoSrc: '', youtubeUrl: 'https://youtu.be/B_MP4ZFY52Y?si=hCKQfLaQG_HheorC', title: 'WorkshopEdge — Overview 2024' },
  { id: 2, videoSrc: '', youtubeUrl: 'https://youtu.be/iscl5jc6bbg?si=in2DEfko7ebwYaol', title: 'Customer Experience App' },
  { id: 3, videoSrc: '', youtubeUrl: 'https://youtu.be/T9sNs8thyQA?si=gmuyl2hnjOiM5gDg', title: 'Inventory & Billing Flow' },
  { id: 4, videoSrc: '', youtubeUrl: 'https://youtu.be/b6y-3411X0A?si=3-15jX25144U4x3q', title: 'Multi-Branch Command Center' },
  { id: 5, videoSrc: '', youtubeUrl: 'https://youtu.be/B_MP4ZFY52Y?si=hCKQfLaQG_HheorC', title: 'Cloud Archive Locker' },
  { id: 6, videoSrc: '', youtubeUrl: 'https://youtu.be/iscl5jc6bbg?si=in2DEfko7ebwYaol', title: 'Domain & Digital Identity' },
  { id: 7, videoSrc: '', youtubeUrl: 'https://youtu.be/T9sNs8thyQA?si=gmuyl2hnjOiM5gDg', title: 'Real Workshop Testimonial' },
  { id: 8, videoSrc: '', youtubeUrl: 'https://youtu.be/b6y-3411X0A?si=3-15jX25144U4x3q', title: 'Data Analytics Dashboard' },
];

/* ─────────────────────────────────────────────
   GRID VIEW COMPONENTS
───────────────────────────────────────────── */
function VideoTile({ item, index }) {
  return (
    <div 
      className="grid-tile" 
      data-index={index} 
      style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
    >
      <a
        href={item.youtubeUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          display: 'block', 
          position: 'relative', 
          overflow: 'hidden', 
          cursor: 'pointer', 
          background: '#000', 
          width: '100%', 
          aspectRatio: '16/9', 
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)' 
        }}
      >
        <video 
          src={item.videoSrc} 
          muted 
          playsInline 
          preload="metadata" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
        />
        {/* Static Play Icon */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M4 2.5L13 8L4 13.5V2.5Z" fill="white" /></svg>
        </div>
      </a>
      
      <div style={{ padding: '0 4px' }}>
         <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1F2937', margin: '0', letterSpacing: '-0.02em', lineHeight: 1.25 }}>{item.title}</p>
      </div>
    </div>
  );
}

function GridView({ videos }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.grid-tile').forEach((tile, i) => {
        gsap.fromTo(tile, 
          { opacity: 0, y: 30 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            delay: i % 3 * 0.1, 
            ease: 'power3.out', 
            scrollTrigger: { trigger: tile, start: 'top 92%', once: true } 
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 40px 140px', position: 'relative', zIndex: 1 }}>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px 32px' }}>
        {videos.map((item, i) => (<VideoTile key={i} item={item} index={i} />))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Media() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      <ThreeBackground />
      
      <style>{`
        @media (max-width: 1100px) { 
          .grid-container { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; } 
        }
        @media (max-width: 680px) { 
          .grid-container { grid-template-columns: 1fr !important; gap: 40px !important; } 
        }
      `}</style>
      
      <div style={{ padding: '90px clamp(24px,5vw,80px) 48px', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.04em', color: '#1F2937', margin: 0, lineHeight: 1.1 }}>Media and Videos</h1>
          <p style={{ fontFamily: "'Epilogue',sans-serif", fontSize: '16px', color: '#6B7280', marginTop: 12, maxWidth: 620, lineHeight: 1.6 }}>A collection of highlights, tutorials, and success stories from across the WorkshopEdge network.</p>
        </div>
      </div>

      <GridView videos={VIDEOS} />
      
      <Footer />
    </div>
  );
}