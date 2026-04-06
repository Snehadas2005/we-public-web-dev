import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Customer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, paddingTop: '120px', paddingBottom: '80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)' }}>
          Customers
        </h1>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
          This is the customer page coming soon 
        </p>
      </div>

      <Footer />
    </div>
  );
}
