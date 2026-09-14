import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getBlogBySlug, blogPosts } from '../data/blogs';
import SEO from '../components/SEO';
import { absoluteUrl, breadcrumbList, ORGANIZATION_ID } from '../utils/seo';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Simple markdown-like rendering: split on double newlines for paragraphs,
  // handle ## headings
  const renderContent = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, i) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) {
        return <h2 key={i}>{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={i}>{trimmed.slice(4)}</h3>;
      }
      return <p key={i}>{trimmed}</p>;
    });
  };

  return (
    <>
      <SEO
        title={post.seoTitle.replace(' | Blundell Technologies', '')}
        description={post.seoDescription}
        url={`/blog/${post.slug}`}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.seoDescription,
            datePublished: post.date,
            dateModified: post.date,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@id': ORGANIZATION_ID },
            image: absoluteUrl('/og-image.jpg'),
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            articleSection: post.category,
            inLanguage: 'en-GB',
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="blog-detail">
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-text-muted)',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '2rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="blog-detail-header">
          <div className="blog-detail-meta">
            <span className="blog-card-category">{post.category}</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>{post.readTime}</span>
            <span>By {post.author}</span>
          </div>
          <h1>{post.title}</h1>
        </div>

        <div className="blog-content">
          {renderContent(post.content)}
        </div>

        {/* Related Posts */}
        {otherPosts.length > 0 && (
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
              More Articles
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="region-link"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <strong style={{ color: 'var(--color-text)' }}>{p.title}</strong>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      {p.readTime} &middot; {p.category}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <section className="cta-section">
        <h2>Need Software Development Help?</h2>
        <p>
          We build custom software, web apps, and mobile applications
          for businesses across the UK.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Get in Touch
        </Link>
      </section>
    </>
  );
};

export default BlogDetail;
