import "../home.css";

export default function Features() {
  const gridFeatures = [
    {
      title: "Access Anywhere/ Any Device",
      oneLiner: "Have 24x7 access to your workshop, from anywhere on any device.",
      desc: "No need to always login to your workshop from PC and Desktop. Have 24x7 access to your workshop, from anywhere on any device.",
      icon: <i className="bi bi-display"></i>
    },
    {
      title: "One-Click Management",
      oneLiner: "Find your destination file with just one click from your fingertips.",
      desc: "Find your destination file with just one click from your fingertips. No worries about digging through hundreds of pages and options to reach your file.",
      icon: <i className="bi bi-cursor"></i>
    },
    {
      title: "No Installation Required",
      oneLiner: "No unnecessary step of installation extra software to access your business.",
      desc: "No unnecessary step of installation extra software just to access your business because we understand the value of your time.",
      icon: <i className="bi bi-cloud-check"></i>
    },
    {
      title: "Accounting",
      oneLiner: "Business made easy to manage in real numbers that count every aspect.",
      desc: "Business made easy to manage , not just in spreadsheet but in real numbers that count every aspect of the business.",
      icon: <i className="bi bi-calculator"></i>
    },
    {
      title: "History",
      oneLiner: "Vehicle Service, parts, income and expenses; all in one place.",
      desc: "Vehicle Service, parts, income and expenses; all in one place. Easy to track, easy to find and easy to manage.",
      icon: <i className="bi bi-clock-history"></i>
    },
    {
      title: "Graphical Reports",
      oneLiner: "Easy to understand graphical Reports at periodic intervals.",
      desc: "Easy to understand and summarise graphical Reports at periodic intervals to know your business better.",
      icon: <i className="bi bi-bar-chart-line"></i>
    },
    {
      title: "Employee Management",
      oneLiner: "Manage all information about your employees easily side by side.",
      desc: "From personal details to performance to experience, manage all the information about your employees easily side by side with live training and support for newcomers.",
      icon: <i className="bi bi-people"></i>
    },
    {
      title: "Automatic Software Update",
      oneLiner: "It's all done automatically while you focus on growing your business.",
      desc: "Worried about keeping track of regular software updates? No need, it’s all done automatically while you focus on growing your business.",
      icon: <i className="bi bi-arrow-repeat"></i>
    },
    {
      title: "Integrated Inventory",
      oneLiner: "Track your stock levels, purchases and sales history effortlessly.",
      desc: "Never lose track of your parts inventory again. Our system provides real-time updates on stock levels, automated low-stock alerts, and detailed purchase history to keep your workshop running smoothly.",
      icon: <i className="bi bi-box-seam"></i>
    }
  ];

  return (
    <div className="features-wrapper" id="features">

      <section className="split-section container">
        <div className="image-container">
          <img
            src="/india-garage-workshop-sadaramangala-bangalore.avif"
            alt="Working Mechanic"
          />
          {/* <div className="image-overlay">
            <span className="overlay-garage-name">Indian Motors</span>
            <span className="overlay-location">Bangalore, India</span>
          </div> */}
        </div>
        <div className="content">
          <h2 className="section-title left">Why Choose Us?</h2>
          <div className="feature-item">
            <h3>Constant Improvement</h3>
            <p>Workshop Edge constantly improves itself and looks for the best and efficient way to manage your garage.</p>
          </div>
          <div className="feature-item">
            <h3>Seamless Experience</h3>
            <p>We strive to provide you a seamless and smooth experience so that you don't have to worry about managing.</p>
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


      <section className="everything-section container">
        <h2 className="section-title">Simple-To-Use Features</h2>
        <p className="section-desc">Experience the best with our intuitive and powerful management tools.</p>

        <div className="features-grid">
          {gridFeatures.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>

              <div className="feature-card-body">
                <h4>{f.title}</h4>
                <p className="one-liner">{f.oneLiner}</p>
                <p className="detailed-desc">{f.desc}</p>
                <a href="#">Explore &gt;</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}