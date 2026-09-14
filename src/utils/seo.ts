export const BASE_URL = 'https://blundell-labs.com';

// Matches the Organization @id declared in public/index.html's JSON-LD
export const ORGANIZATION_ID = `${BASE_URL}/#organization`;

export const absoluteUrl = (path: string): string =>
  path.startsWith('http') ? path : `${BASE_URL}${path}`;

export const breadcrumbList = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
