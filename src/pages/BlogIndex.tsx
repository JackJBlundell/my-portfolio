import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import SEO from '../components/SEO';

const BlogIndex: React.FC = () => {
  return (
    <>
      <SEO
        title="Blog"
        description="Insights on software development, technology strategy, and building products that work. Written by the Blundell Technologies team."
        url="/blog"
      />

      <div className="page-header">
        <h1>Blog</h1>
        <p>
          Insights on software development, technology strategy, and building
          products that drive business results.
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="blog-card"
          >
            <div className="blog-card-meta">
              <span className="blog-card-category">{post.category}</span>
              <span>{post.readTime}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="blog-card-link">
              Read article <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            Blog posts coming soon. Check back for insights on software
            development and technology strategy.
          </p>
        </div>
      )}

      <section className="cta-section">
        <h2>Have a Project in Mind?</h2>
        <p>
          Get in touch to discuss how we can help bring your idea to life
          with well-engineered software.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Start a Conversation
        </Link>
      </section>
    </>
  );
};

export default BlogIndex;
