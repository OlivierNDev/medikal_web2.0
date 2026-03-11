import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Blog.css';

const newsArticles = [
  {
    id: 1,
    title: "Medikal Africa Selected for NVIDIA Inception Program",
    category: "Technology Partnership",
    date: "February 2026",
    excerpt: "Medikal Africa has been selected to join the NVIDIA Inception Program, a global initiative supporting startups building advanced AI and accelerated computing solutions. This milestone reflects confidence in Medikal's technology and vision for healthcare AI.",
    content: "Medikal Africa has been selected to join the NVIDIA Inception Program, a global initiative supporting startups building advanced AI and accelerated computing solutions. This milestone reflects confidence in Medikal's technology and vision for healthcare AI. The program provides access to cutting-edge GPU technology, technical support, and networking opportunities with industry leaders.",
    image: null,
    icon: "microchip"
  },
  {
    id: 2,
    title: "Medikal Africa CEO Selected as Youth Digital Health Champion by Africa CDC",
    category: "Leadership & Recognition",
    date: "December 2025",
    excerpt: "Olivier Niyonshima, CEO and Founder of Medikal Africa, has been honored as a Youth Digital Health Champion by the Africa CDC Youth in Digital Health Network, recognizing his leadership in combating antimicrobial resistance.",
    content: "Olivier Niyonshima, CEO and Founder of Medikal Africa, has been honored as a Youth Digital Health Champion by the Africa CDC Youth in Digital Health Network. This recognition celebrates his exceptional leadership in combating antimicrobial resistance across the African continent. The award highlights the critical role of young innovators in transforming healthcare through digital solutions.",
    image: null,
    icon: "award"
  },
  {
    id: 3,
    title: "Leadership Spotlight: Outbreak News, USA",
    category: "Leadership & Innovation",
    date: "November 2025",
    excerpt: "Our co-founder and AMR Initiative Rwanda founder, Marcel Ishimwe, has been invited to the Outbreak News Interviews Podcast to share how AMR Initiative Rwanda is actively tackling antimicrobial resistance in Rwanda through collaboration with Medikal Africa.",
    content: "Marcel Ishimwe, Co-Founder & Director of Strategic Partnerships of Medikal and founder of AMR Initiative Rwanda, was featured on the Outbreak News Interviews Podcast. He discussed how AMR Initiative Rwanda is actively tackling antimicrobial resistance in Rwanda through strategic collaboration with Medikal Africa. The interview highlighted innovative approaches to AMR surveillance and prevention.",
    image: null,
    icon: "podcast"
  },
  {
    id: 4,
    title: "Leadership Spotlight: ONPOD TV, Canada",
    category: "Leadership & Innovation",
    date: "October 2025",
    excerpt: "Our founder and CEO, Olivier Niyonshima, was featured on ONPOD TV Canada in an exclusive interview highlighting Medikal's groundbreaking mission to fight antimicrobial resistance (AMR) across Africa through artificial intelligence.",
    content: "Olivier Niyonshima, Founder and CEO of Medikal Africa, was featured on ONPOD TV Canada in an exclusive interview. He discussed Medikal's groundbreaking mission to fight antimicrobial resistance (AMR) across Africa through artificial intelligence. The interview explored how AI-powered solutions can transform healthcare delivery and improve patient outcomes across the continent.",
    videoUrl: "https://www.youtube.com/embed/fs0uUfnqxOw",
    icon: "video"
  },
  {
    id: 5,
    title: "ZeroX Intelligence × RoboLabs — Deploying cBot UV-C Disinfection Robots in Africa",
    category: "Healthcare Innovation",
    date: "October 2025",
    excerpt: "Medikal Africa's parent company ZeroX Intelligence partners with RoboLabs to bring advanced autonomous disinfection technology to African healthcare facilities, working alongside Medikal AI to reduce healthcare-associated infections.",
    content: "Medikal Africa's parent company ZeroX Intelligence has partnered with RoboLabs to deploy cBot UV-C disinfection robots in African healthcare facilities. This innovative partnership combines autonomous disinfection technology with Medikal's AI-powered surveillance to create a comprehensive infection prevention system. The robots work alongside Medikal AI to reduce healthcare-associated infections and improve patient safety.",
    image: null,
    icon: "robot"
  },
  {
    id: 6,
    title: "ZeroX Intelligence Partners with AMR Initiative Rwanda to Develop 'Medikal'",
    category: "Healthcare & AI Innovation",
    date: "October 2025",
    excerpt: "Medikal is an AI-powered health assistant developed by ZeroX Intelligence and AMR Initiative Rwanda to help clinicians and patients improve diagnosis accuracy, manage medication adherence, and reduce antimicrobial misuse.",
    content: "ZeroX Intelligence has partnered with AMR Initiative Rwanda to develop Medikal, an AI-powered health assistant designed to help clinicians and patients improve diagnosis accuracy, manage medication adherence, and reduce antimicrobial misuse. This strategic partnership combines ZeroX's technical expertise with AMR Initiative Rwanda's deep understanding of healthcare challenges in Africa.",
    image: null,
    icon: "handshake"
  }
];

const iconMap = {
  microchip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 1v6M15 1v6M9 17v6M15 17v6M1 9h6M17 9h6M1 15h6M17 15h6" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  podcast: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1v2" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 12h2a2 2 0 1 0 0-4h-3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2zm0 0h1a2 2 0 0 1 2 2v1M7 12h.01M17 12h.01" />
    </svg>
  )
};

const Blog = React.memo(function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(newsArticles.map(article => article.category))];
  const filteredArticles = filter === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === filter);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <motion.div
            className="blog-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="blog-tag">News & Updates</span>
            <h1>Medikal Africa News</h1>
            <p>Stay updated with the latest news, partnerships, and media coverage about our impact on healthcare in Africa.</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="blog-filters">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'All News' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="blog-articles">
        <div className="container">
          <div className="articles-grid">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                className="article-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="article-icon">
                  {iconMap[article.icon]}
                </div>
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-date">{article.date}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-footer">
                  <span className="read-more">Read More →</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <motion.div
          className="article-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            className="article-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                {iconMap[selectedArticle.icon]}
              </div>
              <div className="modal-meta">
                <span className="modal-category">{selectedArticle.category}</span>
                <span className="modal-date">{selectedArticle.date}</span>
              </div>
            </div>

            <h2 className="modal-title">{selectedArticle.title}</h2>

            {selectedArticle.videoUrl && (
              <div className="modal-video">
                <iframe
                  src={selectedArticle.videoUrl}
                  title={selectedArticle.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="modal-content">
              <p>{selectedArticle.content}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
});

export default Blog;
