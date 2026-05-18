import { useEffect } from "react";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import "../style/DeleteAccount.css";

const DELETE_STEPS = [
  {
    id: 1,
    title: "Step 1. Access Settings & App Info",
    description: "Open the Workshop Edge application and navigate to the Settings page. Look for the 'App info version' section where the Delete Account option is located.",
    image: "/Step-1.jpeg",
    imgClass: "da-img-sm", 
    faqs: [
      { q: "Where is the App info version located?", a: "It is typically found at the bottom of the Settings menu in the main navigation." },
      { q: "Is the delete option available on the website?", a: "No, account deletion must be initiated through the mobile application for security purposes." }
    ]
  },
  {
    id: 2,
    title: "Step 2. Click on Delete Account",
    description: "Under the App info version details, click on the 'Delete Account' button to start the removal process of your personal data.",
    image: "/Step-2.jpeg",
    imgClass: "da-img-md", 
    faqs: [
      { q: "Will I be logged out immediately?", a: "No, the process requires one final confirmation before the account is deactivated." },
      { q: "What happens to my vehicle data?", a: "All stored vehicle profiles and document lockers associated with your account will be removed upon confirmation." }
    ]
  },
  {
    id: 3,
    title: "Step 3. Confirm via Deletion Popup",
    description: "A confirmation popup will appear. You can click 'Cancel' to keep your account active, or click 'Yes, Delete Account' to proceed with permanent removal.",
    image: "/Step-3.jpeg",
    imgClass: "da-img-lg", 
    faqs: [
      { q: "Can I undo the deletion after clicking Yes?", a: "No, once 'Yes, Delete Account' is clicked, the process is finalized and cannot be reversed." },
      { q: "What if I click Cancel by mistake?", a: "Clicking Cancel simply closes the popup; your account remains fully active and no data is lost." }
    ]
  },
  {
    id: 4,
    title: "Step 4. Successful Deletion",
    description: "Once confirmed, your account will be deleted successfully. You will be redirected and all your session data will be cleared.",
    faqs: [
      { q: "Can I use the same mobile number to register again?", a: "Yes, you can create a fresh account later, but your previous history will not be restored." },
      { q: "How long does it take for data to be removed?", a: "The account is deactivated instantly, and data cleanup is processed within 24 hours." }
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
                <div className="da-step-left-col">
                  {/* Conditional Rendering: Only show the wrapper if step.image exists */}
                  {step.image && (
                    <div className="da-image-wrapper">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className={step.imgClass}
                      />
                    </div>
                  )}
                </div>
                
                <div className="da-step-right-col">
                  <h2 className="da-step-title">{step.title}</h2>
                  <p className="da-step-desc">{step.description}</p>
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
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}