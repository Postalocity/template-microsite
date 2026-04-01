import { useBrand, useBrandName } from '@/contexts';
import { Instagram } from 'lucide-react';

interface SiteFooterProps {
  config?: {
    content?: {
      footer?: {
        finalCTA?: {
          headline?: string;
          description?: string;
          buttonText?: string;
          href?: string;
          promoCode?: string;
          disclaimer?: string;
        };
        description?: string;
        tagline?: string;
        disclaimer?: string;
        links?: Array<{ label: string; href: string }>;
        quickLinks?: Array<{ label: string; href: string }>;
        companyLinks?: Array<{ label: string; href: string }>;
      };
    };
  };
}

const SiteFooter = ({ config }: SiteFooterProps) => {
  const ctx = useBrand();
  const brandName = useBrandName();
  
  const content = config?.content?.footer || config?.footer;
  const brandFooter = ctx.brand.footer;
  
  const getCTAUrl = () => {
    const baseUrl = ctx.brand.urls.app.replace(/\?.*$/, '');
    const promo = ctx.promoCode;
    return promo ? `${baseUrl}?signUp=true&promo=${promo}` : `${baseUrl}?signUp=true`;
  };
  
  const defaultCTA = {
    headline: content?.finalCTA?.headline || 'Ready for Your Best Season?',
    description: content?.finalCTA?.description || 'Order now and get consistent, weatherproof attraction that lasts 30+ days.',
    buttonText: content?.finalCTA?.buttonText || 'Shop Scent Beads',
    href: content?.finalCTA?.href || getCTAUrl(),
  };

  // Quick links - from config or defaults
  const quickLinks = content?.quickLinks || [
    { label: 'Shop Products', href: ctx.brand.urls.website },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ];

  // Company links - from config or defaults
  const companyLinks = content?.companyLinks || [
    { label: 'About', href: `${ctx.brand.urls.website}/about` },
    { label: 'Contact', href: `${ctx.brand.urls.website}/contact` },
  ];

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
          {content?.disclaimer && (
            <p className="text-xs mt-6 italic" style={{ color: 'hsl(0 0% 100% / 0.4)' }}>
              {content.disclaimer}
            </p>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="section-container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'white' }}>
              {brandName}
            </h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'hsl(0 0% 100% / 0.6)' }}>
              {content?.description || 'High-quality commercial printing with dedicated concierge service.'}
            </p>
            <p className="text-xs italic" style={{ color: 'hsl(0 0% 100% / 0.4)' }}>
              {content?.tagline || brandFooter?.tagline || ctx.brand.tagline}
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
                  <a href={link.href} className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Connect */}
          <div>
            <h3 className="text-sm font-bold uppercase-tracked mb-3" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              {ctx.contact.phone && (
                <li>
                  <a href={`tel:${ctx.contact.phone.replace(/[^0-9]/g, '')}`} className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                    {ctx.contact.phone}
                  </a>
                </li>
              )}
              {ctx.contact.email && (
                <li>
                  <a href={`mailto:${ctx.contact.email}`} className="transition-colors hover:opacity-80" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
                    {ctx.contact.email}
                  </a>
                </li>
              )}
            </ul>
            
            {/* Connect - Social */}
            <div className="mt-4">
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
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t gap-4" style={{ borderColor: 'hsl(var(--primary) / 0.8)' }}>
          <p className="text-sm" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          
          {(content?.links || brandFooter?.links) && (content?.links || brandFooter?.links).length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {(content?.links || brandFooter?.links).map((link: { label: string; href: string }) => (
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
