import "../home.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Logo & Subscribe */}
          <div className="footer-col subscribe-col">
            <img src="/we.png" alt="WE Logo" className="footer-logo" />
            <p className="footer-desc">
              Get WorkshopEdge updates delivered to your inbox.
            </p>
            <div className="footer-newsletter">
              <input type="email" placeholder="Email" className="newsletter-input" />
              <button className="footer-subscribe-btn">Subscribe</button>
            </div>
            <p className="footer-legal">
              By subscribing you agree to our Privacy Policy and consent to receive updates from WorkshopEdge.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Home</a></li>
              <li><a href="#">Company</a></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Follow us</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div className="footer-col">
            <h4>Socials</h4>
            <ul className="social-links">
              <li><a href="#"><i className="bi bi-facebook social-icon"></i> Facebook</a></li>
              <li><a href="#"><i className="bi bi-instagram social-icon"></i> Instagram</a></li>
              <li><a href="#"><i className="bi bi-twitter-x social-icon"></i> X</a></li>
              <li><a href="#"><i className="bi bi-linkedin social-icon"></i> LinkedIn</a></li>
              <li><a href="#"><i className="bi bi-youtube social-icon"></i> YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>Terms of service</span>
          </div>
          <div className="footer-bottom-right">
            <a href="#">Cookies settings</a>
            <a href="#">Legal terms</a>
            <a href="#">Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
