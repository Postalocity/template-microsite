import { motion } from 'framer-motion';
import { HeroContent, CTA } from '@/types/content';
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

  // Check if video is provided (from customer's request)
  const hasVideo = hero.background?.video;
  const hasImage = hero.background?.image;

  return (
    <header
      id="hero"
      className="relative min-h-[85vh] flex items-end overflow-hidden"
      style={{ background: 'hsl(var(--hero-bg))' }}
    >
      {/* Video Background Support */}
      {hasVideo && (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hero.background?.image}
            className="w-full h-full object-cover"
          >
            <source src={hero.background.video} type="video/mp4" />
            {/* Fallback to image if video fails */}
            {hasImage && (
              <img
                src={hero.background.image}
                alt={hero.background.alt || `${hero.headline?.main || 'Hero'} background`}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                loading="eager"
              />
            )}
          </video>
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(to bottom, hsl(140 60% 15% / 0.4) 0%, hsl(140 60% 10% / 0.75) 100%)' 
            }} 
          />
        </div>
      )}

      {/* Static Image Background (fallback) */}
      {!hasVideo && hasImage && (
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
              background: 'linear-gradient(to bottom, hsl(140 60% 15% / 0.4) 0%, hsl(140 60% 10% / 0.75) 100%)' 
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
            {/* Badge - New Professional Outdoor Style */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-6"
            >
              <span 
                className="inline-flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wider"
                style={{ 
                  background: 'hsl(var(--secondary))',
                  color: 'white',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)'
                }}
              >
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
