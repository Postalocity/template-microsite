import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { useBrand, useBrandName } from '@/contexts';

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
        secondaryTagline?: string;
        disclaimer?: string;
        links?: Array<{ label: string; href: string }>;
        quickLinks?: Array<{ label: string; href: string }>;
        resourceLinks?: Array<{ label: string; href: string }>;
        companyLinks?: Array<{ label: string; href: string }>;
      };
    };
    footer?: {
      finalCTA?: {
        headline?: string;
        description?: string;
        buttonText?: string;
        href?: string;
      };
      tagline?: string;
      secondaryTagline?: string;
      links?: Array<{ label: string; href: string }>;
      quickLinks?: Array<{ label: string; href: string }>;
      companyLinks?: Array<{ label: string; href: string }>;
    };
  };
}

const SiteFooter = ({ config }: SiteFooterProps) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Get brand config from context
  const ctx = useBrand();
  const brandName = useBrandName();
  
  // Support both config.footer and config.content.footer structures
  const content = config?.content?.footer || config?.footer;
  const brandFooter = ctx.brand.footer;
  
  // Build CTA URL with promo code from context
  const getCTAUrl = () => {
    const baseUrl = ctx.brand.urls.app.replace(/\?.*$/, ''); // Remove existing query
    const promo = ctx.promoCode;
    return promo ? `${baseUrl}?signUp=true&promo=${promo}` : `${baseUrl}?signUp=true`;
  };
  
  // Build default CTA with brand URL and promo code
  const defaultCTA = {
    headline: content?.finalCTA?.headline || 'Ready to Automate Your Mail Processing?',
    description: content?.finalCTA?.description || 'No contracts, no setup fees—just effortless automation.',
    buttonText: content?.finalCTA?.buttonText || 'Sign Up Now',
    href: content?.finalCTA?.href || getCTAUrl(),
  };

  // Format phone for tel: link
  const phoneLink = ctx.contact.phone.replace(/[^0-9]/g, '');
  const legalLinks = content?.links || config?.footer?.links;

  // Quick links - from config, brand config, or defaults
  const quickLinks = content?.quickLinks || brandFooter?.links || [
    { label: 'Print', href: ctx.brand.urls.website },
    { label: 'Mail', href: ctx.brand.urls.website },
    { label: 'Promo', href: ctx.brand.urls.website },
  ];

  // Company links - from config, brand config, or defaults
  const resourceLinks = content?.resourceLinks || brandFooter?.resourceLinks;
  const companyLinks = content?.companyLinks || brandFooter?.companyLinks || [
    { label: 'About', href: ctx.brand.urls.whoWeServe || ctx.brand.urls.website },
    { label: 'Contact', href: ctx.brand.urls.contact || ctx.brand.urls.website },
  ];

  // Support links - for brands that have support menu items (like Odin's)
  const supportLinks = content?.supportLinks || brandFooter?.supportLinks;

  return (
    <footer style={{ backgroundColor: '#333333' }} className="text-background" role="contentinfo">
      {/* Final CTA */}
      <div className="section-container py-16 text-center border-b border-background/10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {defaultCTA.headline}
        </h2>
        {defaultCTA.description && (
          <p className="text-background/70 text-lg mb-8 max-w-2xl mx-auto">
            {defaultCTA.description}
          </p>
        )}
        <a
          href={defaultCTA.href}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-cta-gold text-lg"
        >
          {defaultCTA.buttonText}
        </a>
        {content?.disclaimer && (
          <p className="text-background/40 text-xs mt-6">
            {content.disclaimer}
          </p>
        )}
      </div>

      <div className="section-container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-3">{brandName}</h3>
            {content?.description && (
              <p className="text-background/60 text-sm leading-relaxed">
                {content.description}
              </p>
            )}
            <p className="text-background/70 text-sm mt-2">
              {content?.tagline || brandFooter?.tagline || ctx.brand.tagline}
            </p>
            {(content?.secondaryTagline || brandFooter?.secondaryTagline) && (
              <p className="text-background/50 text-xs mt-2 italic">
                {content?.secondaryTagline || brandFooter?.secondaryTagline}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources or Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">
              {resourceLinks ? 'Resources' : 'Company'}
            </h3>
            <ul className="space-y-2 text-sm">
              {(resourceLinks || companyLinks).map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>



          {/* Support or Contact */}
          <div>
            {supportLinks ? (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">Support</h3>
                <ul className="space-y-2 text-sm">
                  {supportLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-background/70">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${phoneLink}`} className="hover:text-background transition-colors">{ctx.contact.phone}</a>
                  </li>
                  <li className="flex items-center gap-2 text-background/70">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${ctx.contact.email}`} className="hover:text-background transition-colors">{ctx.contact.email}</a>
                  </li>
                  <li className="flex items-start gap-2 text-background/70 mt-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>
                      {ctx.contact.address.street}
                      <br />
                      {ctx.contact.address.city}, {ctx.contact.address.state} {ctx.contact.address.zip}
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* Connect - Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">Connect</h3>
            <div className="flex gap-4">
              {ctx.social.instagram && (
                <a href={ctx.social.instagram} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.132 4.602.402 3.585 1.42 2.568 2.437 2.298 3.61 2.238 4.888 2.18 6.168 2.166 6.577 2.166 12c0 5.423.014 5.832.072 7.112.06 1.278.33 2.451 1.347 3.468.986.986 2.159 1.256 3.437 1.316 1.28.058 1.689.072 7.112.072s5.832-.014 7.112-.072c1.278-.06 2.451-.33 3.437-1.316.986-.986 1.256-2.159 1.316-3.437.058-1.28.072-1.689.072-7.112S23.986 8.332 23.928 7.052c-.06-1.278-.33-2.451-1.316-3.437C21.626 2.602 20.453 2.332 19.175 2.272 17.895 2.214 17.486 2.2 12 2.2z"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
              )}
              {ctx.social.facebook && (
                <a href={ctx.social.facebook} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {ctx.social.linkedin && (
                <a href={ctx.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {ctx.social.tiktok && (
                <a href={ctx.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.8a4.84 4.84 0 0 1-1-.11z"/></svg>
                </a>
              )}
              {ctx.social.youtube && (
                <a href={ctx.social.youtube} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-background/10 gap-4">
          <div className="text-center sm:text-left">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {legalLinks && legalLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 mt-2 text-sm">
                {legalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    rel="noopener noreferrer"
                    className="text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-background" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
