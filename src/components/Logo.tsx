import React from 'react';

interface LogoProps {
  // 'auto' follows the site theme; 'on-dark' is for areas that are always dark, like the footer
  variant?: 'auto' | 'on-dark';
}

const Logo: React.FC<LogoProps> = ({ variant = 'auto' }) => (
  <span className={`brand-logo brand-logo-${variant}`}>
    {variant === 'auto' && (
      <img
        src="/img/brand/logo-on-light.png"
        alt="Blundell Technologies"
        className="brand-logo-light"
        width={440}
        height={222}
      />
    )}
    <img
      src="/img/brand/logo-on-dark.png"
      alt="Blundell Technologies"
      className="brand-logo-dark"
      width={440}
      height={213}
    />
  </span>
);

export default Logo;
