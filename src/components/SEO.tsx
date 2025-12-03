interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const BASE_URL = 'https://blundell-labs.com';
const DEFAULT_TITLE = 'Blundell Labs | AI-Powered MVP Development';
const DEFAULT_DESCRIPTION = 'Enterprise-quality MVPs at startup speed. We combine AI-powered development with battle-tested expertise to build scalable React and React Native apps that don\'t break the bank.';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  url,
  type = 'website',
}) => {
  const fullTitle = title ? `${title} | Blundell Labs` : DEFAULT_TITLE;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const fullImage = image ? (image.startsWith('http') ? image : `${BASE_URL}${image}`) : DEFAULT_IMAGE;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Blundell Labs" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      <link rel="canonical" href={fullUrl} />
    </>
  );
};

export default SEO;
