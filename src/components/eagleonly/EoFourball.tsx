import React from 'react';
import { useInView } from './EoReveal';

// OpenTee in one picture: a two-ball on the tee sheet, then the same slot after two golfers join.
// The joining players drop in once the card scrolls into view (see .eo-fourball.is-visible in App.css).
const EoFourball: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`eo-fourball ${inView ? 'is-visible' : ''}`}
      role="img"
      aria-label="A two-ball tee time opened with OpenTee becomes a four-ball when two more golfers join"
    >
      <div className="eo-fourball-slot">
        <span className="eo-fourball-time">08:20</span>
        <div className="eo-fourball-players">
          <span className="filled">JB</span>
          <span className="filled">RT</span>
          <span className="empty" />
          <span className="empty" />
        </div>
        <span className="eo-fourball-label">Two-ball</span>
      </div>

      <div className="eo-fourball-connector">
        <span>Opened with OpenTee</span>
      </div>

      <div className="eo-fourball-slot eo-fourball-after">
        <span className="eo-fourball-time">08:20</span>
        <div className="eo-fourball-players">
          <span className="filled">JB</span>
          <span className="filled">RT</span>
          <span className="joined">+1</span>
          <span className="joined">+1</span>
        </div>
        <span className="eo-fourball-label">Four-ball</span>
      </div>

      <div className="eo-fourball-result">
        <strong>Same slot</strong>
        <span>More green fees</span>
      </div>
    </div>
  );
};

export default EoFourball;
