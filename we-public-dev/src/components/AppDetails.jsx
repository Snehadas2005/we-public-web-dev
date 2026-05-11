import React, { useEffect } from 'react';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import '../style/AppDetails.css';

export default function AppDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-details-page">
      <Navbar />

      <div className="app-details-page__main">
        <h1 className="app-details-page__title">The WorkshopEdge App</h1>
        <p className="app-details-page__lead">Explore the features of our dedicated application platform.</p>

        <div className="app-details-page__placeholder">
          <i className="bi bi-phone" aria-hidden />
          <p className="app-details-page__placeholder-note">App details coming soon.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
