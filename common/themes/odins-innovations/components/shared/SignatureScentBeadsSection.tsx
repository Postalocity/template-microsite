import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  description: string;
  image: string;
  href: string;
  scents: string[];
}

interface SignatureScentBeadsSectionProps {
  content?: {
    headline?: string;
    intro?: string;
    categories?: Category[];
    price?: string;
    cta?: string;
    ctaHref?: string;
  };
  background?: string;
}

const defaultCategories: Category[] = [
  {
    name: "Food Scents",
    description: "Attract deer to your location with irresistible food-based aromas. Perfect for pre-season conditioning and keeping deer in your area.",
    image: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Food_Scents.png?v=1762888380",
    href: "https://www.odinsinnovations.com/collections/food-scents",
    scents: ["Apple", "Acorn", "Persimmon", "Sweet Corn"]
  },
  {
    name: "Rut Scents",
    description: "Trigger dominant buck behavior during the rut with synthetic estrus and territorial challenge formulas. Maximum effectiveness when it matters most.",
    image: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Rut_Scents.png?v=1762888380",
    href: "https://www.odinsinnovations.com/collections/rut-scents",
    scents: ["Doe Estrus", "Dominant Buck", "Scrape Blend"]
  },
  {
    name: "Cover Scents",
    description: "Mask your presence and blend into the environment. Essential for close-range encounters and staying undetected.",
    image: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Cover_Scents.png?v=1762888625",
    href: "https://www.odinsinnovations.com/collections/cover-scents",
    scents: ["Earth", "Pine", "Vanilla"]
  }
];

const SignatureScentBeadsSection = ({ content, background }: SignatureScentBeadsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const categories = content?.categories || defaultCategories;
  const headline = content?.headline || "Signature Scent Beads";
  const intro = content?.intro || "Three powerful scent categories engineered for every hunting scenario. Each formula delivers 30+ days of continuous release with zero reapplication needed.";
  const ctaHref = content?.ctaHref || "https://www.odinsinnovations.com/collections/scent-beads";
  const ctaText = content?.cta || "Shop All Scent Beads";
  const price = content?.price || "From $17.95";

  return (
    <section
      id="signature-scents"
      ref={ref}
      className="section-padding"
      style={{ background: background || 'hsl(var(--background))' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--accent) / 0.1)',
                color: 'hsl(var(--accent))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              The Collection
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {headline}
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              {intro}
            </p>
          </div>

          {/* Three Category Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 items-stretch">
            {categories.map((category, index) => (
              <motion.a
                key={category.name}
                href={category.href}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                style={{ 
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                {/* Category Image */}
                <div 
                  className="aspect-[4/3] overflow-hidden"
                  style={{ background: 'hsl(var(--muted))' }}
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 
                    className="font-display text-2xl uppercase mb-3"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    {category.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Individual Scents - Supplementary */}
                  <div className="mb-4">
                    <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                      Available Scents:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {category.scents.map((scent) => (
                        <span 
                          key={scent}
                          className="px-2 py-1 font-body text-xs"
                          style={{ 
                            background: 'hsl(var(--muted))',
                            color: 'hsl(var(--foreground))'
                          }}
                        >
                          {scent}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div 
                    className="font-display text-xl font-bold mb-4"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    {price}
                  </div>
                  
                  <span
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color: 'hsl(var(--secondary))' }}
                  >
                    Shop {category.name}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-10 py-5 font-display font-bold uppercase tracking-wide text-lg transition-all duration-300 hover:gap-4"
              style={{ 
                background: 'hsl(var(--primary))',
                color: 'white'
              }}
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureScentBeadsSection;
