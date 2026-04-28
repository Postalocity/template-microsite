import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, ArrowRight } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  desc?: string;
  image?: string;
  badge?: string;
  price?: string;
  href?: string;
  link?: string;
}

interface ProductsSectionProps {
  content: {
    headline: string;
    intro: string;
    items: Product[];
    cta: string;
    featured?: Product;
  };
  background?: string;
}

const ProductsSection = ({ content, background }: ProductsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // If no featured product, use first item
  const featured = content.featured || content.items[0];
  const otherProducts = content.items.filter(item => item.name !== featured?.name);

  return (
    <section
      id="products"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--muted))' }}
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
                background: 'hsl(var(--secondary) / 0.1)',
                color: 'hsl(var(--secondary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Shop The Line
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {content.headline}
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.intro}
            </p>
          </div>

          {/* Featured Product */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div 
                className="relative overflow-hidden"
                style={{ 
                  background: 'white',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }}
              >
                {/* Best Seller Badge */}
                <div 
                  className="absolute top-6 left-0 z-10 px-4 py-2 font-display text-sm font-bold uppercase"
                  style={{ 
                    background: 'hsl(var(--secondary))',
                    color: 'white',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%)'
                  }}
                >
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {featured.badge || "Best Seller"}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Product Image */}
                  <div 
                    className="aspect-square md:aspect-auto md:min-h-[400px] flex items-center justify-center p-8"
style={{ background: background || 'hsl(var(--muted))' }}
                  >
                    {featured.image ? (
                      <img 
                        src={featured.image} 
                        alt={featured.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div 
                        className="w-32 h-32 flex items-center justify-center"
                        style={{ 
                          background: 'hsl(var(--primary) / 0.1)',
                          clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)'
                        }}
                      >
                        <span 
                          className="font-display text-6xl font-bold"
                          style={{ color: 'hsl(var(--primary) / 0.3)' }}
                        >
                          O
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 
                      className="font-display text-3xl md:text-4xl uppercase mb-4"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {featured.name}
                    </h3>
                    <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                      {featured.desc || featured.description}
                    </p>
                    {featured.price && (
                      <div 
                        className="font-display text-3xl font-bold mb-6"
                        style={{ color: 'hsl(var(--primary))' }}
                      >
                        {featured.price}
                      </div>
                    )}
                    <a
                      href={featured.link || featured.href || (content.cta ? content.cta.split(': ')[1] || content.cta : '#')}
                      className="inline-flex items-center gap-2 self-start px-8 py-4 font-display font-bold uppercase tracking-wide transition-all duration-300 hover:gap-4"
                      style={{ 
                        background: 'hsl(var(--secondary))',
                        color: 'white'
                      }}
                    >
                      Shop Now
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Products Grid */}
          {otherProducts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ 
                    background: 'white',
                    borderLeft: '4px solid hsl(var(--accent))',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  {item.badge && (
                    <span 
                      className="inline-block px-3 py-1 mb-4 font-body text-xs font-bold uppercase"
                      style={{ 
                        background: 'hsl(var(--accent))',
                        color: 'hsl(var(--foreground))'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <h4 
                    className="font-display text-xl uppercase mb-3"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    {item.name}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {item.desc || item.description}
                  </p>
                  {item.price && (
                    <div 
                      className="font-display text-xl font-bold mb-4"
                      style={{ color: 'hsl(var(--primary))' }}
                    >
                      {item.price}
                    </div>
                  )}
                  <a
                    href={item.link || item.href || (content.cta ? content.cta.split(': ')[1] || content.cta : '#')}
                    className="inline-flex items-center gap-1 font-body text-sm font-semibold transition-all duration-300 group-hover:gap-2"
                    style={{ color: 'hsl(var(--secondary))' }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          )}

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href={content.cta ? content.cta.split(': ')[1] || content.cta : '#'}
              className="inline-flex items-center gap-2 px-10 py-5 font-display font-bold uppercase tracking-wide text-lg transition-all duration-300 hover:gap-4"
              style={{ 
                background: 'hsl(var(--primary))',
                color: 'white'
              }}
            >
              Shop All Products
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
