import "../home.css";

export default function LandingIntro() {
  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container-wide">
          <div className="hero-video-wrapper">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="hero-video"
            >
              <source src="/garagevideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="hero-content-overlay">
              <h1 className="hero-title">Workshop management made simple</h1>
              <p className="hero-desc">
                WorkshopEdge cuts through the noise of garage operations. <br/>Built for those who know that time wasted on paperwork <br/>is money lost on the floor.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="about">
        <div className="container">
          <div className="about-logo">
            <img src="/we.png" alt="WE Logo" />
          </div>
          <h2 className="section-title">Built by people who work in<br />garages</h2>
          <p className="section-desc">
            WorkshopEdge was built from field in the. The founders spend close to five year running service station across the country and felt need to create tools. They build this software.
          </p>
          <div className="about-links">
            <a href="#">Learn more</a>
            <a href="#">Explore &gt;</a>
          </div>
        </div>
      </section>
    </>
  );
}
