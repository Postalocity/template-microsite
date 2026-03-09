import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import postalocityLogo from '@/assets/postalocity-logo.png';

type NavConfig = {
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
  { label: 'Why Automate', href: '#why-automate' },
  { label: 'Challenges', href: '#challenges' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Get Started', href: '#get-started' },
  { label: 'FAQ', href: '#faq' },
];

const SiteNavigation = (config?: NavConfig) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = config?.navigation?.links ?? defaultNavLinks;
  const cta = config?.navigation?.cta;

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
          href="https://postalocity.com"
          aria-label="Postalocity home"
        >
          <img
            src={postalocityLogo}
            alt="Postalocity"
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
              href="https://prod.postalocity.com/login.html?signUp=true&promo=bank2026"
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
                  href="https://prod.postalocity.com/login.html?signUp=true&promo=bank2026"
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
