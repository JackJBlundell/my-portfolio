import React from 'react';
import { Check, Users } from 'lucide-react';

// A drawn member app for an example club. It deliberately uses the club's colours rather than
// EagleOnly's, because that is the point: members only ever see their own club.
const TEE_TIMES = [
  { time: '08:10', players: 4, open: 0 },
  { time: '08:20', players: 2, open: 2 },
  { time: '08:30', players: 3, open: 1 },
  { time: '08:40', players: 0, open: 0 },
];

interface EoPhoneMockupProps {
  // Floating notification cards beside the phone, for heroes with room around them
  withChips?: boolean;
}

const EoPhoneMockup: React.FC<EoPhoneMockupProps> = ({ withChips = false }) => (
  <div className={`eo-phone-stage ${withChips ? 'with-chips' : ''}`}>
    <div
      className="eo-phone"
      role="img"
      aria-label="Example of a club's own member app showing the tee sheet and OpenTee places"
    >
      <div className="eo-phone-screen">
        <div className="eo-phone-status" aria-hidden="true">
          <span>9:41</span>
          <span className="eo-phone-notch" />
          <span className="eo-phone-signal" />
        </div>

        <div className="eo-phone-header">
          <span className="eo-phone-crest">YC</span>
          <div>
            <strong>Your Golf Club</strong>
            <span>Saturday 14 March</span>
          </div>
        </div>

        <div className="eo-phone-banner">
          <span>Course open</span>
          <span>Buggies allowed</span>
        </div>

        <ul className="eo-phone-times">
          {TEE_TIMES.map((slot) => (
            <li key={slot.time}>
              <span className="eo-phone-time">{slot.time}</span>
              <span className="eo-phone-dots" aria-hidden="true">
                {Array.from({ length: 4 }, (_, i) => (
                  <span key={i} className={i < slot.players ? 'filled' : ''} />
                ))}
              </span>
              {slot.open > 0 ? (
                <span className="eo-phone-open">Join · {slot.open}</span>
              ) : slot.players === 0 ? (
                <span className="eo-phone-book">Book</span>
              ) : (
                <span className="eo-phone-full">Full</span>
              )}
            </li>
          ))}
        </ul>

        <div className="eo-phone-tabs" aria-hidden="true">
          <span className="active">Tee times</span>
          <span>Comps</span>
          <span>Bar</span>
          <span>Feed</span>
        </div>
      </div>
    </div>

    {withChips && (
      <>
        <div className="eo-chip eo-chip-top" aria-hidden="true">
          <span className="eo-chip-icon">
            <Users size={16} />
          </span>
          <span>
            <strong>OpenTee</strong>
            Two golfers joined the 08:20
          </span>
        </div>
        <div className="eo-chip eo-chip-bottom" aria-hidden="true">
          <span className="eo-chip-icon eo-chip-icon-gold">
            <Check size={16} />
          </span>
          <span>
            <strong>£45.00 green fee</strong>
            Paid to the club
          </span>
        </div>
      </>
    )}
  </div>
);

export default EoPhoneMockup;
