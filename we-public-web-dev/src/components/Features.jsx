import "../home.css";

export default function Features() {
  const gridFeatures = [
    {
      title: "Access Anywhere/ Any Device",
      desc: "Have 24x7 access to your workshop, from anywhere on any device.",
      icon: <i className="bi bi-display"></i>
    },
    {
      title: "One-Click Management",
      desc: "Find your destination file with just one click from your fingertips.",
      icon: <i className="bi bi-cursor"></i>
    },
    {
      title: "No Installation Required",
      desc: "No unnecessary step of installation extra software to access your business.",
      icon: <i className="bi bi-cloud-check"></i>
    },
    {
      title: "Accounting",
      desc: "Business made easy to manage in real numbers that count every aspect.",
      icon: <i className="bi bi-calculator"></i>
    },
    {
      title: "History",
      desc: "Vehicle Service, parts, income and expenses; all in one place.",
      icon: <i className="bi bi-clock-history"></i>
    },
    {
      title: "Graphical Reports",
      desc: "Easy to understand graphical Reports at periodic intervals.",
      icon: <i className="bi bi-bar-chart-line"></i>
    },
    {
      title: "Employee Management",
      desc: "Manage all information about your employees easily side by side.",
      icon: <i className="bi bi-people"></i>
    },
    {
      title: "Automatic Software Update",
      desc: "It’s all done automatically while you focus on growing your business.",
      icon: <i className="bi bi-arrow-repeat"></i>
    },
    {
      title: "Inventory Management",
      desc: "Track your stock levels, purchases and sales history effortlessly.",
      icon: <i className="bi bi-box-seam"></i>
    }
  ];

  return (
    <div className="features-wrapper" id="features">
      {/* Split Section */}
      <section className="split-section container">
        <div className="image-container">
          <img 
            src="/india-garage-workshop-sadaramangala-bangalore.avif" 
            alt="Working Mechanic" 
          />
        </div>
        <div className="content">
          <h2 className="section-title left">Why Choose Us?</h2>
          <div className="feature-item">
            <h3>Constant Improvement</h3>
            <p>Workshop Edge constantly improves itself and looks for the best and efficient way to manage your garage.</p>
          </div>
          <div className="feature-item">
            <h3>Seamless Experience</h3>
            <p>We strive to provide you a seamless and smooth experience so that you don’t have to worry about managing.</p>
          </div>
          <div className="feature-item">
            <h3>Integrated Management</h3>
            <p>We bring different aspects of garage management into one single place.</p>
          </div>
          <div className="feature-item">
            <h3>Simple-To-Use</h3>
            <p>We skip the complex steps and processes to bring you the best experience with our Simple-To-Use features.</p>
          </div>
          <div className="feature-item">
            <h3>Customised Packages</h3>
            <p>We have customised packages with specific needs suited best for every type of workshop business.</p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="everything-section container">
        <h2 className="section-title">Simple-To-Use Features</h2>
        <p className="section-desc">Experience the best with our intuitive and powerful management tools.</p>
        
        <div className="features-grid">
          {gridFeatures.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
              <a href="#">Explore &gt;</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
