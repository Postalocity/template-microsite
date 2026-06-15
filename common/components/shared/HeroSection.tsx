import { motion } from 'framer-motion';
import { HeroContent, CTA } from '../../types/content';
import { useFormattedPricing } from '@/utils/pricing';
import { Badge } from '../ui/badge';

interface HeroSectionProps {
  hero: HeroContent;
}

const HeroSection = ({ hero }: HeroSectionProps) => {
  const { short, full } = useFormattedPricing();
  
  // Process text with pricing placeholders
  const processText = (text: string) => {
    return text
      .replace(/\{\{PRICING\}\}/g, full)
      .replace(/\{\{PRICING_SHORT\}\}/g, short);
  };

  // Check for video background
  const hasVideo = hero.background?.video?.src;
  const hasImage = hero.background?.image && !hasVideo;

  return (
    <header
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Video Background */}
      {hasVideo && (
        <div className="absolute inset-0">
          <video
            src={hero.background.video!.src}
            poster={hero.background.video!.poster}
            autoPlay={hero.background.video!.autoplay !== false}
            loop={hero.background.video!.loop !== false}
            muted={hero.background.video!.muted !== false}
            playsInline
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              e.currentTarget.parentElement?.remove();
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hero/60 via-hero/40 to-hero/90" />
        </div>
      )}

      {/* Image Background */}
      {hasImage && (
        <div className="absolute inset-0">
          <img
            src={hero.background.image}
            alt={hero.background?.alt || `${hero.headline?.main || 'Service'} background`}
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-30 mix-blend-lighten"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.parentElement?.remove();
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hero/60 via-hero/40 to-hero/90" />
        </div>
      )}

      <div className="section-container relative z-10 py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Logo - Centered above headline */}
          {hero.logo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`mb-8 flex ${hero.logo.align === 'left' ? 'justify-start' : 'justify-center'}`}
            >
              <img
                src={hero.logo.src}
                alt={hero.logo.alt}
                style={{ height: `${hero.logo.height || 120}px`, width: 'auto' }}
                className="object-contain drop-shadow-lg"
              />
            </motion.div>
          )}

          {/* Professional Label */}
          {hero.professionalLabel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <Badge 
                variant="outline" 
                className={`bg-primary/10 text-primary border-primary/20 ${
                  hero.professionalLabel.largeFont ? 'text-lg px-4 py-2' : ''
                }`}
              >
                {hero.professionalLabel.text}
              </Badge>
            </motion.div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-hero-foreground mb-6">
            {hero.headline.gradientOn === 'main' ? (
              <>
                <span className="gradient-text">{hero.headline.main}</span>
                {hero.headline.highlightTerm ? ` ${hero.headline.highlightTerm}` : ''}
              </>
            ) : (
              <>
                {hero.headline.main}{' '}
                <span className="gradient-text" dangerouslySetInnerHTML={{ __html: hero.headline.highlightTerm?.replace(/\n/g, '<br />') || '' }} />
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-hero-subtitle leading-relaxed mb-10 max-w-2xl">
            {processText(hero.subhead)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {hero.ctas.map((cta: CTA, idx: number) => (
              <a
                key={idx}
                href={cta.href}
                className={
                  cta.variant === 'pricing'
                    ? 'inline-flex flex-col items-center bg-primary/10 border-2 border-primary rounded-xl px-8 py-4 hover:bg-primary/20 transition-all'
                    : cta.variant === 'primary'
                    ? 'inline-flex flex-col items-center bg-primary text-primary-foreground rounded-xl px-8 py-4 hover:opacity-90 transition-all font-bold text-lg sm:text-xl'
                    : 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-cta-outline text-lg'
                }
              >
                <span className={cta.variant === 'pricing' ? 'text-xl sm:text-2xl font-black text-primary' : undefined}>
                  {processText(cta.text)}
                </span>
                {cta.subtext && (
                  <span className={`${
                    cta.variant === 'pricing'
                      ? 'text-xs text-hero-subtitle'
                      : cta.variant === 'primary'
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  } text-sm font-normal mt-1`}>
                    {processText(cta.subtext)}
                  </span>
                )}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
