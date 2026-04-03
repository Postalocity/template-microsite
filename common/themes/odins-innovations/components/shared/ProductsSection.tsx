import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Product {
  name: string;
  description: string;
}

interface ProductsSectionProps {
  content: {
    headline: string;
    intro: string;
    items: Product[];
    cta: string;
  };
}

const ProductsSection = ({ content }: ProductsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="products"
      ref={ref}
      className="section-padding bg-section-alt"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display text-2xl uppercase mb-4 text-center">
            {content.headline}
          </h2>
          
          <p className="font-body text-lg text-muted-foreground text-center mb-10">
            {content.intro}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {content.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="clean-card text-center"
              >
                <h3 className="font-display text-lg uppercase mb-3 text-foreground">
                  {item.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={content.cta.split(': ')[1] || content.cta}
              className="btn-primary"
            >
              Shop Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
