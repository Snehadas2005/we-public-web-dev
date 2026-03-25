import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className={`faq-item ${isOpen ? "active" : ""}`} onClick={toggle} style={{ opacity: 1 }}>
      <div className="faq-question">
        <span>{question}</span>
        <motion.div 
          className="faq-icon-wrapper"
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <i className="bi bi-plus-lg"></i>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="faq-answer-content">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const pageRef = useRef(null);
  
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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Intro Stagger
      gsap.from(".contact-info h2, .contact-info .desc, .contact-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1
      });

      // Form Card Reveal
      gsap.from(".form-card", {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
      });

      // FAQ Section Reveal
      gsap.from(".faq-header h2, .faq-header p", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 85%"
        }
      });

      // FAQ Items
      gsap.from(".faq-item", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".faq-accordion",
          start: "top 90%"
        }
      });

      // Why cards
      gsap.from(".why-we-card", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".why-we-grid",
          start: "top 88%"
        }
      });

      // Icon float
      gsap.to(".card-icon-wrapper", {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={pageRef}>
      <Navbar />

      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <h2>Send us a message</h2>
              <p className="desc">Fill out the form below and we'll respond within one business day</p>
              
              <div className="contact-details">
                <motion.a 
                  href="mailto:contact@dev.workshopedge.com" className="contact-item"
                  whileHover={{ x: 5, color: "var(--primary-color)" }}
                >
                  <i className="bi bi-envelope"></i>
                  <span>contact@dev.workshopedge.com</span>
                </motion.a>
                <motion.a 
                  href="tel:+916361832517" className="contact-item"
                  whileHover={{ x: 5, color: "var(--primary-color)" }}
                >
                  <i className="bi bi-telephone"></i>
                  <span>+91 6361832517</span>
                </motion.a>
                <motion.a 
                  href="https://wa.me/916361832517" target="_blank" rel="noopener noreferrer" className="contact-item"
                  whileHover={{ x: 5, color: "var(--primary-color)" }}
                >
                  <i className="bi bi-whatsapp"></i>
                  <span>+91 6361832517</span>
                </motion.a>
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
                    <input type="tel" placeholder="+91 000-000-0000" required />
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
                <motion.button 
                  type="submit" className="btn-submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Request Personalized Demo
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2>FAQs</h2>
            <p>Find answers to common questions about WorkshopEdge and how it can transform your garage operations</p>
          </div>
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
                isOpen={openFaq === index}
                toggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="why-we-section">
        <div className="container">
          <div className="section-header">
            <h2>Why WorkshopEdge?</h2>
            <p className="section-desc">Experience the industry-leading standards that set us apart.</p>
          </div>
          
          <div className="why-we-grid">
            <motion.div className="why-we-card" whileHover={{ y: -10 }}>
              <div className="card-icon-wrapper">
                <i className="bi bi-headset"></i>
              </div>
              <h4>Free 24/7 Training & Support</h4>
              <p>Onboarding and live help whenever you need it.</p>
            </motion.div>

            <motion.div className="why-we-card" whileHover={{ y: -10 }}>
              <div className="card-icon-wrapper">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h4>ISO 27001 Certified Security</h4>
              <p>Enterprise-grade protection for your business data.</p>
            </motion.div>

            <motion.div className="why-we-card" whileHover={{ y: -10 }}>
              <div className="card-icon-wrapper">
                <i className="bi bi-lightning-charge"></i>
              </div>
              <h4>Quick Response</h4>
              <p>One of our specialists will reach out within 24 hours.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx="true">{`
        .contact-page { overflow-x: hidden; }
        .form-card, .faq-item, .why-we-card { opacity: 1; }
      `}</style>
    </div>
  );
}
