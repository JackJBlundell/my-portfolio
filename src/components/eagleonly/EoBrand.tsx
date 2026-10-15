import React from 'react';
import { EO_ICON } from '../../data/eagleonly';
import './eagleonly.css';

// The EagleOnly icon: a white eagle carrying a golf club on green. Decorative wherever it sits
// beside the EagleOnly name, so it has empty alt text.
export const EoIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <img src={EO_ICON} alt="" className="eo-icon-mark" width={size} height={size} />
);

interface EoWordmarkProps {
  // 'lg' is for page heroes, 'sm' for the sub-navigation
  size?: 'sm' | 'lg';
  // Hide the icon where it would repeat one already on screen
  showIcon?: boolean;
}

// "EagleOnly" in the brand serif, with "by Blundell Technologies" beneath in gold
export const EoWordmark: React.FC<EoWordmarkProps> = ({ size = 'sm', showIcon = true }) => (
  <span className={`eo-wordmark eo-wordmark-${size}`}>
    {showIcon && <EoIcon size={size === 'lg' ? 60 : 36} />}
    <span className="eo-wordmark-text">
      <span className="eo-wordmark-name">EagleOnly</span>
      <span className="eo-wordmark-by">by Blundell Technologies</span>
    </span>
  </span>
);
