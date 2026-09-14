export interface Region {
  name: string;
  slug: string;
  description: string;
  seoSnippet: string;
}

export const regions: Region[] = [
  {
    name: 'London',
    slug: 'london',
    description:
      'As the UK\'s largest technology hub, London is home to thousands of innovative businesses and startups. Blundell Technologies works with London-based organisations across fintech, healthtech, e-commerce, and professional services to deliver software that meets the demands of one of the world\'s most competitive markets.',
    seoSnippet: 'London-based businesses trust Blundell Technologies for',
  },
  {
    name: 'Manchester',
    slug: 'manchester',
    description:
      'Manchester\'s thriving digital economy has established the city as one of the UK\'s leading technology centres. We partner with Manchester businesses — from MediaCityUK enterprises to Northern Quarter startups — to build software solutions that drive growth in this dynamic market.',
    seoSnippet: 'Manchester businesses choose Blundell Technologies for',
  },
  {
    name: 'Birmingham',
    slug: 'birmingham',
    description:
      'Birmingham is the heart of the Midlands technology sector, with a rapidly growing digital economy. We support Birmingham-based businesses across manufacturing, logistics, finance, and professional services with custom software solutions built for scale.',
    seoSnippet: 'Birmingham organisations partner with Blundell Technologies for',
  },
  {
    name: 'Leeds',
    slug: 'leeds',
    description:
      'Leeds has emerged as a major hub for fintech, healthtech, and digital innovation in the North of England. Blundell Technologies works with Leeds-based companies to deliver enterprise-grade software that supports their ambitious growth plans.',
    seoSnippet: 'Leeds-based companies rely on Blundell Technologies for',
  },
  {
    name: 'Bristol',
    slug: 'bristol',
    description:
      'Bristol\'s technology sector is one of the most innovative in the UK, with particular strength in aerospace, creative industries, and deep tech. We help Bristol businesses turn complex technical challenges into elegant software solutions.',
    seoSnippet: 'Bristol businesses work with Blundell Technologies for',
  },
  {
    name: 'Edinburgh',
    slug: 'edinburgh',
    description:
      'Edinburgh is Scotland\'s technology capital, with a world-class fintech ecosystem and a thriving startup scene. Blundell Technologies supports Edinburgh-based organisations with software development that matches the city\'s reputation for quality and innovation.',
    seoSnippet: 'Edinburgh companies trust Blundell Technologies for',
  },
  {
    name: 'Cardiff',
    slug: 'cardiff',
    description:
      'Cardiff is driving Wales\'s growing digital economy with a strong focus on cybersecurity, fintech, and creative technology. We work with Cardiff businesses to build software that helps them compete nationally and internationally.',
    seoSnippet: 'Cardiff businesses choose Blundell Technologies for',
  },
  {
    name: 'Glasgow',
    slug: 'glasgow',
    description:
      'Glasgow is one of the UK\'s fastest-growing technology centres, with particular strengths in space technology, gaming, and AI. Blundell Technologies partners with Glasgow organisations to deliver software solutions that support Scotland\'s innovation agenda.',
    seoSnippet: 'Glasgow organisations partner with Blundell Technologies for',
  },
  {
    name: 'Nottingham',
    slug: 'nottingham',
    description:
      'Nottingham\'s digital sector is growing rapidly, supported by strong university-industry links and a collaborative tech community. We help Nottingham businesses leverage technology to streamline operations and accelerate growth.',
    seoSnippet: 'Nottingham businesses rely on Blundell Technologies for',
  },
  {
    name: 'Liverpool',
    slug: 'liverpool',
    description:
      'Liverpool\'s digital and creative industries are experiencing significant growth, with the city investing heavily in its technology infrastructure. Blundell Technologies supports Liverpool-based businesses with modern software solutions designed for the future.',
    seoSnippet: 'Liverpool companies work with Blundell Technologies for',
  },
];

export const getRegionBySlug = (slug: string): Region | undefined => {
  return regions.find((r) => r.slug === slug);
};
