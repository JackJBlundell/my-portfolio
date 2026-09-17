import makingTheMostOfAiInYourApp from './posts/making-the-most-of-ai-in-your-app';

import type { BlogPost } from './blogTypes';

export type { BlogPost } from './blogTypes';

/*
  To add an article: create `src/data/posts/<slug>.ts` (copy an existing one for the shape),
  register it below, and add the URL to `public/sitemap.xml`. Order here doesn't matter —
  posts are sorted by date, newest first.
*/
export const blogPosts: BlogPost[] = [makingTheMostOfAiInYourApp].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((b) => b.slug === slug);
};

// "2026-09-16" -> "16 September 2026"
export const formatBlogDate = (date: string): string =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
