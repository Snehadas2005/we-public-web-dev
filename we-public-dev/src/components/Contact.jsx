import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { API_BASE_URL } from "../config/env";
import { useCms } from "../context/CmsContext";
import "../style/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const formStaggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const formStaggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

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
function FloatingInput({ label, type = "text", as = "input", children, required, name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  
  // Track filled state locally for label floating animation
  const isFilled = value && value.toString().length > 0;

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  return (
    <div className="form-group">
      <label className={`floating-label ${focused || isFilled ? "floating-label--focused" : ""}`}>
        {label}
      </label>
      {as === 'select' ? (
        <motion.select
          name={name}
          value={value}
          required={required}
          className="contact-field contact-field--select"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
        >
          {children}
        </motion.select>
      ) : as === 'textarea' ? (
        <motion.textarea
          name={name}
          value={value}
          required={required}
          className="contact-field contact-field--textarea"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
        />
      ) : (
        <motion.input
          name={name}
          value={value}
          type={type}
          required={required}
          className="contact-field"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
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
          className="faq-answer-motion"
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
  const [faqs, setFaqs] = useState([]);
  const { cmsData } = useCms();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    business_name: "",
    email: "",
    contact_no: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    lead_source: "",
    plan: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        ...formData,
        entity_type: "workshop",
      };

      const response = await fetch(`${API_BASE_URL}/contact-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: "success", message: result.message || "Thank you — we received your details." });
        setFormData({
          first_name: "",
          last_name: "",
          business_name: "",
          email: "",
          contact_no: "",
          city: "",
          state: "",
          country: "India",
          pincode: "",
          lead_source: "",
          plan: "",
          message: "",
        });
      } else {
        setStatus({ type: "error", message: result.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to connect to the server. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/faqs`);
        const result = await response.json();

        if (result?.success && Array.isArray(result.data)) {
          const sortedFaqs = [...result.data].sort(
            (a, b) => Number(a.display_order) - Number(b.display_order)
          );
          setFaqs(sortedFaqs);
        } else {
          setFaqs([]);
        }
      } catch (error) {
        setFaqs([]);
      }
    };

    fetchFaqs();
  }, []);


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

      // ── FAQ header only (avoid animating .faq-item opacity — conflicts with accordion visibility)
      gsap.from(".faq-section .faq-header", {
        y: 28, opacity: 0, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ".faq-section", start: "top 88%" }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page contact-page--clip" ref={pageRef}>
      <Navbar />

      {/* ── MAIN CONTENT SECTION ── */}
      <section className="form-section">
        <div className="contact-form-inner">
          
          {/* Header - Remains centered */}
          <div className="contact-header-centered">
            <h2>
              Send us a <span className="contact-accent">message</span>
            </h2>
            <p className="contact-lead">
              Our team is ready to help you digitize your workshop. Reach out via form or use our direct contact lines below.
            </p>

            <div className="contact-links-row">
              <a href={`mailto:${cmsData.contact_email}`} className="contact-item-link">
                <i className="bi bi-envelope" aria-hidden="true" />
                <span>{cmsData.contact_email}</span>
              </a>
              <a href={`tel:${cmsData.contact_phone.replace(/\s+/g, "")}`} className="contact-item-link">
                <i className="bi bi-telephone" aria-hidden="true" />
                <span>{cmsData.contact_phone}</span>
              </a>
              <a href={`https://wa.me/${cmsData.contact_phone.replace(/\D/g, "")}`} className="contact-item-link" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp" aria-hidden="true" />
                <span>{cmsData.contact_phone}</span>
              </a>
            </div>
          </div>

          {/* Split Layout: Map Left, Form Right */}
          <div className="contact-split-grid">
            
            {/* Map — responsive iframe shell (see Contact.css) */}
            <div className="contact-map-wrapper">
              <div className="contact-map-inner">
                <iframe
                  className="contact-map-iframe"
                  title="WorkshopEdge — map"
                  loading="lazy"
                  allow="fullscreen; geolocation"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://api.maptiler.com/maps/base-v4/?key=j1WL3BcHxjPALgZTdsfA#4.4/19.69223/78.59130"
                />
              </div>
            </div>

            {/* Form Card (Right) */}
            <div className="form-card-centered" ref={formRef}>
              <form onSubmit={handleSubmit}>
                <motion.div
                  className="form-split-grid"
                  variants={formStaggerParent}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
                >
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="First Name" 
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="Last Name" 
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="Business Name" 
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="Email Address" 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="Phone Number" 
                      type="tel" 
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="Pincode" 
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="City" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="State" 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="Country" 
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required 
                    />
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-field-cell">
                    <FloatingInput 
                      label="Lead Source" 
                      as="select" 
                      name="lead_source"
                      value={formData.lead_source}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select source</option>
                      <option value="google">Google Search</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="word_of_mouth">Word of Mouth</option>
                      <option value="other">Other</option>
                    </FloatingInput>
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-span-2 form-field-cell">
                    <FloatingInput 
                      label="Choose Plan" 
                      as="select" 
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select plan</option>
                      <option value="lite">Lite</option>
                      <option value="prime">Prime</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="customized">Customized</option>
                      <option value="website">Website</option>
                      <option value="branch">Branch</option>
                      <option value="cloud">Cloud</option>
                    </FloatingInput>
                  </motion.div>
                  <motion.div variants={formStaggerItem} className="form-span-full form-field-cell">
                    <FloatingInput 
                      label="Message" 
                      as="textarea" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`contact-form-status contact-form-status--${status.type}`}
                    >
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`btn-submit-anim ${loading ? "btn-submit-anim--loading" : ""}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                >
                  {loading ? "Sending..." : "Request Personalized Demo"}
                </motion.button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="faq-section">
        <div className="contact-faq-inner">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Workshop Edge platform.</p>
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