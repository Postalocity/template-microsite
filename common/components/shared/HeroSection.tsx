import { motion } from 'framer-motion';
import { HeroContent, CTA } from '../../types/content';
import { useFormattedPricing } from '@/utils/pricing';

interface HeroSectionProps {
  hero: HeroContent;
}

const HeroSection = ({ hero }: HeroSectionProps) => {
  const { short, full } = useFormattedPricing();
  
  const processText = (text: string) => {
    return text
      .replace(/\{\{PRICING\}\}/g, full)
      .replace(/\{\{PRICING_SHORT\}\}/g, short);
  };

  return (
    <header
      id="hero"
      className="relative min-h-[85vh] flex items-end overflow-hidden"
      style={{ background: 'hsl(var(--hero-bg))' }}
    >
      {hero.background?.image && (
        <div className="absolute inset-0">
          <img
            src={hero.background.image}
            alt={hero.background.alt || `${hero.headline?.main || 'Hero'} background`}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'hsl(220 15% 10% / 0.65)' 
            }} 
          />
        </div>
      )}

      <div className="section-container relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-6"
            >
              <span className="badge">
                Made in USA
              </span>
            </motion.div>

            {/* Headline - Oswald, bold, condensed */}
            <h1 
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4"
              style={{ lineHeight: 1.05 }}
            >
              {hero.headline.main}
            </h1>
            
            {/* Highlight term */}
            <h2 
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white/80 mb-8"
              style={{ lineHeight: 1.1 }}
            >
              {hero.headline.highlightTerm}
            </h2>

            {/* Subhead */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="font-body text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'hsl(var(--hero-subtitle))' }}
            >
              {processText(hero.subhead)}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {hero.ctas.map((cta: CTA, idx: number) => (
                <a
                  key={idx}
                  href={cta.href}
                  className={
                    cta.variant === 'primary' 
                      ? 'btn-accent text-base px-8 py-4' 
                      : 'btn-outline-dark text-base px-8 py-4'
                  }
                >
                  {processText(cta.text)}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
