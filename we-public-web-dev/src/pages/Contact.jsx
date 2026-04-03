import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

// ── Word-split utility (matches landing page) ───────────────────────────
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
  const Tag = as;
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
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const initial = direction === 'left' ? { opacity: 0, x: -50 }
    : direction === 'right' ? { opacity: 0, x: 50 }
    : { opacity: 0, y: 50 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const titleRef  = useRef(null);
  const subRef    = useRef(null);
  const infoRef   = useRef(null);
  const formRef   = useRef(null);
  const lineRef   = useRef(null);

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

      // ── Section title word-split reveal (matches Features page) ──────
      document.querySelectorAll(".contact-section-title").forEach((el) => {
        const words = splitWordsManual(el);
        gsap.set(words, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(words, {
              yPercent: 0, duration: 1.0, stagger: 0.065, ease: "power4.out",
            });
          },
        });
      });

      // ── Contact info — stagger slide up ──────────────────────────────
      gsap.from(".contact-info h2, .contact-info .desc", {
        y: 40, opacity: 0, duration: 0.85, stagger: 0.14,
        ease: "power3.out", delay: 0.2,
      });

      // ── Contact items — slide from left with stagger ──────────────────
      gsap.from(".contact-item", {
        x: -36, opacity: 0, duration: 0.75, stagger: 0.1,
        ease: "power3.out", delay: 0.5,
      });

      // ── Form card — slide from right + blur clear ─────────────────────
      gsap.from(".form-card", {
        x: 60, opacity: 0, filter: "blur(6px)",
        duration: 1.1, ease: "power3.out", delay: 0.3,
      });

      // ── FAQ header ────────────────────────────────────────────────────
      gsap.from(".faq-header h2, .faq-header p", {
        y: 24, opacity: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ".faq-section", start: "top 85%" },
      });

      // ── FAQ items — cascade in ─────────────────────────────────────── 
      gsap.from(".faq-accordion .faq-item", {
        y: 32, opacity: 0, stagger: 0.07, duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".faq-accordion", start: "top 88%" },
      });

      /* Removed GSAP Why cards stagger to avoid visibility issues; replaced with Framer Motion below */

      // ── Section header for Why ────────────────────────────────────────
      gsap.from(".why-we-section h2, .why-we-section .section-desc", {
        y: 24, opacity: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ".why-we-section", start: "top 85%" },
      });

      // ── Floating icon animation ───────────────────────────────────────
      gsap.to(".card-icon-wrapper", {
        y: -6, duration: 1.6, repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: 0.25,
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={pageRef} style={{ overflowX: "hidden" }}>
      <Navbar />

      <style>{`
        /* ── Word-split ── */
        .sw-o { display: inline-block; overflow: hidden; vertical-align: bottom; }
        .sw-i { display: inline-block; }

        /* ── Section title overflow clip ── */
        .contact-section-title-wrap { overflow: hidden; }

        /* ── Contact item hover slide ── */
        .contact-item-inner {
          display: flex; align-items: center; gap: 12px;
          font-weight: 500; color: var(--text-dark);
          text-decoration: none; font-size: 15px;
          transition: color 0.3s, gap 0.3s;
        }
        .contact-item-inner:hover { color: var(--primary-color); gap: 18px; }
        .contact-item-inner i { transition: transform 0.3s ease; }
        .contact-item-inner:hover i { transform: scale(1.2); }

        /* ── Form field focus glow ── */
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-color) !important;
          background: white !important;
          box-shadow: 0 0 0 3px rgba(60,149,232,0.1) !important;
        }

        /* ── Why card icon ── */
        .why-we-card { overflow: hidden; position: relative; }
        .why-we-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(60,149,232,0.06), transparent 70%);
          opacity: 0; transition: opacity 0.4s;
        }
        .why-we-card:hover::before { opacity: 1; }

        /* ── Submit button ── */
        .btn-submit-anim {
          width: 100%; background: var(--primary-color); color: white;
          padding: 14px; border-radius: 12px; font-weight: 600; font-size: 15px;
          border: none; cursor: pointer; position: relative; overflow: hidden;
          transition: box-shadow 0.3s, transform 0.2s;
        }
        .btn-submit-anim::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-100%) skewX(-20deg);
          transition: none;
        }
        .btn-submit-anim:hover::after {
          animation: ctaShine 0.55s ease forwards;
        }
        .btn-submit-anim:hover { box-shadow: 0 8px 24px rgba(60,149,232,0.35); transform: translateY(-2px); }
        @keyframes ctaShine { to { transform: translateX(200%) skewX(-20deg); } }

        /* ── FAQ ── */
        .faq-item { opacity: 1 !important; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .contact-section-title-wrap h2 { font-size: 26px !important; }
        }
      `}</style>

      {/* ── CONTACT SECTION ──────────────────────────────────────────── */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-container">

            {/* LEFT — info */}
            <div className="contact-info" ref={infoRef}>
              <div className="contact-section-title-wrap">
                <h2 className="contact-section-title" data-raw="Send us a message">
                  Send us a message
                </h2>
              </div>
              <p className="desc">Fill out the form below and we&apos;ll respond within one business day</p>

              <div className="contact-details" style={{ marginTop: '2rem' }}>
                {[
                  { href: "mailto:contact@dev.workshopedge.com", icon: "bi-envelope", label: "contact@dev.workshopedge.com" },
                  { href: "tel:+916361832517",                   icon: "bi-telephone", label: "+91 6361832517" },
                  { href: "https://wa.me/918792482156",           icon: "bi-whatsapp",  label: "+91 8792482156", external: true },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    className="contact-item"
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 6, color: "var(--primary-color)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.i
                      className={`bi ${item.icon}`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="form-card" ref={formRef}>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-grid">
                  <FloatingInput label="Garage Name" placeholder="E.g. Metro Auto Repairs" required />
                  <FloatingInput label="Owner Name"  placeholder="Full name" required />
                  <FloatingInput label="Phone Number" type="tel" placeholder="+91 000-000-0000" required />
                  <FloatingInput label="Email Address" type="email" placeholder="name@company.com" required />
                  <FloatingInput label="City" placeholder="Location" required />
                  <FloatingInput label="Staff Count" as="select" required>
                    <option value="">Select size</option>
                    <option value="1-5">1-5 Employees</option>
                    <option value="6-15">6-15 Employees</option>
                    <option value="16-30">16-30 Employees</option>
                    <option value="31+">31+ Employees</option>
                  </FloatingInput>
                  <div className="form-group full-width">
                    <FloatingInput label="Monthly Vehicles Handled" as="select" required>
                      <option value="">Select range</option>
                      <option value="0-50">0 - 50 Vehicles</option>
                      <option value="51-150">51 - 150 Vehicles</option>
                      <option value="151-500">151 - 500 Vehicles</option>
                      <option value="501+">501+ Vehicles</option>
                    </FloatingInput>
                  </div>
                  <div className="form-group full-width">
                    <FloatingInput label="Message" as="textarea" placeholder="How can we help you? Tell us about your specific goals..." />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="btn-submit-anim"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Personalized Demo
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="faq-section">
        <div className="container">
          <Reveal>
            <div className="faq-header">
              <div className="contact-section-title-wrap">
                <h2 className="contact-section-title" data-raw="FAQs" style={{ fontSize: 'clamp(32px,4vw,48px)' }}>FAQs</h2>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '15px' }}>Find answers to common questions about WorkshopEdge and how it can transform your garage operations</p>
            </div>
          </Reveal>

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

      {/* ── THE WORKSHOPEDGE ECOSYSTEM ─────────────────────────────────── */}
      <section className="ecosystem-section">
        <div className="container">
          <Reveal>
            <div className="section-header-centered">
              <span className="eyebrow" style={{ color: 'var(--primary-color)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, marginBottom: '12px', display: 'block' }}>Complete Ecosystem</span>
              <h2 className="contact-section-title" data-raw="Why WorkshopEdge?">Why WorkshopEdge?</h2>
              <p className="section-desc">A unified platform designed to scale your workshop into a digital powerhouse.</p>
            </div>
          </Reveal>

          <div className="ecosystem-grid">
            {/* Main Pillars */}
            <div className="ecosystem-main-row">
              {[
                { 
                  icon: "bi-phone-vibrate", 
                  title: "Mobile App Ecosystem", 
                  desc: "Dedicated apps for both customers and staff. Customers track live service status, while staff manage jobs and updates seamlessly from the floor.",
                  color: "#3C95E8"
                },
                { 
                  icon: "bi-globe", 
                  title: "Professional Domain", 
                  desc: "Get a high-conversion domain for your garage. Integrated booking engine directly feeds into your dashboard, turning visitors into loyal customers.",
                  color: "#5AC8FA"
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="ecosystem-card main-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="card-icon-blob" style={{ backgroundColor: `${card.color}15` }}>
                    <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Admin Command Center - Featured full width */}
            <motion.div 
              className="ecosystem-card featured-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="featured-content">
                <div className="featured-text">
                  <div className="tag">POWERFUL CORE</div>
                  <h3>Separate Admin Command Center</h3>
                  <p>A high-performance system for multi-garage owners. Oversee every branch, manage staff permissions, and centralize your operations from a single powerful login. No more jumping between tabs or spreadsheets.</p>
                  <ul className="featured-list">
                    <li><i className="bi bi-check-circle-fill"></i> Multi-Garage oversight</li>
                    <li><i className="bi bi-check-circle-fill"></i> User Roles & Permissions</li>
                    <li><i className="bi bi-check-circle-fill"></i> Centralized Billing & Compliance</li>
                  </ul>
                </div>
                <div className="featured-visual">
                  <i className="bi bi-shield-lock-fill"></i>
                </div>
              </div>
            </motion.div>

            {/* Supporting Features */}
            <div className="ecosystem-secondary-grid">
              {[
                { 
                  icon: "bi-database-check", 
                  title: "Granular Garage Records", 
                  desc: "Every single job card, purchase, and staff update is recorded with surgical precision. Access detailed history for any garage or customer with one click." 
                },
                { 
                  icon: "bi-pie-chart", 
                  title: "Advanced Reporting Suite", 
                  desc: "Comprehensive financial breakthroughs—Revenue, Profit, Expenses, and Salaries. Filter by month, year, or specific dates with multiple payment modes." 
                },
                { 
                  icon: "bi-cloud-plus", 
                  title: "Digital Archive Locker", 
                  desc: "A secure cloud storage system to store every document, old record, and image for years. Your data is protected, organized, and always accessible." 
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="ecosystem-card secondary-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mini-icon">
                    <i className={`bi ${card.icon}`}></i>
                  </div>
                  <div>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}