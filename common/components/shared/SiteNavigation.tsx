import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand, useBrandName } from '@/contexts';

// Helper to check if dark logo exists for a brand
function useDarkLogoExists(slug: string): boolean {
  const [exists, setExists] = useState(false);
  
  useEffect(() => {
    // Try to load the dark logo
    const img = new Image();
    img.onload = () => setExists(true);
    img.onerror = () => setExists(false);
    img.src = `/${slug}/logo-dark.png`;
  }, [slug]);
  
  return exists;
}

type NavConfig = {
  site?: {
    slug?: string;
  };
  navigation?: {
    links?: Array<{ label: string; href: string }>;
    cta?: {
      text: string;
      href: string;
      variant?: string;
    };
    serviceLinks?: Array<{ label: string; href: string }>;
    companyLinks?: Array<{ label: string; href: string }>;
  };
  branding?: {
    tagline?: string;
    logo?: string;
  };
};

const defaultNavLinks = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
];

interface SiteNavigationProps {
  config?: NavConfig;
}

const SiteNavigation = ({ config }: SiteNavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  // Get brand config from context
  const ctx = useBrand();
  const brandName = useBrandName();
  
  // Check if dark logo exists for this brand
  const siteSlug = config?.site?.slug || '';
  const hasDarkLogo = useDarkLogoExists(siteSlug);
  
  const navLinks = config?.navigation?.links ?? defaultNavLinks;
  const cta = config?.navigation?.cta;
  const serviceLinks = config?.navigation?.serviceLinks;
  const companyLinks = config?.navigation?.companyLinks;
  
  // Get promo code from brand context
  const promoCode = ctx.promoCode;
  
  // Extract promo code from CTA href if present
  const ctaHref = cta?.href || '';
  let extractedPromoCode = promoCode;
  if (ctaHref.includes('promo=')) {
    const parts = ctaHref.split('promo=');
    const nextPart = parts[1]?.split('&')[0];
    if (nextPart) {
      extractedPromoCode = nextPart;
    }
  }

  // Build signup URL with promo code
  const getSignupUrl = () => {
    const baseUrl = ctx.brand.urls.app.replace(/\?.*$/, '');
    return extractedPromoCode
      ? `${baseUrl}?signUp=true&promo=${extractedPromoCode}`
      : `${baseUrl}?signUp=true`;
  };

  // Handle smooth scroll to section when link is clicked
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 80; // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Check if this is a multi-service brand (has service links)
  const hasMultiService = serviceLinks && serviceLinks.length > 0;
  const hasCompany = companyLinks && companyLinks.length > 0;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-md shadow-card border-b border-border'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className={`section-container flex items-center justify-between ${
        ctx.brand.footer?.logoSize === 'extra-large' ? 'h-24 lg:h-32' : 
        ctx.brand.footer?.logoSize === 'large' ? 'h-22 lg:h-28' : 
        'h-20 lg:h-24'
      }`}>
        <a
          href={ctx.brand.urls.website}
          aria-label={`${brandName} home`}
          className="flex items-center"
        >
          {/* Logo: dynamic size based on brand config, larger for better visibility */}
          <div className={`relative ${
            ctx.brand.footer?.logoSize === 'extra-large' ? 'h-20 lg:h-28 w-[280px] lg:w-[360px]' : 
            ctx.brand.footer?.logoSize === 'large' ? 'h-16 lg:h-24 w-[240px] lg:w-[320px]' : 
            'h-12 lg:h-16 w-[180px] lg:w-[240px]'
          }`}>
            {hasDarkLogo ? (
              // Dual logos: switch on scroll (logo.png = dark, logo-dark.png = light)
              <>
                <img
                  src={`/${siteSlug}/logo.png`}
                  alt={brandName}
                  className={`h-full w-full object-contain transition-opacity duration-300 ${
                    scrolled ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <img
                  src={`/${siteSlug}/logo-dark.png`}
                  alt={brandName}
                  className={`h-full w-full object-contain absolute inset-0 transition-opacity duration-300 ${
                    scrolled ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </>
            ) : (
              // Single logo: always show, invert colors when on dark background
              <img
                src={`/${siteSlug}/logo.png`}
                alt={brandName}
                className={`h-full w-full object-contain transition-all duration-300 ${
                  scrolled ? '' : 'brightness-0 invert'
                }`}
              />
            )}
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Service Links Dropdown (for multi-service brands) */}
          {hasMultiService && (
            <div className="relative">
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Services
                <ChevronDown size={14} strokeWidth={2} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 py-2 bg-card rounded-lg shadow-card border border-border"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {serviceLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Page links */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? 'text-foreground' : 'text-hero-subtitle hover:text-hero-foreground'
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Company Links Dropdown */}
          {hasCompany && (
            <div className="relative">
              <button
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
                className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary"
                style={{ 
                  color: scrolled ? undefined : 'hsl(var(--hero-subtitle))',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0 
                }}
              >
                Company
                <ChevronDown size={14} strokeWidth={2} />
              </button>
              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-44 py-2 bg-card rounded-lg shadow-card border border-border"
                    onMouseEnter={() => setCompanyOpen(true)}
                    onMouseLeave={() => setCompanyOpen(false)}
                  >
                    {companyLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* CTA */}
          {cta ? (
            <a
              href={cta.href}
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg btn-cta-gold text-sm"
            >
              {cta.text}
            </a>
          ) : (
            <a
              href={getSignupUrl()}
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg btn-cta-gold text-sm"
            >
              Sign Up Now
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-foreground' : 'text-hero-foreground'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-3">
              {/* Service Links (mobile) */}
              {hasMultiService && (
                <div className="pb-3 border-b border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Services
                  </p>
                  {serviceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Page links */}
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleLinkClick(e, link.href);
                    setMobileOpen(false);
                  }}
                  className="text-foreground text-sm font-medium py-2 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Company Links (mobile) */}
              {hasCompany && (
                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Company
                  </p>
                  {companyLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* CTA */}
              {cta ? (
                <a
                  href={cta.href}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg btn-cta-gold text-sm mt-2"
                >
                  {cta.text}
                </a>
              ) : (
                <a
                  href={getSignupUrl()}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg btn-cta-gold text-sm mt-2"
                >
                  Sign Up Now
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SiteNavigation;
