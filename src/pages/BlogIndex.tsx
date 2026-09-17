import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts, formatBlogDate } from '../data/blogs';
import SEO from '../components/SEO';

const BlogIndex: React.FC = () => {
  return (
    <>
      <SEO
        title="Articles"
        description="Insights on software development, technology strategy, and building products that work. Written by the Blundell Technologies team."
        url="/articles"
      />

      <div className="page-header">
        <h1>Articles</h1>
        <p>
          Insights on software development, technology strategy, and building
          products that drive business results.
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <Link
            key={post.slug}
            to={`/articles/${post.slug}`}
            /* The newest article leads, running full width with the image alongside */
            className={`blog-card ${index === 0 ? 'featured' : ''}`}
          >
            {post.hero && (
              <div className="blog-card-media">
                <img src={post.hero.src} alt="" loading="lazy" decoding="async" />
              </div>
            )}
            <div className="blog-card-body">
              <span className="blog-card-category">{post.category}</span>
              <div className="blog-card-meta">
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                <span>{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-card-link">
                Read article <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            Articles coming soon. Check back for insights on software
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
