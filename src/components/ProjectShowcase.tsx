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
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);

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

  const selectProject = (index: number) => {
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
      <nav className="showcase-tabs" aria-label="Projects">
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

      <div
        ref={stageRef}
        className="showcase-stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${project.name} screenshots`}
        onKeyDown={handleKeyDown}
        onPointerDown={(e) => {
          pointerStartX.current = e.clientX;
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

        {images.length > 1 && (
          <>
            <button
              className="showcase-arrow showcase-arrow-prev"
              onClick={() => showImage(imageIndex - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="showcase-arrow showcase-arrow-next"
              onClick={() => showImage(imageIndex + 1)}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
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
      )}

      <div key={project.id} className="showcase-info">
        <div>
          <h3>{project.name}</h3>
          <p>{project.description_short}</p>
        </div>
        <div className="showcase-info-actions">
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
    </div>
  );
};

export default ProjectShowcase;
