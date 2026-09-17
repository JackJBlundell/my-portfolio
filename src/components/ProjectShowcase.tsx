import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ShowcaseProject {
  id: string;
  slug: string;
  name: string;
  description_short: string;
  tech: string[];
  media: {
    images: string[];
    alts?: string[];
  };
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
}

const SWIPE_THRESHOLD_PX = 50;

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [tabOverflow, setTabOverflow] = useState({ left: false, right: false });
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const hasSwitched = useRef(false);

  const project = projects[projectIndex];
  const images = project.media.images;

  // Offscreen slides only start loading once the slider is close to the viewport
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || isNearViewport) return;
    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [isNearViewport]);

  // The tab strip scrolls sideways when the projects don't fit; the arrows only show
  // in a direction there is actually something to scroll to.
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    const update = () => {
      const max = tabs.scrollWidth - tabs.clientWidth;
      setTabOverflow({ left: tabs.scrollLeft > 1, right: tabs.scrollLeft < max - 1 });
    };

    update();
    tabs.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = 'ResizeObserver' in window ? new ResizeObserver(update) : null;
    observer?.observe(tabs);

    return () => {
      tabs.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [projects.length]);

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

  // Centre the selected tab, scrolling the strip only — never the page
  useEffect(() => {
    const tabs = tabsRef.current;
    const tab = tabs?.children[projectIndex] as HTMLElement | undefined;
    if (!tabs || !tab || !hasSwitched.current) return;
    tabs.scrollTo({
      left: tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [projectIndex]);

  const scrollTabs = (direction: 1 | -1) => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    tabs.scrollBy({
      left: direction * tabs.clientWidth * 0.8,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const selectProject = (index: number) => {
    hasSwitched.current = true;
    setProjectIndex(index);
    setImageIndex(0);
  };

  const showImage = (index: number) => {
    setImageIndex((index + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') showImage(imageIndex - 1);
    if (e.key === 'ArrowRight') showImage(imageIndex + 1);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const deltaX = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    showImage(deltaX < 0 ? imageIndex + 1 : imageIndex - 1);
  };

  return (
    <div className="showcase">
      <div
        ref={stageRef}
        className="showcase-stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${project.name} screenshots`}
        onKeyDown={handleKeyDown}
        onPointerDown={(e) => {
          // A drag that starts on the overlaid controls isn't a swipe
          const onControls = (e.target as HTMLElement).closest(
            '.showcase-tabs-wrap, .showcase-controls'
          );
          pointerStartX.current = onControls ? null : e.clientX;
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
      >
        <div
          key={project.id}
          className="showcase-track"
          style={{ transform: `translateX(-${imageIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={src} className="showcase-slide" aria-hidden={index !== imageIndex}>
              <img
                src={src}
                alt={project.media.alts?.[index] ?? `${project.name} screenshot ${index + 1}`}
                width={1600}
                height={900}
                loading={isNearViewport ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Gradients beneath the overlaid controls, so they stay legible over any screenshot */}
        <div className="showcase-scrim showcase-scrim-top" aria-hidden="true" />
        <div className="showcase-scrim showcase-scrim-bottom" aria-hidden="true" />

        <div className="showcase-tabs-wrap">
          <nav className="showcase-tabs" ref={tabsRef} aria-label="Projects">
            {projects.map((p, index) => (
              <Link
                key={p.id}
                to={`/projects/${p.slug}`}
                className={`showcase-tab ${index === projectIndex ? 'active' : ''}`}
                aria-current={index === projectIndex ? 'true' : undefined}
                onClick={(e) => {
                  // Plain clicks switch the slider; modified clicks still open the case study
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  selectProject(index);
                }}
              >
                {p.name}
              </Link>
            ))}
          </nav>

          {tabOverflow.left && (
            <button
              type="button"
              className="showcase-tabs-scroll prev"
              onClick={() => scrollTabs(-1)}
              aria-label="Scroll projects left"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {tabOverflow.right && (
            <button
              type="button"
              className="showcase-tabs-scroll next"
              onClick={() => scrollTabs(1)}
              aria-label="Scroll projects right"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div className="showcase-controls">
            <button
              className="showcase-arrow"
              onClick={() => showImage(imageIndex - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="showcase-indicators">
              {images.map((src, index) => (
                <button
                  key={src}
                  className={`showcase-indicator ${index === imageIndex ? 'active' : ''}`}
                  onClick={() => showImage(index)}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-current={index === imageIndex ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              className="showcase-arrow"
              onClick={() => showImage(imageIndex + 1)}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Overlays the bottom-right of the stage on desktop; sits beneath it on mobile */}
      <div key={project.id} className="showcase-info">
        <h3>{project.name}</h3>
        <p>{project.description_short}</p>
        <div className="showcase-tags">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <Link to={`/projects/${project.slug}`} className="btn btn-primary">
          View Case Study <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectShowcase;
