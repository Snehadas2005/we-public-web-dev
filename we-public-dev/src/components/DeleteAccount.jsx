import { useEffect } from "react";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import "../style/DeleteAccount.css";

const DELETE_STEPS = [
  {
    id: 1,
    title: "Step 1. Go to the settings in the Workshop Edge application and click on delete account.",
    description: "Navigate to the settings menu in your customer app. Scroll to the bottom of the list where you will find the 'Delete Account' option to begin the process.",
    image: "/feature1.png",
    faqs: [
      { q: "Where can I find settings?", a: "Tap on your profile icon in the bottom navigation bar and select 'Settings'." }
    ]
  },
  {
    id: 2,
    title: "Step 2. Choose a reason for leaving",
    description: "Once you click on Delete Account, we will ask you for a reason. Your feedback is crucial for us to improve the Workshop Edge experience for everyone.",
    image: "/feature2.png",
    faqs: [
      { q: "Do I have to select a reason?", a: "Yes, providing a reason is required to proceed with account deletion." },
      { q: "Can I just pause my account?", a: "Currently, we only support permanent deletion. You can turn off notifications in settings instead." }
    ]
  },
  {
    id: 3,
    title: "Step 3. Verify with OTP",
    description: "For security, we need to verify that you own the account. You will receive a 6-digit verification code on your registered mobile number.",
    image: "/feature3.png",
    faqs: [
      { q: "I didn't receive the code. What should I do?", a: "Wait for the countdown to finish and click 'Resend'. Make sure you have good network coverage." },
      { q: "Can I use an email address instead?", a: "No, we strictly require the mobile number registered with your Workshop Edge account." }
    ]
  },
  {
    id: 4,
    title: "Step 4. Account Scheduled for Deletion",
    description: "After verifying the OTP, your account is scheduled for permanent deletion. You can now safely uninstall the application from your device.",
    image: "/feature4.png",
    faqs: [
      { q: "Can I recover my account?", a: "No, account deletion is permanent and cannot be undone once completed." },
      { q: "What about my pending payments?", a: "You must clear any pending payments directly with the respective garage, as deleting the account does not absolve financial obligations." },
      { q: "Will I stop receiving promotional messages?", a: "Yes, your contact details will be removed from all marketing lists within 24 hours." }
    ]
  }
];

export default function DeleteAccount() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Delete customer account · WorkshopEdge";
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="delete-account-page">
      <Navbar />
      <main className="da-main">
        <div className="da-header-container">
          <p className="da-eyebrow">Customer account</p>
          <h1 className="da-title">Delete your account</h1>
          
          <div className="da-callout" role="note">
            <div className="da-callout-icon">
              <i className="bi bi-exclamation-triangle-fill" aria-hidden />
            </div>
            <div className="da-callout-text">
              <p className="da-warning-strong">
                If you opened this page from the WorkshopEdge customer app, you can permanently delete your customer account after we verify your mobile number.
              </p>
              <p>
                This cannot be undone. Active bookings may be cancelled and you will lose access to your history in the customer app. Workshop records required for legal or billing purposes may be kept by the garage in their systems.
              </p>
            </div>
          </div>
        </div>

        <div className="da-steps-container">
          {DELETE_STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`da-step-row ${isEven ? 'da-row-even' : 'da-row-odd'}`}>
                {/* Left Side: Image and FAQs */}
                <div className="da-step-left-col">
                  <div className="da-image-wrapper">
                    <img src={step.image} alt={step.title} />
                  </div>
                  
                  <div className="da-faqs-box">
                    <h3 className="da-faqs-heading">
                      <i className="bi bi-question-circle-fill" /> FAQs
                    </h3>
                    <div className="da-faqs-list">
                      {step.faqs.map((faq, i) => (
                        <div key={i} className="da-faq-item">
                          <h4 className="da-faq-q">{faq.q}</h4>
                          <p className="da-faq-a">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Side: Title and Description */}
                <div className="da-step-right-col">
                  <h2 className="da-step-title">{step.title}</h2>
                  <p className="da-step-desc">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
