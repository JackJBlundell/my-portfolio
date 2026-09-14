import { absoluteUrl } from '../utils/seo';

type JsonLd = Record<string, unknown>;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
  jsonLd?: JsonLd | JsonLd[];
  // Keeps a page out of search results (no canonical is emitted for it)
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Software Development Company UK | Blundell Technologies';
const DEFAULT_DESCRIPTION =
  'Cardiff-based software development company building custom software, web applications and iOS & Android apps for businesses across the UK.';
const DEFAULT_IMAGE = '/og-image.jpg';

const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  imageAlt,
  url = '/',
  type = 'website',
  jsonLd,
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | Blundell Technologies` : DEFAULT_TITLE;
  const fullUrl = absoluteUrl(url);
  const fullImage = absoluteUrl(image ?? DEFAULT_IMAGE);
  const fullImageAlt = imageAlt ?? (image ? fullTitle : 'Blundell Technologies logo');

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />
      {!noindex && <link rel="canonical" href={fullUrl} />}

      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={fullImageAlt} />
      {!image && <meta property="og:image:width" content="1200" />}
      {!image && <meta property="og:image:height" content="630" />}
      <meta property="og:site_name" content="Blundell Technologies" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={fullImageAlt} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};

export default SEO;
