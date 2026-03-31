import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, paddingTop: '120px', paddingBottom: '80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)' }}>
          The WorkshopEdge App
        </h1>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
          Explore the features of our dedicated application platform.
        </p>
        
        <div style={{ marginTop: '60px', color: '#888' }}>
          <i className="bi bi-phone" style={{ fontSize: '48px', color: '#3C95E8' }}></i>
          <p style={{ marginTop: '16px' }}>App details coming soon.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
