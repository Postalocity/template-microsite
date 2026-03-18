import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { useBrand, useBrandName } from '@/contexts';

interface SiteFooterProps {
  config?: {
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
    };
  };
}

const SiteFooter = ({ config }: SiteFooterProps) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Get brand config from context
  const ctx = useBrand();
  const brandName = useBrandName();
  
  const content = config?.footer;
  
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
  const formattedAddress = `${ctx.contact.address.street}, ${ctx.contact.address.city}, ${ctx.contact.address.state} ${ctx.contact.address.zip}`;

  return (
    <footer style={{ backgroundColor: '#333333' }} className="text-background" role="contentinfo">
      {/* Final CTA */}
      <div className="section-container py-16 text-center border-b border-background/10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {defaultCTA.headline}
        </h2>
        <p className="text-background/70 text-lg mb-8 max-w-2xl mx-auto">
          {defaultCTA.description}
        </p>
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
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-3">{brandName}</h3>
            <p className="text-background/60 text-sm leading-relaxed">
              {content?.description || 'Streamline workflows, boost visibility, ensure accuracy, reduce overhead—no monthly fees, pay-as-you-go.'}
            </p>
            <p className="text-background/50 text-xs mt-3 italic">
              {content?.tagline || ctx.brand.tagline || 'Empowering Businesses with Reliable Automation'}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={ctx.brand.urls.howWeHelp || ctx.brand.urls.website} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">How We Help</a></li>
              <li><a href={ctx.brand.urls.whoWeServe || ctx.brand.urls.website} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">Who We Serve</a></li>
              <li><a href={ctx.brand.urls.app} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">Sign Up</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={ctx.brand.urls.blog || ctx.brand.urls.website} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">Blog</a></li>
              <li><a href={ctx.brand.urls.faq || ctx.brand.urls.website} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">FAQ</a></li>
              <li><a href={ctx.brand.urls.contact || ctx.brand.urls.website} rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
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
                <span>{formattedAddress}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/60">Connect</h3>
            <div className="flex gap-4">
              {ctx.social.twitter && (
                <a href={ctx.social.twitter} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              {ctx.social.linkedin && (
                <a href={ctx.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {ctx.social.facebook && (
                <a href={ctx.social.facebook} target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-background/10 gap-4">
          <div>
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {content?.disclaimer && (
              <p className="text-background/40 text-xs mt-2">
                {content.disclaimer}
              </p>
            )}
            {content?.links && content.links.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-3">
                {content.links.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/50 text-xs hover:text-background/70 transition-colors"
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
