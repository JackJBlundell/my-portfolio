import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getBlogBySlug, blogPosts, formatBlogDate } from '../data/blogs';
import { renderMarkdown } from '../utils/markdown';
import SEO from '../components/SEO';
import { absoluteUrl, breadcrumbList, ORGANIZATION_ID } from '../utils/seo';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/articles" replace />;
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  // Link previews and schema.org need a widely-supported raster file, which the hero
  // names explicitly; without one we fall back to the site's default og-image.
  const socialImage = post.hero?.social;

  return (
    <>
      <SEO
        title={post.seoTitle.replace(' | Blundell Technologies', '')}
        description={post.seoDescription}
        url={`/articles/${post.slug}`}
        image={socialImage}
        imageAlt={socialImage ? post.hero?.alt : undefined}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.seoDescription,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@id': ORGANIZATION_ID },
            image: absoluteUrl(socialImage ?? '/og-image.jpg'),
            mainEntityOfPage: absoluteUrl(`/articles/${post.slug}`),
            articleSection: post.category,
            inLanguage: 'en-GB',
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/articles' },
            { name: post.title, path: `/articles/${post.slug}` },
          ]),
        ]}
      />

      <div className="blog-detail">
        <Link
          to="/articles"
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
          Back to Articles
        </Link>

        <div className="blog-detail-header">
          <span className="blog-card-category">{post.category}</span>
          <div className="blog-detail-meta">
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            <span>{post.readTime}</span>
            <span>By {post.author}</span>
          </div>
          <h1>{post.title}</h1>
        </div>

        {post.hero && (
          <img className="blog-hero-image" src={post.hero.src} alt={post.hero.alt} decoding="async" />
        )}

        <div className="blog-content">
          {renderMarkdown(post.content)}
        </div>

        {/* Related Posts */}
        {otherPosts.length > 0 && (
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.375rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
              More Articles
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/articles/${p.slug}`}
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
        <h2>{post.cta.heading}</h2>
        <p>
          {post.cta.body ??
            'We build custom software, web apps, and mobile applications for businesses across the UK.'}
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Get in Touch
        </Link>
      </section>
    </>
  );
};

export default BlogDetail;
