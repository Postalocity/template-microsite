import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand, useBrandName } from '@/contexts';

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
  
  const siteSlug = config?.site?.slug || '';
  
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        background: scrolled 
          ? 'linear-gradient(to bottom, hsl(35 30% 95% / 0.98), hsl(35 25% 92% / 0.95))' 
          : 'linear-gradient(to bottom, hsl(35 30% 98% / 0.95), hsl(35 25% 95% / 0.8))',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 8px 32px rgb(0 0 0 / 0.3)' : '0 4px 16px rgb(0 0 0 / 0.15)',
        borderBottom: scrolled ? '1px solid hsl(145 45% 38% / 0.3)' : '1px solid hsl(0 0% 100% / 0.05)'
      }}
      aria-label="Main navigation"
    >
      <div className="section-container flex items-center justify-between h-20 lg:h-24">
        <a
          href={ctx.brand.urls.website}
          aria-label={`${brandName} home`}
        >
          {/* Logo: 150x150 for prominent display */}
          <div className="h-[150px] w-[150px] relative">
            <img
              src={ctx.brand.logo.url || `/${siteSlug}/logo.png`}
              alt={ctx.brand.logo.alt || brandName}
              className="h-full w-full object-contain"
            />
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Service Links Dropdown (for multi-service brands) */}
          {hasMultiService && (
            <div className="relative">
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="text-sm font-semibold tracking-wide uppercase flex items-center gap-1 transition-all hover:opacity-100"
                style={{ 
                  color: 'hsl(30 20% 20% / 0.9)',
                  letterSpacing: '0.08em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Services
                <ChevronDown size={14} strokeWidth={2.5} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 py-2"
                    style={{ 
                      background: 'hsl(220 15% 12% / 0.98)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid hsl(220 10% 25%)',
                      boxShadow: '0 8px 32px rgb(0 0 0 / 0.3)'
                    }}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {serviceLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm transition-colors hover:opacity-100"
                        style={{ color: 'hsl(30 20% 20% / 0.9)' }}
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
              className="text-sm font-semibold tracking-wide uppercase transition-all hover:opacity-100"
              style={{ 
                color: 'hsl(30 20% 20% / 0.9)',
                letterSpacing: '0.08em'
              }}
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
                className="text-sm font-semibold tracking-wide uppercase flex items-center gap-1 transition-all hover:opacity-100"
                style={{ 
                  color: 'hsl(30 20% 20% / 0.9)',
                  letterSpacing: '0.08em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Company
                <ChevronDown size={14} strokeWidth={2.5} />
              </button>
              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 py-2"
                    style={{ 
                      background: 'hsl(220 15% 12% / 0.98)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid hsl(220 10% 25%)',
                      boxShadow: '0 8px 32px rgb(0 0 0 / 0.3)'
                    }}
                    onMouseEnter={() => setCompanyOpen(true)}
                    onMouseLeave={() => setCompanyOpen(false)}
                  >
                    {companyLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm transition-colors hover:opacity-100"
                        style={{ color: 'hsl(30 20% 20% / 0.9)' }}
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
              className="btn-accent text-sm px-6 py-3"
              style={{ 
                boxShadow: '0 4px 12px hsl(145 45% 38% / 0.3)',
                borderRadius: '0'
              }}
            >
              {cta.text}
            </a>
          ) : (
            <a
              href={getSignupUrl()}
              rel="noopener noreferrer"
              className="btn-accent text-sm px-6 py-3"
              style={{ 
                boxShadow: '0 4px 12px hsl(145 45% 38% / 0.3)',
                borderRadius: '0'
              }}
            >
              Shop Now
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-3"
          style={{ border: 'none', background: 'transparent', color: 'white' }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
            style={{ 
              background: 'hsl(var(--primary))',
            }}
          >
            <div className="section-container py-4 flex flex-col gap-3">
              {/* Service Links (mobile) */}
              {hasMultiService && (
                <div className="pb-3 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.1)' }}>
                  <p className="text-xs font-bold uppercase-tracked mb-2" style={{ color: 'hsl(30 20% 30% / 0.7)' }}>
                    Services
                  </p>
                  {serviceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-medium"
                      style={{ color: 'hsl(30 20% 25% / 0.85)' }}
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
                <div className="pt-3 border-t" style={{ borderColor: 'hsl(0 0% 100% / 0.1)' }}>
                  <p className="text-xs font-bold uppercase-tracked mb-2" style={{ color: 'hsl(30 20% 30% / 0.7)' }}>
                    Company
                  </p>
                  {companyLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-medium"
                      style={{ color: 'hsl(30 20% 25% / 0.85)' }}
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
                  className="btn-accent text-sm mt-2"
                >
                  {cta.text}
                </a>
              ) : (
                <a
                  href={getSignupUrl()}
                  rel="noopener noreferrer"
                  className="btn-accent text-sm mt-2"
                >
                  Shop Now
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
