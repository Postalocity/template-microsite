import { useBrand, useBrandName } from '@/contexts';
import { Instagram, Mail, Phone } from 'lucide-react';

interface FooterData {
  finalCTA?: {
    headline?: string;
    description?: string;
    buttonText?: string;
    href?: string;
  };
  tagline?: string;
  description?: string;
  disclaimer?: string;
  links?: Array<{ label: string; href: string }>;
  quickLinks?: Array<{ label: string; href: string }>;
  companyLinks?: Array<{ label: string; href: string }>;
  supportLinks?: Array<{ label: string; href: string }>;
  taglineSecondary?: string;
}

interface SiteFooterProps {
  config?: {
    content?: {
      footer?: Partial<FooterData>;
    };
    footer?: Partial<FooterData>;
  };
}

const SiteFooter = ({ config }: SiteFooterProps) => {
  const ctx = useBrand();
  const brandName = useBrandName();
  
  const content = config?.content?.footer || config?.footer;
  const brandFooter = ctx.brand.footer as FooterData | undefined;
  
  // Merge: brand footer as base, page config can override CTA and tagline
  const footerData: FooterData = {
    ...(brandFooter || {}),
    ...(content || {}),
  };

  const getCTAUrl = () => {
    const baseUrl = ctx.brand.urls.app.replace(/\?.*$/, '');
    const promo = ctx.promoCode;
    return promo ? `${baseUrl}?signUp=true&promo=${promo}` : `${baseUrl}?signUp=true`;
  };

  const defaultCTA = {
    headline: footerData?.finalCTA?.headline || 'Ready for Your Best Season?',
    description: footerData?.finalCTA?.description || 'Order now and get consistent, weatherproof attraction that lasts 30+ days.',
    buttonText: footerData?.finalCTA?.buttonText || 'Shop Scent Beads',
    href: footerData?.finalCTA?.href || getCTAUrl(),
  };

  // Use footerData for links, fallback to brandFooter, then defaults
  const quickLinks = footerData?.quickLinks || footerData?.links || brandFooter?.links || [
    { label: 'Scent Beads', href: 'https://www.odinsinnovations.com/collections/scent-beads' },
    { label: 'Liquid Scents', href: 'https://www.odinsinnovations.com/collections/liquid-scents' },
    { label: "Hunter's Kloak", href: 'https://www.odinsinnovations.com/collections/all-hunters-kloak' },
    { label: 'Find a Dealer', href: 'https://www.odinsinnovations.com/pages/find-a-dealer' },
  ];

  const companyLinks = footerData?.companyLinks || brandFooter?.companyLinks || [
    { label: 'About Us', href: 'https://www.odinsinnovations.com/pages/about-us' },
    { label: 'Press Releases', href: 'https://www.odinsinnovations.com/blogs/press-releases' },
    { label: 'Field Test Reports', href: 'https://www.odinsinnovations.com/blogs/field-test-reports' },
    { label: 'Industry Publications', href: 'https://www.odinsinnovations.com/blogs/in-the-field' },
  ];

  // Support links from footerData or brand
  const supportLinks = footerData?.supportLinks || brandFooter?.supportLinks;

  return (
    <footer 
      className="text-white" 
      style={{ background: 'hsl(var(--primary))' }} 
      role="contentinfo"
    >
      {/* Final CTA */}
      <div className="section-container py-16 border-b" style={{ borderColor: 'hsl(var(--primary) / 0.8)' }}>
        <div className="max-w-2xl">
          <p className="uppercase-tracked mb-3" style={{ color: 'hsl(var(--accent))' }}>
            Get Started
          </p>
          <h2 className="mb-4" style={{ color: 'white' }}>
            {defaultCTA.headline}
          </h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
            {defaultCTA.description}
          </p>
          <a
            href={defaultCTA.href}
            rel="noopener noreferrer"
            className="btn-accent text-base px-8 py-4 inline-block"
          >
            {defaultCTA.buttonText}
          </a>
          {footerData?.disclaimer && (
            <p className="text-xs mt-6 italic" style={{ color: 'hsl(0 0% 100% / 0.4)' }}>
              {footerData.disclaimer}
            </p>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="section-container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-3" style={{ color: 'white' }}>
              {brandName}
            </h3>
            {(footerData?.description || footerData?.tagline) && (
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'hsl(0 0% 100% / 0.6)' }}>
                {footerData.description || footerData.tagline}
              </p>
            )}
            <p className="text-xs italic" style={{ color: 'hsl(0 0% 100% / 0.4)' }}>
              {footerData?.tagline || brandFooter?.tagline || ctx.brand.tagline}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase-tracked mb-3" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase-tracked mb-3" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support - replaces Contact */}
          <div>
            {supportLinks ? (
              <>
                <h3 className="text-sm font-bold uppercase-tracked mb-3" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
                  Support
                </h3>
                <ul className="space-y-2 text-sm">
                  {supportLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-sm font-bold uppercase-tracked mb-3" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
                  Contact
                </h3>
                <ul className="space-y-2 text-sm">
                  {ctx.contact.phone && (
                    <li className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ color: 'hsl(0 0% 100% / 0.6)' }} />
                      <a href={`tel:${ctx.contact.phone.replace(/[^0-9]/g, '')}`} className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                        {ctx.contact.phone}
                      </a>
                    </li>
                  )}
                  {ctx.contact.email && (
                    <li className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: 'hsl(0 0% 100% / 0.6)' }} />
                      <a href={`mailto:${ctx.contact.email}`} className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                        {ctx.contact.email}
                      </a>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
          
          {/* Connect - Social */}
          <div>
            <h3 className="text-sm font-bold uppercase-tracked mb-3" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
              Connect
            </h3>
            <div className="flex gap-3">
              {ctx.social?.instagram && (
                <a href={ctx.social.instagram} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                  <Instagram size={20} strokeWidth={2} />
                </a>
              )}
              {ctx.social?.facebook && (
                <a href={ctx.social.facebook} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              )}
              {ctx.social?.linkedin && (
                <a href={ctx.social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              )}
              {ctx.social?.youtube && (
                <a href={ctx.social.youtube} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.5 6.5C2.5 4.84315 3.84315 3.5 5.5 3.5H18.5C20.1569 3.5 21.5 4.84315 21.5 6.5V17.5C21.5 19.1569 20.1569 20.5 18.5 20.5H5.5C3.84315 20.5 2.5 19.1569 2.5 17.5V6.5Z"/>
                    <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="black"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t gap-4" style={{ borderColor: 'hsl(var(--primary) / 0.8)' }}>
          <p className="text-sm" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          
           {((footerData?.links || brandFooter?.links)?.length ?? 0) > 0 && (
             <div className="flex flex-wrap gap-x-4 gap-y-2">
               {(footerData?.links || brandFooter?.links)?.map((link: { label: string; href: string }) => (
                 <a key={link.href} href={link.href} target={link.label === 'Login' ? '_self' : '_blank'} rel="noopener noreferrer" className="text-xs transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.4)' }}>
                   {link.label}
                 </a>
               ))}
             </div>
           )}
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
