import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SiteConfig } from '../../types/content';

interface SiteNavigationProps {
  config: SiteConfig;
}

export default function SiteNavigation({ config }: SiteNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-container flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-foreground"
          aria-label="Home"
        >
          {config.branding.tagline}
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8" role="menubar">
          {config.navigation.links.map((link, idx) => (
            <motion.a
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors font-medium min-h-[44px] flex items-center"
              role="menuitem"
              aria-label={link.label}
            >
              {link.label}
            </motion.a>
          ))}

          {config.navigation.cta && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <a
                href={config.navigation.cta.href}
                className={`px-6 py-3 rounded-xl font-semibold transition-all min-h-[44px] flex items-center ${
                  config.navigation.cta.variant === 'primary'
                    ? 'bg-primary/10 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    : 'border-2 border-border text-foreground hover:border-primary'
                }`}
                role="menuitem"
                aria-label={config.navigation.cta.text}
              >
                {config.navigation.cta.text}
              </a>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground min-h-[44px] min-w-[44px]"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-menu"
            role="menu"
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="section-container py-6 space-y-4">
              {config.navigation.links.map((link, idx) => (
                <motion.a
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-foreground hover:text-primary font-medium min-h-[44px] flex items-center"
                  role="menuitem"
                  aria-label={link.label}
                >
                  {link.label}
                </motion.a>
              ))}

              {config.navigation.cta && (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: config.navigation.links.length * 0.05 }}
                  href={config.navigation.cta.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-6 rounded-xl font-semibold text-center min-h-[44px] flex items-center ${
                    config.navigation.cta.variant === 'primary'
                      ? 'bg-primary/10 border-2 border-primary text-primary'
                      : 'border-2 border-border text-foreground'
                  }`}
                  role="menuitem"
                  aria-label={config.navigation.cta.text}
                >
                  {config.navigation.cta.text}
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}