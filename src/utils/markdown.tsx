import React from 'react';
import { Link } from 'react-router-dom';

/*
  A deliberately small Markdown subset for article bodies (see `BlogPost.content`).
  Blocks are separated by a blank line:

    ## Heading            ### Sub-heading
    - bullet              1. numbered item
    > quote               ---  (horizontal rule)
    ![alt](src "caption") (a figure, on a block of its own)

  and inline: [text](url), **bold**, *italic*, `code`, plus bare http(s) URLs.
  Everything renders as React elements, so article text is escaped, never injected as HTML.
*/

// Matched left to right, so a [text](url) link wins over the bare-URL branch inside it.
// Built fresh per call: renderInline recurses, and a shared /g regex would share `lastIndex`.
const INLINE_SOURCE =
  '\\[([^\\]]+)\\]\\(([^)\\s]+)\\)' + // [text](url)
  '|\\*\\*([^*]+)\\*\\*' + //      **bold**
  '|\\*([^*\\n]+)\\*' + //          *italic*
  '|`([^`]+)`' + //                 `code`
  '|(https?://[^\\s<>]*[^\\s<>.,;:!?)\\]])'; // bare URL, minus trailing punctuation

const renderLink = (href: string, children: React.ReactNode, key: React.Key) =>
  href.startsWith('/') ? (
    <Link key={key} to={href}>
      {children}
    </Link>
  ) : (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

export const renderInline = (text: string): React.ReactNode => {
  const inline = new RegExp(INLINE_SOURCE, 'g');
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = inline.exec(text)) !== null) {
    const [full, linkText, linkHref, bold, italic, code, bareUrl] = match;

    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (linkHref) {
      nodes.push(renderLink(linkHref, renderInline(linkText), key++));
    } else if (bold) {
      nodes.push(<strong key={key++}>{renderInline(bold)}</strong>);
    } else if (italic) {
      nodes.push(<em key={key++}>{renderInline(italic)}</em>);
    } else if (code) {
      nodes.push(<code key={key++}>{code}</code>);
    } else if (bareUrl) {
      nodes.push(renderLink(bareUrl, bareUrl, key++));
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
};

// A block that is nothing but an image becomes a figure: ![alt](src "optional caption")
const IMAGE_BLOCK = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;

// "So, how do we do this safely?" -> "so-how-do-we-do-this-safely", for #deep-links
const headingId = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const renderMarkdown = (content: string): React.ReactNode[] => {
  const blocks = content.split(/\n\s*\n/);

  return blocks.map((rawBlock, i) => {
    const block = rawBlock.trim();
    if (!block) return null;

    const lines = block.split('\n').map((line) => line.trim());

    if (/^-{3,}$/.test(block)) {
      return <hr key={i} />;
    }

    const image = IMAGE_BLOCK.exec(block);
    if (image) {
      const [, alt, src, caption] = image;
      return (
        <figure key={i}>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          {caption && <figcaption>{renderInline(caption)}</figcaption>}
        </figure>
      );
    }

    if (block.startsWith('### ')) {
      const text = block.slice(4);
      return (
        <h3 key={i} id={headingId(text)}>
          {renderInline(text)}
        </h3>
      );
    }

    if (block.startsWith('## ')) {
      const text = block.slice(3);
      return (
        <h2 key={i} id={headingId(text)}>
          {renderInline(text)}
        </h2>
      );
    }

    if (lines.every((line) => line.startsWith('> '))) {
      return <blockquote key={i}>{renderInline(lines.map((line) => line.slice(2)).join(' '))}</blockquote>;
    }

    if (lines.every((line) => /^[-*] /.test(line))) {
      return (
        <ul key={i}>
          {lines.map((line, j) => (
            <li key={j}>{renderInline(line.slice(2))}</li>
          ))}
        </ul>
      );
    }

    if (lines.every((line) => /^\d+\. /.test(line))) {
      const start = parseInt(lines[0], 10);
      return (
        <ol key={i} start={start === 1 ? undefined : start}>
          {lines.map((line, j) => (
            <li key={j}>{renderInline(line.replace(/^\d+\. /, ''))}</li>
          ))}
        </ol>
      );
    }

    // Single newlines inside a paragraph are soft wraps, not breaks
    return <p key={i}>{renderInline(lines.join(' '))}</p>;
  });
};
