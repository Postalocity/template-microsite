import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

  // Get brand config from context
  const ctx = useBrand();
  const brandName = useBrandName();
  
  const navLinks = config?.navigation?.links ?? defaultNavLinks;
  const cta = config?.navigation?.cta;
  
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-md shadow-card border-b border-border'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="section-container flex items-center justify-between h-16 lg:h-20">
        <a
          href={ctx.brand.urls.website}
          aria-label={`${brandName} home`}
        >
          <img
            src={config?.branding?.logo || '/logo.png'}
            alt={brandName}
            className="h-8 lg:h-10 w-auto"
          />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
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
