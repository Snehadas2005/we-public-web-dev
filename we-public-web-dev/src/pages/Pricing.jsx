import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Pricing.css';

const Pricing = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

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
            question: "Can I change my plan later?",
            answer: "Yes. You can upgrade or change your plan anytime as your workshop grows."
        }
    ];

    return (
        <div className="pricing-page">
            <Navbar />
            
            {/* 1. Intro Section */}
            <section className="pricing-intro container">
                <div className="pricing-header">
                    <h1>Flexible Plans for Every Workshop</h1>
                    <p>WorkshopEdge offers simple and scalable pricing designed for workshops of every size. Whether you are running a small garage or managing multiple service locations, our plans help you organize operations, track jobs, manage staff, and monitor performance from one platform.</p>
                </div>
            </section>

            {/* 2. Plan Overview Section */}
            <section className="plan-overview-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Find the Right Plan for Your Garage</h2>
                    </div>
                    <div className="overview-grid">
                        <div className="overview-item">
                            <h3>Lite</h3>
                            <p>Best for small garages and independent mechanics who need essential tools to manage jobs, customers, and daily operations.</p>
                        </div>
                        <div className="overview-item">
                            <h3>Prime</h3>
                            <p>Ideal for growing workshops that need advanced reporting, GST invoicing, inventory tracking, and better staff coordination.</p>
                        </div>
                        <div className="overview-item">
                            <h3>Enterprise</h3>
                            <p>Designed for large garages and multi-location businesses that require full operational control, advanced integrations, and customized solutions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Comparison Table Section */}
            <section className="comparison-section container">
                <div className="comparison-header">
                    <h2>See what's included</h2>
                    <p>Compare features across all three tiers to find the perfect fit for your workshop.</p>
                </div>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th className="feature-category-col"></th>
                                <th className="tier-col">Lite</th>
                                <th className="tier-col">Prime</th>
                                <th className="tier-col">Enterprise</th>
                            </tr>
                        </thead>
                        
                        {/* Core Capabilities */}
                        <tbody>
                            <tr className="category-row">
                                <td colSpan="4">Core Capabilities</td>
                            </tr>
                            <tr>
                                <td>Unlimited job cards</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Non-GST invoicing</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>GST invoicing</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Staff management</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Staff login</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Staff mobile app</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Customer mobile app (Live Status)</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Dashboard level</td>
                                <td>Basic</td>
                                <td>Advanced</td>
                                <td>Full</td>
                            </tr>
                        </tbody>

                        {/* Reporting & Analytics */}
                        <tbody>
                            <tr className="category-row">
                                <td colSpan="4">Reporting & Analytics</td>
                            </tr>
                            <tr>
                                <td>Sales Reports</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Detailed Reports</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Profit Reports</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Export reports as PDF</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                        </tbody>

                        {/* Inventory & Operations */}
                        <tbody>
                            <tr className="category-row">
                                <td colSpan="4">Inventory & Operations</td>
                            </tr>
                            <tr>
                                <td>Inventory management</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Purchase management</td>
                                <td><i className="bi bi-x red"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr>
                                <td>Expense tracking</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                            <tr className="alt-bg">
                                <td>Counter spare parts sale</td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                                <td><i className="bi bi-check green"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 4. Core Platform Benefits Section */}
            <section className="benefits-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Core Platform Benefits</h2>
                        <p>All WorkshopEdge plans are designed to simplify daily workshop operations and improve efficiency.</p>
                    </div>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <i className="bi bi-diagram-3"></i>
                            <p>Centralized job and vehicle history tracking</p>
                        </div>
                        <div className="benefit-card">
                            <i className="bi bi-person-lines-fill"></i>
                            <p>Easy customer and service record management</p>
                        </div>
                        <div className="benefit-card">
                            <i className="bi bi-cloud-check"></i>
                            <p>Cloud-based system accessible from anywhere</p>
                        </div>
                        <div className="benefit-card">
                            <i className="bi bi-graph-up-arrow"></i>
                            <p>Automated reporting and analytics</p>
                        </div>
                        <div className="benefit-card">
                            <i className="bi bi-shield-lock"></i>
                            <p>Secure data storage and regular system updates</p>
                        </div>
                        <div className="benefit-card">
                            <i className="bi bi-window"></i>
                            <p>Simple interface designed specifically for garage owners</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Pricing Cards Section */}
            <section className="plan-selection-section container">
                <div className="plan-selection-header">
                    <h2>Choose Your Plan</h2>
                    <p>Transparent and Flexible Pricing built to support workshops at different stages of growth.</p>
                </div>
                
                <div className="plan-cards-container">
                    {/* Lite Plan */}
                    <div className="plan-card">
                        <div className="plan-card-inner">
                            <h3>Lite</h3>
                            <p className="plan-subtitle">Essential tools for small workshops.</p>
                            <ul className="plan-features">
                                <li><i className="bi bi-check-circle-fill"></i> Job Management & History</li>
                                <li><i className="bi bi-check-circle-fill"></i> Purchase & Sale Management</li>
                                <li><i className="bi bi-check-circle-fill"></i> Basic Reporting</li>
                                <li><i className="bi bi-check-circle-fill"></i> Excel Data Export</li>
                            </ul>
                            <button className="btn-plan-outline">Free Trial</button>
                        </div>
                    </div>

                    {/* Prime Plan */}
                    <div className="plan-card featured">
                        <div className="plan-tag">MOST POPULAR</div>
                        <div className="plan-card-inner">
                            <h3>Prime</h3>
                            <p className="plan-subtitle">Comprehensive tools for growing teams.</p>
                            <ul className="plan-features">
                                <li><i className="bi bi-check-circle-fill"></i> Everything in Lite</li>
                                <li><i className="bi bi-check-circle-fill"></i> Inventory Management</li>
                                <li><i className="bi bi-check-circle-fill"></i> GST/Tax Invoicing</li>
                                <li><i className="bi bi-check-circle-fill"></i> Customized Reporting</li>
                                <li><i className="bi bi-check-circle-fill"></i> Monthly Software Updates</li>
                            </ul>
                            <button className="btn-plan-solid">Free Trial</button>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="plan-card">
                        <div className="plan-card-inner">
                            <h3>Enterprise</h3>
                            <p className="plan-subtitle">Full suite for vehicle trade chains.</p>
                            <div className="plan-price-large">Custom</div>
                            <ul className="plan-features">
                                <li><i className="bi bi-check-circle-fill"></i> Everything in Prime</li>
                                <li><i className="bi bi-check-circle-fill"></i> Weekly Software Updates</li>
                                <li><i className="bi bi-check-circle-fill"></i> Multi-location Sync</li>
                                <li><i className="bi bi-check-circle-fill"></i> Advanced Document Storage</li>
                            </ul>
                            <button className="btn-plan-dark">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decision Guidance Section */}
            <section className="upgrade-guidance">
                <div className="container">
                    <div className="guidance-header">
                        <h2>When Should You Move to the Next Plan?</h2>
                        <p>Growth brings new challenges. WorkshopEdge is designed to scale alongside your workshop, ensuring you always have the tools you need.</p>
                    </div>
                    
                    <div className="guidance-grid">
                        <div className="guidance-card">
                            <div className="guidance-icon-wrapper">
                                <i className="bi bi-graph-up-arrow"></i>
                            </div>
                            <h3>Scaling Volume</h3>
                            <p>When your workshop begins handling more vehicles each month and manual tracking becomes a bottleneck.</p>
                        </div>
                        
                        <div className="guidance-card">
                            <div className="guidance-icon-wrapper">
                                <i className="bi bi-pie-chart-fill"></i>
                            </div>
                            <h3>Advanced Insights</h3>
                            <p>When you need deeper data analysis and custom reporting to optimize your business performance.</p>
                        </div>
                        
                        <div className="guidance-card">
                            <div className="guidance-icon-wrapper">
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <h3>Team Expansion</h3>
                            <p>When your team grows and you require granular staff permissions and better coordination tools.</p>
                        </div>
                        
                        <div className="guidance-card">
                            <div className="guidance-icon-wrapper">
                                <i className="bi bi-cpu-fill"></i>
                            </div>
                            <h3>Full Automation</h3>
                            <p>When you want to fully automate inventory, invoicing, and customer notifications for maximum efficiency.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Pricing FAQ Section */}
            <section className="pricing-faq bg-light-blue">
                <div className="container">
                    <div className="section-header">
                        <h1>FAQs</h1>
                        <p>Find answers to common questions about WorkshopEdge and how it can transform your garage operations</p>
                    </div>
                    <div className="faq-accordion">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="faq-question">
                                    <h4>{faq.question}</h4>
                                    <div className="faq-icon">
                                        <i className="bi bi-plus-lg"></i>
                                    </div>
                                </div>
                                <div className="faq-answer">
                                    <div className="faq-answer-content">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. CTA Section */}
            <section className="pricing-cta-section">
                <div className="pricing-cta-box">
                    <img src="/workshop-footer.png" alt="CTA Background" className="cta-bg-image" />
                    <div className="cta-content">
                        <h2>Ready to streamline</h2>
                        <p>Start managing your workshop better today with WorkshopEdge</p>
                        <div className="cta-buttons">
                            <button className="btn-primary">Start Free Trial</button>
                            <button className="btn-glass">Start Demo</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Pricing;
