import "../home.css";

export default function Packages() {
  return (
    <section className="center-image-section container" id="packages">
      <h2 className="section-title">Packages</h2>
      <p className="section-desc">Workshop Edge has customised packages for every type of business owner from small to large garages curated specifically for their needs.</p>

      <div className="center-layout">
        {/* Left Side Points */}
        <div className="package-col-left">
          <div className="package-item">
            <div className="feature-icon align-right"><i className="bi bi-lightning-charge"></i></div>
            <h4>Lite Package</h4>
            <p>Essential features for small garage owners starting their digital journey.</p>
          </div>
          <div className="package-item">
            <div className="feature-icon align-right"><i className="bi bi-star"></i></div>
            <h4>Prime Package</h4>
            <p>Advanced tools for growing workshops needing more efficiency.</p>
          </div>
        </div>

        {/* Middle Image */}
        <div className="image-container">
          <img 
            src="/india-garage-working-person.jpg" 
            alt="Garage Workshop" 
          />
        </div>

        {/* Right Side Points */}
        <div className="package-col-right">
          <div className="package-item">
            <div className="feature-icon"><i className="bi bi-building"></i></div>
            <h4>Enterprise Package</h4>
            <p>Full-scale management solution for large garages and multi-shop operations.</p>
          </div>
          <div className="package-item">
            <div className="feature-icon"><i className="bi bi-check2-circle"></i></div>
            <h4>Choosing Your Fit</h4>
            <p>Choose the one that suits your needs and let us handle your worries.</p>
          </div>
        </div>
      </div>

      <div className="package-buttons">
        <button className="btn-secondary">See Demo</button>
        <button className="btn-secondary">Discuss &gt;</button>
      </div>
    </section>
  );
}
