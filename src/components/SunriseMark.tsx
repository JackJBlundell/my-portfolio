import React from 'react';

/*
  The sunrise from the Blundell Technologies logo, drawn as SVG so it stays crisp at any
  size and costs no extra request — public/img/assets/icon-square.png is the same mark at
  1254px and 372KB, which is far more than a hero eyebrow needs.
*/
const SunriseMark: React.FC<{ className?: string; title?: string }> = ({ className, title }) => (
  <svg
    className={className}
    viewBox="0 0 120 28"
    role={title ? 'img' : 'presentation'}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    focusable="false"
  >
    <defs>
      <linearGradient id="sunrise-mark-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--color-accent-light)" />
        <stop offset="55%" stopColor="var(--color-accent)" />
        <stop offset="100%" stopColor="var(--color-accent-dark)" />
      </linearGradient>
    </defs>
    {/* Sun: a half disc resting just above the horizon */}
    <path d="M41.5 18.9a18.5 18.5 0 0 1 37 0Z" fill="url(#sunrise-mark-gradient)" />
    {/* Horizon: a long lens, thickest at the centre and tapering to points */}
    <path
      d="M1 26.5C34 18.2 86 18.2 119 26.5C86 27.2 34 27.2 1 26.5Z"
      fill="url(#sunrise-mark-gradient)"
    />
  </svg>
);

export default SunriseMark;
