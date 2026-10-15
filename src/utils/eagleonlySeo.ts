import { absoluteUrl, breadcrumbList, ORGANIZATION_ID } from './seo';
import {
  EO_FEATURES,
  EO_ICON_FULL,
  EO_OG_IMAGE,
  EO_NAME,
  EO_PATH,
  EO_SUMMARY,
  EO_TAGLINE,
  EO_WEBSITE,
  FOUNDING_CLOSES_AT,
  FOUNDING_PRICE,
} from '../data/eagleonly';

const priceNumber = FOUNDING_PRICE.replace(/[^0-9.]/g, '');

// The product itself, published by Blundell Technologies. Every EagleOnly page carries it so
// search engines tie the sub-pages back to one product and one maker.
export const eagleOnlyProductJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${absoluteUrl(EO_PATH)}#software`,
  name: EO_NAME,
  alternateName: 'EagleOnly by Blundell Technologies',
  slogan: EO_TAGLINE,
  description: EO_SUMMARY,
  url: absoluteUrl(EO_PATH),
  image: absoluteUrl(EO_OG_IMAGE),
  sameAs: [EO_WEBSITE],
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Golf club management software',
  operatingSystem: 'iOS, Android, Web',
  featureList: EO_FEATURES.map((feature) => feature.title),
  brand: { '@type': 'Brand', name: EO_NAME, slogan: EO_TAGLINE, logo: absoluteUrl(EO_ICON_FULL) },
  publisher: { '@id': ORGANIZATION_ID },
  creator: { '@id': ORGANIZATION_ID },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'UK golf clubs',
    geographicArea: { '@type': 'Country', name: 'United Kingdom' },
  },
  offers: {
    '@type': 'Offer',
    name: 'Founding Partner rate',
    price: priceNumber,
    priceCurrency: 'GBP',
    priceValidUntil: FOUNDING_CLOSES_AT.slice(0, 10),
    availability: 'https://schema.org/LimitedAvailability',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: priceNumber,
      priceCurrency: 'GBP',
      unitText: 'MONTH',
      billingDuration: 'P1M',
    },
    seller: { '@id': ORGANIZATION_ID },
  },
});

// Breadcrumbs for an EagleOnly page; leave `page` out for the overview
export const eagleOnlyBreadcrumbs = (page?: { name: string; path: string }) =>
  breadcrumbList([
    { name: 'Home', path: '/' },
    { name: EO_NAME, path: EO_PATH },
    ...(page ? [page] : []),
  ]);

export const faqJsonLd = (faqs: { question: string; answer: string }[], path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
  url: absoluteUrl(path),
});
