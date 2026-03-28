import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Videos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, paddingTop: '120px', paddingBottom: '80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)' }}>
          WorkshopEdge Videos
        </h1>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
          Explore our tutorials, guides, and feature highlights.
        </p>
        
        <div style={{ marginTop: '60px', color: '#888' }}>
          <i className="bi bi-play-circle" style={{ fontSize: '48px', color: '#3C95E8' }}></i>
          <p style={{ marginTop: '16px' }}>Video content coming soon.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
