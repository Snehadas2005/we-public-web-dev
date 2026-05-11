import { useEffect, useMemo, useState } from "react";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { API_BASE_URL } from "../config/env";
import "../style/legalDocs.css";

export default function LegalDocumentPage({ docType, pageTitle }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const resolvedTitle = useMemo(() => {
    if (pageTitle) return pageTitle;
    return docType === "terms-conditions" ? "Terms & Conditions" : "Privacy Policy";
  }, [docType, pageTitle]);

  useEffect(() => {
    const fetchLegalDoc = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/legal-docs`);
        const result = await response.json();

        if (!result?.success || !Array.isArray(result.data)) {
          setError("Unable to load legal document.");
          setLoading(false);
          return;
        }

        const matched = result.data.find((doc) => doc?.doc_type === docType);
        if (!matched?.content) {
          setError("Document content is not available.");
          setLoading(false);
          return;
        }

        setContent(matched.content);
      } catch (err) {
        setError("Failed to load legal document. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLegalDoc();
  }, [docType]);

  return (
    <div className="legal-page-root">
      <Navbar />
      <section className="legal-page-section">
        <div className="legal-page-inner">
          <h1 className="legal-page-title">{resolvedTitle}</h1>
          {loading && <p className="legal-page-message">Loading document...</p>}
          {!loading && error && <p className="legal-page-message legal-page-message--error">{error}</p>}
          {!loading && !error && (
            <article
              className="legal-page-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
