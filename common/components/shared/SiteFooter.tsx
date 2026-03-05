import { SiteConfig } from '../../types/content';

interface SiteFooterProps {
  config: SiteConfig;
}

export default function SiteFooter({ config }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/50 border-t border-border py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {config.branding.tagline}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {config.branding.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {config.navigation.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <a
                href={`mailto:${config.site.contact.email}`}
                className="hover:text-primary transition-colors block"
              >
                {config.site.contact.email}
              </a>
              {config.site.contact.phone && (
                <a
                  href={`tel:${config.site.contact.phone}`}
                  className="hover:text-primary transition-colors block"
                >
                  {config.site.contact.phone}
                </a>
              )}
              {config.site.contact.address && (
                <address className="not-italic block">
                  {config.site.contact.address}
                </address>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>
            © {currentYear} {config.site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}