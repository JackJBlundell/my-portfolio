import React, { useEffect, useRef, useState } from 'react';

// react-snap prerenders pages with this user agent. Anything still waiting to fade in would be
// saved as invisible in the snapshot crawlers read, so the prerender always shows everything.
const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

/**
 * True once the element has scrolled into view. Stays true, so things animate in once and stay put.
 * Browsers without IntersectionObserver (and the prerender) report visible straight away.
 */
export const useInView = <T extends Element>(margin = '0px 0px -12% 0px') => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(isPrerender || typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (inView || !node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, margin]);

  return { ref, inView };
};

interface EoRevealProps {
  children: React.ReactNode;
  className?: string;
  // Seconds to wait after coming into view, for staggering a row of cards
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
  id?: string;
}

// Fades and lifts its children in when they scroll into view. The motion itself lives in CSS
// (.eo-reveal), which also switches it off for people who prefer reduced motion.
const EoReveal: React.FC<EoRevealProps> = ({ children, className = '', delay = 0, as = 'div', id }) => {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`eo-reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default EoReveal;
