import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import { API_BASE_URL } from "../config/env";
import '../style/Media.css';

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

      gsap.to(points.rotation, {
        y: Math.PI * 2,
        duration: 240,
        repeat: -1,
        ease: 'none'
      });

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

  return <div ref={mountRef} className="media-page__three-bg" />;
}


/* ─────────────────────────────────────────────
   GRID VIEW COMPONENTS
───────────────────────────────────────────── */
function getYoutubeVideoId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be' || u.hostname === 'www.youtu.be') {
      return u.pathname.replace(/^\//, '').split('/')[0] || null;
    }
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) {
        return u.pathname.split('/')[2] || null;
      }
      if (u.pathname.startsWith('/shorts/')) {
        return u.pathname.split('/')[2] || null;
      }
      return u.searchParams.get('v');
    }
  } catch {
    return null;
  }
  return null;
}

function VideoTile({ item, index }) {
  const [embedActive, setEmbedActive] = useState(false);
  const youtubeId = getYoutubeVideoId(item.youtubeUrl);
  const hasLocalVideo = Boolean(item.videoSrc);

  return (
    <div className="grid-tile media-page__tile" data-index={index}>
      <div className="media-page__media-box">
        {hasLocalVideo ? (
          <video
            src={item.videoSrc}
            controls
            playsInline
            preload="metadata"
            className="media-page__video-fill"
          />
        ) : youtubeId && embedActive ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="media-page__iframe"
          />
        ) : youtubeId ? (
          <button
            type="button"
            onClick={() => setEmbedActive(true)}
            aria-label={`Play video: ${item.title}`}
            className="media-page__thumb-btn"
          >
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              className="media-page__thumb-img"
            />
            <div className="media-page__play-overlay">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="white" />
              </svg>
            </div>
          </button>
        ) : null}
      </div>

      <div className="media-page__tile-title-wrap">
        <p className="media-page__tile-title">{item.title}</p>
      </div>
    </div>
  );
}

function GridView({ videos }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.grid-tile').forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: (i % 3) * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: tile, start: 'top 92%', once: true }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="media-page__grid-outer">
      <div className="grid-container media-page__grid">
        {videos.map((item, i) => (
          <VideoTile key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Media() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/videos`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success && Array.isArray(json.data)) {
          setVideos(
            [...json.data]
              .sort((a, b) => a.display_order - b.display_order)
              .map((item) => ({
                id:         item.id,
                title:      item.title,
                youtubeUrl: item.youtube_url,
                videoSrc:   '',
              }))
          );
        }
      })
      .catch((err) => console.error('Videos fetch error:', err));
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="media-page">
      <Navbar />
      <ThreeBackground />

      <div className="media-page__hero">
        <div className="media-page__hero-inner">
          <h1 className="media-page__title">Media and Videos</h1>
          <p className="media-page__lead">
            A collection of highlights, tutorials, and success stories from across the WorkshopEdge network.
          </p>
        </div>
      </div>

      <GridView videos={videos} />

      <Footer />
    </div>
  );
}
