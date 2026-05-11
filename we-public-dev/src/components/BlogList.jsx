import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { API_BASE_URL } from "../config/env";
import "../style/blog.css";

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success && Array.isArray(json.data)) {
          setPosts(
            [...json.data]
              .sort((a, b) => a.display_order - b.display_order)
              .map((item) => ({
                id:          item.id,
                slug:        item.slug,
                title:       item.title,
                excerpt:     item.content,
                publishedAt: item.created_at,
                coverImage:  item.thumbnail,
              }))
          );
        }
      })
      .catch((err) => console.error("Blogs fetch error:", err));
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="blog-page">
      <Navbar />
      <header className="blog-page__hero">
        <div className="blog-page__hero-inner">
          <p className="blog-page__eyebrow">Insights</p>
          <h1 className="blog-page__title">Blog</h1>
          <p className="blog-page__lead">
            Ideas for running a calmer, more profitable workshop — from operations
            to customer experience.
          </p>
        </div>
      </header>

      <div className="blog-page__grid-wrap">
        <div className="blog-page__grid">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card__media">
                <img src={post.coverImage} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-card__body">
                <p className="blog-card__meta">
                  {formatDate(post.publishedAt)}
                </p>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <span className="blog-card__cta">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
