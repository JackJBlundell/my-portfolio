export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  /**
   * Article body in the Markdown subset rendered by `src/utils/markdown.tsx`:
   * `##`/`###` headings, paragraphs, `-` and `1.` lists, `>` quotes, `---` rules,
   * a `![alt](/img/blog/x.webp "optional caption")` block on its own for a figure,
   * and inline `[text](url)`, `**bold**`, `*italic*`, `` `code` `` and bare URLs.
   * Blocks are separated by a blank line.
   */
  content: string;
  /**
   * Lead image, shown above the article body. `social` is what link previews and
   * `BlogPosting.image` use: point it at a JPG/PNG, since not every platform renders
   * WebP (and none render SVG). Without it the site's default og-image is used.
   */
  hero?: { src: string; alt: string; social?: string };
  /** Publication date, ISO `YYYY-MM-DD`. Posts are listed newest first. */
  date: string;
  /** Set when an existing post is revised, so search engines see a fresh `dateModified`. */
  updated?: string;
  author: string;
  category: string;
  /**
   * Closing call to action. Required, so no article ships with the generic site-wide one —
   * `body` falls back to a general line when a post doesn't need its own.
   */
  cta: { heading: string; body?: string };
  readTime: string;
  seoTitle: string;
  seoDescription: string;
}
