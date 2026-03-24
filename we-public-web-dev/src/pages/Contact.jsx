import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span>{question}</span>
        <div className="faq-icon-wrapper">
          <i className="bi bi-plus-lg"></i>
        </div>
      </div>
      <div className="faq-answer">
        <div className="faq-answer-content">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const faqs = [
    {
      question: "What is WorkshopEdge?",
      answer: "WorkshopEdge is a web-based platform built for workshop owners and managers. It handles scheduling, job tracking, inventory management, and customer communication in one place. The system cuts through the noise and gets straight to what matters—running your business efficiently."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide email support, phone support during business hours, and a knowledge base with video tutorials. Your dedicated account manager is there when you need guidance on best practices."
    },
    {
      question: "Is my data secure?",
      answer: "Your data is encrypted and backed up daily on secure servers. We comply with industry standards and regularly audit our systems. Your business information stays protected."
    },
    {
      question: "Do customers get a mobile app to track their services?",
      answer: "Yes. WorkshopEdge provides a customer mobile app that allows vehicle owners to stay connected with their garage. Customers can track service progress, receive updates about their vehicle, and view their service history directly from the app."
    },
    {
      question: "Can customers book appointments online?",
      answer: "Yes. WorkshopEdge supports live appointment booking. Customers can schedule service appointments with participating garages through the platform, helping workshops manage their schedules better while reducing manual phone bookings."
    },
    {
      question: "How does WorkshopEdge help reduce manual paperwork?",
      answer: "WorkshopEdge digitizes workshop operations such as job tracking, invoicing, service history, and reporting. This reduces paperwork, improves accuracy, and allows garage owners to manage their entire business from a single dashboard."
    }
  ];

  return (
    <div className="contact-page">
      <Navbar />

      {/* Form Section */}
      <section className="contact-section" id="contact-form">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <h2>Send us a message</h2>
              <p className="desc">Fill out the form below and we'll respond within one business day</p>
              
              <div className="contact-details">
                <a href="mailto:contact@dev.workshopedge.com" className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>contact@dev.workshopedge.com</span>
                </a>
                <a href="tel:+916361832517" className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>+91 6361832517</span>
                </a>
                <a href="https://wa.me/916361832517" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <i className="bi bi-whatsapp"></i>
                  <span>+91 6361832517</span>
                </a>
              </div>
            </div>

            <div className="form-card">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Garage Name</label>
                    <input type="text" placeholder="E.g. Metro Auto Repairs" required />
                  </div>
                  <div className="form-group">
                    <label>Owner Name</label>
                    <input type="text" placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="name@company.com" required />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" placeholder="Location" required />
                  </div>
                  <div className="form-group">
                    <label>Staff Count</label>
                    <select required>
                      <option value="">Select size</option>
                      <option value="1-5">1-5 Employees</option>
                      <option value="6-15">6-15 Employees</option>
                      <option value="16-30">16-30 Employees</option>
                      <option value="31+">31+ Employees</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Monthly Vehicles Handled</label>
                    <select required>
                      <option value="">Select range</option>
                      <option value="0-50">0 - 50 Vehicles</option>
                      <option value="51-150">51 - 150 Vehicles</option>
                      <option value="151-500">151 - 500 Vehicles</option>
                      <option value="501+">501+ Vehicles</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Message</label>
                    <textarea placeholder="How can we help you? Tell us about your specific goals..."></textarea>
                  </div>
                </div>
                <button type="submit" className="btn-submit">Request Personalized Demo</button>
                <p className="form-footer">
                  By clicking submit, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2>FAQs</h2>
            <p>Find answers to common questions about WorkshopEdge and how it can transform your garage operations</p>
          </div>
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Why WorkshopEdge Section */}
      <section className="why-we-section">
        <div className="container">
          <div className="section-header">
            <h2>Why WorkshopEdge?</h2>
            <p className="section-desc">
              Experience the industry-leading standards that set us apart.
            </p>
          </div>
          
          <div className="why-we-grid">
            <div className="why-we-card">
              <div className="card-icon-wrapper">
                <i className="bi bi-headset"></i>
              </div>
              <h4>Free 24/7 Training & Support</h4>
              <p>Onboarding and live help whenever you need it.</p>
            </div>

            <div className="why-we-card">
              <div className="card-icon-wrapper">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h4>ISO 27001 Certified Security</h4>
              <p>Enterprise-grade protection for your business data.</p>
            </div>

            <div className="why-we-card">
              <div className="card-icon-wrapper">
                <i className="bi bi-lightning-charge"></i>
              </div>
              <h4>Quick Response</h4>
              <p>One of our specialists will reach out within 24 hours.</p>
            </div>
          </div>

          <p className="privacy-note">
            "Your privacy is our priority. We'll never share your information with third parties."
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
