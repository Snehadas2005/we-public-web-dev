import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

// ── Word-split utility ───────────────────────────
function splitWordsManual(el) {
  if (!el || el.dataset.split) return el ? el.querySelectorAll(".sw-i") : [];
  const raw = el.dataset.raw || el.innerText;
  el.dataset.raw = raw;
  el.dataset.split = "1";
  el.innerHTML = raw
    .split(" ")
    .map((w) => `<span class="sw-o"><span class="sw-i">${w}</span></span>`)
    .join(" ");
  return el.querySelectorAll(".sw-i");
}

// ── Floating label input ────────────────────────────────────────────────
function FloatingInput({ label, type = "text", placeholder, as = "input", children, required }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  return (
    <div className="form-group">
      <label style={{
        fontSize: '14px', fontWeight: 600, color: focused ? 'var(--primary-color)' : '#4B5563',
        transition: 'color 0.3s ease', display: 'block', marginBottom: '6px',
      }}>
        {label}
      </label>
      {as === 'select' ? (
        <motion.select
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setFilled(e.target.value !== '')}
          animate={{ borderColor: focused ? 'var(--primary-color)' : '#E5E7EB' }}
          transition={{ duration: 0.25 }}
          style={{ padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', background: '#F9FAFB', width: '100%', outline: 'none', cursor: 'pointer' }}
        >
          {children}
        </motion.select>
      ) : as === 'textarea' ? (
        <motion.textarea
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={{ borderColor: focused ? 'var(--primary-color)' : '#E5E7EB' }}
          transition={{ duration: 0.25 }}
          style={{ padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', background: '#F9FAFB', width: '100%', outline: 'none', minHeight: '120px', resize: 'none' }}
        />
      ) : (
        <motion.input
          type={type}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={{ borderColor: focused ? 'var(--primary-color)' : '#E5E7EB' }}
          transition={{ duration: 0.25 }}
          style={{ padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', background: '#F9FAFB', width: '100%', outline: 'none' }}
        />
      )}
    </div>
  );
}

// ── FAQ item ────────────────────────────────────────────────────────────
const FAQItem = ({ question, answer, isOpen, toggle, index }) => (
  <motion.div
    className={`faq-item ${isOpen ? "active" : ""}`}
    onClick={toggle}
    whileHover={{ y: isOpen ? 0 : -2 }}
    transition={{ duration: 0.2 }}
    style={{ opacity: 1 }}
  >
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
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="faq-answer-content">
            <p dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ── Reveal wrapper ──────────────────────────────────────────────────────
const Reveal = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const pageRef   = useRef(null);
  const formRef   = useRef(null);

  const faqs = [
    { 
      question: "What is WorkshopEdge and how is it different?", 
      answer: "WorkshopEdge is a comprehensive digital command center engineered specifically for modern automobile workshops. Unlike simple invoicing tools, it provides a full digital ecosystem connecting your operations, inventory, customers, and staff into one unified platform. By replacing manual paper trails with a professional database, it offers 360-degree visibility into your business. You get a management dashboard, a professional domain for new customers, and mobile apps for both staff and clients, ensuring your garage operates like a high-performance digital powerhouse from day one." 
    },
    { 
      question: "What kind of professional support do you offer?", 
      answer: "We believe software should be a partner, not a hurdle. We offer an extensive support ecosystem including a built-in ticket system that connects you directly to our technical experts. Additionally, users gain access to a library of training media and step-by-step documentation designed to help your team master the platform within days. Whether you are setting up your first job card or generating a complex year-end financial report, our dedicated support team is always available to ensure your daily garage operations remain smooth, efficient, and completely uninterrupted." 
    },
    { 
      question: "How does the Customer Tracking system work?", 
      answer: "Transparency is key to loyalty, and WorkshopEdge makes it easy. Your customers receive a dedicated mobile application where they can view live status updates for their vehicles in real-time. From entry to final quality checks, clients stay informed through automated progress bars and digital status updates. They can view their entire service history, download past invoices, and even chat directly with your service advisors. This digital-first approach eliminates repetitive phone calls and builds a level of professional trust that keeps customers coming back to your workshop long-term." 
    },
    { 
      question: "What is the Cloud Storage and Archive System?", 
      answer: "The Digital Archive Locker is a secure cloud storage system designed to digitize your entire record-keeping process. Instead of hoarding physical folders that get damaged, you can upload digital job cards, vendor bills, and vehicle inspection images directly within the app. Organized by categories, these records are archived and can be accessed within seconds using our advanced search features. This means your garage becomes completely paperless and highly organized, while your critical business data is protected by industry-standard encryption and accessible from any device, anywhere." 
    },
    { 
      question: "Can customers book appointments online?", 
      answer: "Yes,<br /><br />WorkshopEdge features a powerful two-way appointment system that bridges the gap between your garage and your clients. Customers can book service slots directly through your professional domain or their mobile app. These bookings appear instantly on your admin dashboard, allowing you to manage workshop capacity effectively. You can accept, reschedule, or cancel appointments with automated notifications sent back to the customer instantly. This streamlined process ensures a steady flow of vehicles and provides a modern, convenient experience that today's vehicle owners expect from a premium service provider." 
    },
    { 
      question: "How does WorkshopEdge reduce manual work?", 
      answer: "WorkshopEdge eliminates operational friction by automating the connection between data points. When a job card is created, the system pulls customer history and vehicle details using fast auto-fill technology. When a part is used, the dynamic inventory system automatically deducts the stock and updates your financial records internally. Smart navigation and one-click reporting save your staff hours of repeated data entry and manual calculation every day. By centralizing operations into one structured system, you can focus on technical quality while our software handles the tedious administrative heavy lifting." 
    },
    { 
      question: "How does the dynamic inventory system work?", 
      answer: "Our dynamic inventory system provides a real-time window into your spare parts. Whenever a part is used on a job card, the inventory is automatically scaled and deducted, providing an instant update on stock levels. The system also maintains detailed records of every supplier, including GST numbers and transaction history. When you restock, simply enter the purchase details, and the system intelligently updates existing levels or creates new items. This end-to-end tracking prevents stockouts, reduces wastage, and ensures your spare parts selling is always profitable and perfectly recorded." 
    },
    { 
      question: "Can I manage multiple garages from one account?", 
      answer: "Absolutely.<br /><br />WorkshopEdge is built for scale, featuring a specialized Admin Command Center for multi-garage owners. From a single powerful login, you can oversee the performance of every branch, monitor individual revenue, and manage staff roles across all locations. This centralized oversight allows you to compare performance metrics and ensure corporate compliance without visiting each site physically. Whether you own two garages or twenty, WorkshopEdge provides the high-level control and granular detail needed to manage a large-scale automotive service empire effectively with total operational confidence." 
    },
    { 
      question: "Is my data safe and what reports can I get?", 
      answer: "Data security is our top priority. We utilize advanced encryption and secure cloud protocols to ensure your business records are safe and backed up at all times. Regarding analytics, WorkshopEdge provides a Suite of Advanced Financial Reports. You can generate detailed breakthroughs for total revenue, net profits, miscellaneous expenses, and staff salaries. These reports can be filtered by specific dates, months, or years and across multiple payment modes including CASH, UPI, and CARD. Having this level of data-driven insight allows you to make informed decisions to grow your workshop’s profitability." 
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header & Map reveal ──
      gsap.from(".contact-header-centered, .contact-map-wrapper", {
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2
      });

      // ── Form reveal ──
      gsap.from(".form-card-centered", {
        y: 60, opacity: 0, filter: "blur(6px)",
        duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".form-section", start: "top 85%" }
      });

      // ── FAQ reveal ──
      gsap.from(".faq-header, .faq-accordion .faq-item", {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.8,
        scrollTrigger: { trigger: ".faq-section", start: "top 85%" }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={pageRef} style={{ overflowX: "hidden" }}>
      <Navbar />

      <style>{`
        .btn-submit-anim {
          width: 100%; background: var(--primary-color); color: white;
          padding: 18px; border-radius: 16px; font-weight: 600; font-size: 16px;
          border: none; cursor: pointer; transition: all 0.3s ease;
        }
        .btn-submit-anim:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(60,149,232,0.4); }
        
        .contact-item-link {
          display: flex; align-items: center; gap: 10px; text-decoration: none; 
          color: #1F2937; font-weight: 600; font-size: 15px; transition: all 0.3s ease;
        }
        .contact-item-link:hover { color: var(--primary-color); transform: translateY(-2px); }
      `}</style>

      {/* ── HEADER & MAP SECTION ── */}
      <section style={{ padding: '120px 20px 80px', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="contact-header-centered" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#111', marginBottom: '20px' }}>
              Send us a <span style={{ color: 'var(--primary-color)' }}>message</span>
            </h2>
            <p style={{ fontSize: 'clamp(16px, 1.2vw, 19px)', color: '#6B7280', maxWidth: '650px', margin: '0 auto 40px', lineHeight: 1.6 }}>
              Our team is ready to help you digitize your workshop. Reach out via form or use our direct contact lines below.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <a href="mailto:contact@dev.workshopedge.com" className="contact-item-link">
                <i className="bi bi-envelope" style={{ color: 'var(--primary-color)', fontSize: '20px' }} />
                <span>contact@dev.workshopedge.com</span>
              </a>
              <a href="tel:+916361832517" className="contact-item-link">
                <i className="bi bi-telephone" style={{ color: 'var(--primary-color)', fontSize: '20px' }} />
                <span>+91 6361832517</span>
              </a>
              <a href="https://wa.me/918792482156" className="contact-item-link" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp" style={{ color: 'var(--primary-color)', fontSize: '20px' }} />
                <span>+91 8792482156</span>
              </a>
            </div>
          </div>

          <div className="contact-map-wrapper" style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.04)', position: 'relative' }}>
            <iframe 
              width="100%" 
              height="600" 
              style={{ border: 0, display: 'block', pointerEvents: 'none' }}
              allow="geolocation" 
              src="https://api.maptiler.com/maps/base-v4/?key=j1WL3BcHxjPALgZTdsfA#4.4/19.69223/78.59130"
              title="Map"
            />
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="form-section" style={{ padding: '100px 20px', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="form-card-centered" ref={formRef} style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', padding: 'clamp(30px, 5vw, 60px)', borderRadius: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', border: '1px solid #F1F5F9' }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
                <FloatingInput label="Garage Name" placeholder="E.g. Metro Auto Repairs" required />
                <FloatingInput label="Owner Name"  placeholder="Full name" required />
                <FloatingInput label="Phone Number" type="tel" placeholder="+91 000-000-0000" required />
                <FloatingInput label="Email Address" type="email" placeholder="name@company.com" required />
                <FloatingInput label="City" placeholder="City name" required />
                <FloatingInput label="Staff Count" as="select" required>
                  <option value="">Select size</option>
                  <option value="1-5">1-5 Employees</option>
                  <option value="6-15">6-15 Employees</option>
                  <option value="16-30">16-30 Employees</option>
                  <option value="31+">31+ Employees</option>
                </FloatingInput>
                <FloatingInput label="Monthly Vehicles Handled" as="select" required>
                  <option value="">Select range</option>
                  <option value="0-50">0 - 50 Vehicles</option>
                  <option value="51-150">51 - 150 Vehicles</option>
                  <option value="151-500">151 - 500 Vehicles</option>
                  <option value="501+">501+ Vehicles</option>
                </FloatingInput>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FloatingInput label="Message" as="textarea" placeholder="How can we help you?" />
                </div>
              </div>
              <motion.button type="submit" className="btn-submit-anim" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                Request Personalized Demo
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="faq-section" style={{ padding: '100px 20px', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="faq-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '16px' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#6B7280', fontSize: '17px' }}>Everything you need to know about WorkshopEdge platform.</p>
          </div>
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                toggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}