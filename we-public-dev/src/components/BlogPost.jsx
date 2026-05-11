import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { API_BASE_URL } from "../config/env";
import "../style/blog.css";

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    let cancelled = false;

    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success && Array.isArray(json.data)) {
          const found = json.data.find((item) => item.slug === slug) ?? null;
          setPost(found);
        }
      })
      .catch((err) => console.error("Blog post fetch error:", err))
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-article">
        <Navbar />
        <div className="blog-not-found">
          <p style={{ opacity: 0.4, fontFamily: "'Epilogue', sans-serif" }}>Loading…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-article">
        <Navbar />
        <div className="blog-not-found">
          <h1>Article not found</h1>
          <p>This post may have been moved or the link is incorrect.</p>
          <Link to="/blog">← Back to blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <article className="blog-article">
      <Navbar />
      <header className="blog-article__hero">
        <div className="blog-article__hero-inner">
          <Link to="/blog" className="blog-article__back">
            ← Blog
          </Link>
          <p className="blog-article__meta">
            {formatDate(post.created_at)}
          </p>
          <h1 className="blog-article__title">{post.title}</h1>
        </div>
      </header>

      <div className="blog-article__cover">
        <img src={post.thumbnail} alt={post.title} />
      </div>

      <div className="blog-article__content">
        <p>{post.content}</p>
      </div>

      <Footer />
    </article>
  );
}
