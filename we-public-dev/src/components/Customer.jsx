import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import "../style/Customer.css";

/** Replace with your live store URLs when the apps are published */
const APP_STORE_URL = "https://apps.apple.com/";
const PLAY_STORE_URL = "https://play.google.com/store/apps";

const FEATURES = [
  {
    icon: "bi-journal-text",
    tone: "blue",
    title: "Service history & bill vault",
    paragraphs: [
      "Every vehicle you own gets a clear timeline: each visit, what was done, and any notes you add. You always know what happened and when—without digging through messages or old notebooks.",
      "Paper bills from service visits are easy to lose or damage. In the app you attach photos or PDFs to the right vehicle and visit, so those records stay in one safe place you can open anytime.",
      "When you need to remember a part replaced months ago, compare costs, or show proof of work, you search and filter by vehicle or date instead of turning the house upside down.",
    ],
    bullets: [
      "Timelines per vehicle, not a messy camera roll",
      "Upload scans or files and keep them with the correct visit",
      "Find past work quickly when you sell or hand over a vehicle",
    ],
  },
  {
    icon: "bi-shield-lock",
    tone: "violet",
    title: "Document locker",
    paragraphs: [
      "Licences, learner permits, registration certificate, insurance, pollution certificates, and any other vehicle-related papers can live in one structured locker—not scattered across gallery apps and chat threads.",
      "Each document can be tagged and tied to a vehicle where it belongs, so you are not guessing which file belongs to which registration number.",
      "Your files stay organised for quick access at checkpoints, resale, or whenever someone asks for a copy on short notice.",
    ],
    bullets: [
      "Purpose-built for vehicle paperwork, not generic cloud folders",
      "Easy to update when you renew or replace a document",
      "Less risk of sharing the wrong file in a hurry",
    ],
  },
  {
    icon: "bi-fuel-pump",
    tone: "green",
    title: "Fuel logs & mileage",
    paragraphs: [
      "Log each fill-up with vehicle, date, odometer, litres, and amount. Over time you see how each vehicle behaves in real driving—not a one-off tank reading.",
      "Patterns show up naturally: higher use in some months, changes after routes shift, or unusual consumption you might want to get checked.",
      "Mileage between fills is calculated from your odometer entries, so you reduce guesswork without maintaining spreadsheets—especially helpful when total distance per month is high.",
    ],
    bullets: [
      "Per-vehicle history, not one mixed list",
      "Compare periods to spot trends early",
      "Simple ongoing log—add a line when you refuel",
    ],
  },
  {
    icon: "bi-bell",
    tone: "amber",
    title: "Reminders",
    paragraphs: [
      "You choose what the app should nag you about: upcoming service, document renewal dates, EMIs or other recurring costs you track per vehicle, or payments you marked as still open.",
      "Reminders attach to the vehicle they belong to, so context stays obvious—no generic alarms you cannot trust.",
      "You reduce last-minute panic before expiry dates and keep upkeep on your terms instead of relying on memory alone.",
    ],
    bullets: [
      "Tune what you are reminded for—service, money, paperwork",
      "Per-vehicle context in every notification",
      "Fewer missed renewals and surprise overdue items",
    ],
  },
];

export default function Customer() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="customer-page">
      <Navbar />

      <main className="customer-page__main">
        <section className="customer-hero">
          <div className="customer-hero__bg" aria-hidden="true" />
          <div className="customer-hero__mesh" aria-hidden="true" />
          <div className="customer-hero__inner">
            <motion.p
              className="customer-hero__eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Mobile app · For vehicle owners
            </motion.p>
            <motion.h1
              className="customer-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              Your vehicles, your records—
              <br />
              <span className="customer-hero__title-accent customer-gradient-text">
                one place that stays clear.
              </span>
            </motion.h1>
            <motion.p
              className="customer-hero__lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              A dedicated mobile experience to track service and fuel, store vehicle documents safely,
              and get reminders that match how you actually use each vehicle—without juggling paper,
              random photos, and memory.
            </motion.p>

            <motion.section
              className="customer-stores"
              aria-label="Get the mobile app"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
              {/* <p className="customer-stores__label">Available on iOS and Android</p> */}
              <div className="customer-stores__row">
                {/* <a
                  href={APP_STORE_URL}
                  className="customer-stores__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="customer-stores__badge"
                    width={120}
                    height={40}
                  />
                </a> */}
                {/* <a
                  href={PLAY_STORE_URL}
                  className="customer-stores__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="customer-stores__badge customer-stores__badge--play"
                    width={135}
                    height={40}
                  />
                </a> */}
              </div>
            </motion.section>

            <motion.div
              className="customer-hero__actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="#features" className="customer-btn customer-btn--ghost">
                Read the full feature detail
              </a>
              <Link to="/contact" className="customer-btn customer-btn--primary">
                Questions? Contact us
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="customer-features customer-features--showcase" id="features">
          <div className="customer-features__ambient" aria-hidden="true" />
          <div className="customer-features__inner">
            <header className="customer-features__header customer-features__header--showcase">
              <p className="customer-features__kicker">Inside the app</p>
              <h2 className="customer-features__title customer-features__title--showcase">
                What you can do
              </h2>
              <p className="customer-features__subtitle customer-features__subtitle--showcase">
                Four areas, explained in depth—each one focused on vehicles you own and the paperwork
                and habits around them.
              </p>
            </header>

            <div className="customer-features__track">
              {FEATURES.map((f, i) => (
                <motion.article
                  key={f.title}
                  className={`customer-showcase customer-showcase--${f.tone} ${
                    i % 2 === 1 ? "customer-showcase--flip" : ""
                  }`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          type: "spring",
                          stiffness: 120,
                          damping: 22,
                          delay: Math.min(i * 0.07, 0.28),
                        }
                  }
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -6,
                          transition: { type: "spring", stiffness: 400, damping: 25 },
                        }
                  }
                >
                  <div className="customer-showcase__glow" aria-hidden="true" />
                  <div className="customer-showcase__frame">
                    <div className="customer-showcase__rail">
                      <span className="customer-showcase__index" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="customer-showcase__icon">
                        <i className={`bi ${f.icon}`} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="customer-showcase__panel">
                      <h3 className="customer-showcase__title">{f.title}</h3>
                      <div className="customer-showcase__copy">
                        {f.paragraphs.map((p, idx) => (
                          <motion.p
                            key={idx}
                            className="customer-showcase__para"
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={
                              prefersReducedMotion
                                ? undefined
                                : {
                                    delay: 0.05 + idx * 0.04,
                                    duration: 0.35,
                                  }
                            }
                          >
                            {p}
                          </motion.p>
                        ))}
                      </div>
                      <ul className="customer-showcase__bullets">
                        {f.bullets.map((b, bi) => (
                          <motion.li
                            key={b}
                            className="customer-showcase__bullet"
                            initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={
                              prefersReducedMotion
                                ? undefined
                                : { delay: 0.12 + bi * 0.05, duration: 0.3 }
                            }
                          >
                            <span className="customer-showcase__bullet-dot" aria-hidden="true" />
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="customer-cta">
          <div className="customer-cta__card">
            <h2 className="customer-cta__title">Need help or have feedback?</h2>
            <p className="customer-cta__desc">
              The app is on the App Store and Google Play—links at the top of this page. If something does
              not work as expected or you want to suggest an improvement, we are happy to hear from you.
            </p>
            <Link to="/contact" className="customer-btn customer-btn--primary customer-btn--lg customer-cta__btn">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
