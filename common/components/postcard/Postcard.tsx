/**
 * Postcard Print Component
 * 
 * Dimensions: 4.25" x 6.25" (4x6 with 1/8" bleed on each side)
 * 
 * Print instructions:
 * - Set paper size to letter or custom 4.25" x 6.25"
 * - Turn off headers/footers
 * - Use "Actual size" or "Scale: 100%"
 * - For PDF export: File > Print > Save as PDF
 */

import React from 'react';

interface PostcardProps {
  /** Front or back of postcard */
  side: 'front' | 'back';
  /** Logo URL */
  logoUrl?: string;
  /** Company name */
  companyName?: string;
  /** Tagline */
  tagline?: string;
  /** Website */
  website?: string;
  /** Phone */
  phone?: string;
  /** Address */
  address?: string;
  /** Headline for front */
  headline?: string;
  /** Subheadline for front */
  subheadline?: string;
  /** Message/body text for back */
  message?: string;
  /** Call to action */
  cta?: string;
}

const defaultProps = {
  logoUrl: '/logo.png',
  companyName: 'Postalocity',
  tagline: 'Professional Mailing Services',
  website: 'postalocity.com',
  phone: '316-260-2220',
  address: '820 W 2nd St N, Wichita KS 67203',
  headline: 'Make Your Conference Connections Count',
  subheadline: 'Follow up with professional postcard mailing. Stand out from the crowd.',
  message: 'Thank you for connecting with us at the conference. We look forward to helping you streamline your mailing needs.',
  cta: 'Visit postalocity.com to get started',
};

/**
 * PostcardFront - The front side with branding and headline
 */
export const PostcardFront: React.FC<Partial<PostcardProps>> = ({
  logoUrl = defaultProps.logoUrl,
  companyName = defaultProps.companyName,
  tagline = defaultProps.tagline,
  headline = defaultProps.headline,
  subheadline = defaultProps.subheadline,
}) => {
  return (
    <div className="postcard postcard-front">
      {/* Bleed area */}
      <div className="bleed-area">
        {/* Safe area */}
        <div className="safe-area">
          {/* Header with logo */}
          <div className="header">
            <img src={logoUrl} alt={companyName} className="logo" />
            <div className="brand">
              <span className="company-name">{companyName}</span>
              <span className="tagline">{tagline}</span>
            </div>
          </div>
          
          {/* Main content */}
          <div className="content">
            <h1 className="headline">{headline}</h1>
            <p className="subheadline">{subheadline}</p>
          </div>
          
          {/* Decorative element */}
          <div className="decoration">
            <div className="accent-line"></div>
          </div>
        </div>
        
        {/* Crop marks */}
        <div className="crop-mark top-left"></div>
        <div className="crop-mark top-right"></div>
        <div className="crop-mark bottom-left"></div>
        <div className="crop-mark bottom-right"></div>
      </div>
    </div>
  );
};

/**
 * PostcardBack - The back side with address and message
 */
export const PostcardBack: React.FC<Partial<PostcardProps>> = ({
  logoUrl = defaultProps.logoUrl,
  companyName = defaultProps.companyName,
  website = defaultProps.website,
  phone = defaultProps.phone,
  address = defaultProps.address,
  message = defaultProps.message,
  cta = defaultProps.cta,
}) => {
  return (
    <div className="postcard postcard-back">
      {/* Bleed area */}
      <div className="bleed-area">
        {/* Safe area */}
        <div className="safe-area">
          {/* Left section - Message */}
          <div className="message-section">
            <p className="message">{message}</p>
            <p className="cta">{cta}</p>
          </div>
          
          {/* Right section - Address & Contact */}
          <div className="contact-section">
            <div className="address-block">
              <img src={logoUrl} alt={companyName} className="logo-small" />
              <div className="address">
                <span className="website">{website}</span>
                <span className="phone">{phone}</span>
                <span className="address-line">{address}</span>
              </div>
            </div>
            
            {/* Postal indicia area */}
            <div className="postal-area">
              <div className="postal-mark">
                <span className="presort">PRESORTED</span>
                <span className="permit">FIRST CLASS MAIL</span>
                <span className="permit-no">PERMIT NO. 1234</span>
                <span className="city">WICHITA KS 67203</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Crop marks */}
        <div className="crop-mark top-left"></div>
        <div className="crop-mark top-right"></div>
        <div className="crop-mark bottom-left"></div>
        <div className="crop-mark bottom-right"></div>
      </div>
    </div>
  );
};

/**
 * Postcard - Combined front and back for printing
 */
export const Postcard: React.FC<PostcardProps> = (props) => {
  return (
    <div className="postcard-container">
      <PostcardFront {...props} side="front" />
      <PostcardBack {...props} side="back" />
    </div>
  );
};

export default Postcard;
