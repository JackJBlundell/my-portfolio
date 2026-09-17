import { render } from '@testing-library/react';
import { renderMarkdown } from './markdown';
import { blogPosts, formatBlogDate } from '../data/blogs';

/*
  CRA 5's Jest can't resolve react-router-dom v7's ESM `exports` map, so Link is stubbed.
  Only the internal-vs-external branch of renderLink depends on it.
*/
jest.mock(
  'react-router-dom',
  () => ({ Link: ({ to, children }: any) => <a href={to} data-internal="true">{children}</a> }),
  { virtual: true }
);

const renderBody = (markdown: string) =>
  render(<div className="blog-content">{renderMarkdown(markdown)}</div>).container;

describe('article bodies', () => {
  it.each(blogPosts.map((post) => [post.slug, post] as const))('%s renders cleanly', (_slug, post) => {
    const body = renderBody(post.content);
    const text = body.textContent ?? '';

    // Nothing should reach the page as unparsed Markdown
    expect(text).not.toMatch(/\]\(/);
    expect(text).not.toMatch(/\*\*/);
    expect(text).not.toMatch(/^#{2,3} /m);

    // Outbound links open safely; internal ones stay in the SPA
    body.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('/')) {
        expect(link.getAttribute('data-internal')).toBe('true');
      } else {
        expect(href).toMatch(/^https?:\/\//);
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        expect(link.getAttribute('target')).toBe('_blank');
      }
    });
  });

  it('parses the blocks and inline marks a post can use', () => {
    const body = renderBody(
      [
        '## A heading',
        '- one\n- two',
        '1. first\n2. second',
        '> a quote',
        '---',
        'Read [our work](/projects), the [docs](https://example.com), `code`, **bold** and *italic*.',
      ].join('\n\n')
    );

    expect(body.querySelector('h2')?.id).toBe('a-heading');
    expect(body.querySelectorAll('ul li')).toHaveLength(2);
    expect(body.querySelectorAll('ol li')).toHaveLength(2);
    expect(body.querySelector('blockquote')?.textContent).toBe('a quote');
    expect(body.querySelector('hr')).not.toBeNull();
    expect(body.querySelector('code')?.textContent).toBe('code');
    expect(body.querySelector('strong')?.textContent).toBe('bold');
    expect(body.querySelector('em')?.textContent).toBe('italic');
    expect(body.querySelector('a[href="/projects"]')?.getAttribute('data-internal')).toBe('true');
  });

  it('links bare URLs without swallowing the sentence punctuation', () => {
    const body = renderBody('See https://example.com/docs, then stop.');
    expect(body.querySelector('a')?.getAttribute('href')).toBe('https://example.com/docs');
    expect(body.textContent).toBe('See https://example.com/docs, then stop.');
  });
});

describe('the blog index', () => {
  it('lists posts newest first', () => {
    const dates = blogPosts.map((post) => post.date);
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
  });

  it('formats dates for readers', () => {
    expect(formatBlogDate('2026-09-16')).toBe('16 September 2026');
  });
});
